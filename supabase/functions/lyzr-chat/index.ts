
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LyzrChatRequest {
  user_id: string;
  agent_id: string;
  session_id: string;
  message: string;
}

interface LyzrChatResponse {
  response?: string;
  message?: string;
  content?: string;
  error?: string;
}

interface HealthcareContext {
  patients: any[];
  totalPatients: number;
  departmentBreakdown: Record<string, number>;
  triagePriorities: Record<string, number>;
  criticalPatients: any[];
  resources: any[];
  staff: any[];
  recentEvents: any[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user_id, agent_id, session_id, message }: LyzrChatRequest = await req.json();

    // Validate required fields
    if (!user_id || !agent_id || !session_id || !message) {
      throw new Error('Missing required fields: user_id, agent_id, session_id, message');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Query healthcare data to provide context
    const healthcareContext = await gatherHealthcareContext(supabase, message);
    
    // Format context for AI
    const contextualMessage = formatMessageWithContext(message, healthcareContext);

    const lyzrApiKey = Deno.env.get('LYZR_API_KEY') || 'sk-default-0sYgKnAaPx5SKQSMmofgGz9T9LQYlFng';

    console.log('Sending request to Lyzr AI with healthcare context:', { 
      user_id, 
      agent_id, 
      session_id, 
      originalMessage: message.substring(0, 100),
      contextLength: contextualMessage.length 
    });

    // Implement retry logic with exponential backoff
    let lastError: Error | null = null;
    const maxRetries = 3;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch('https://agent-prod.studio.lyzr.ai/v3/inference/chat/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': lyzrApiKey
          },
          body: JSON.stringify({
            user_id,
            agent_id,
            session_id,
            message: contextualMessage
          })
        });

        console.log(`Attempt ${attempt} - Response status:`, response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Attempt ${attempt} - API Error:`, errorText);
          
          if (response.status === 500 && attempt < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
            continue;
          }
          
          throw new Error(`API returned ${response.status}: ${errorText || response.statusText}`);
        }

        const data: LyzrChatResponse = await response.json();
        console.log('Lyzr AI response received successfully');

        const aiResponse = data.response || data.message || data.content || 'I received your message but couldn\'t generate a response.';

        return new Response(
          JSON.stringify({ response: aiResponse }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );

      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);
        lastError = error as Error;
        
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

    // All retries failed, return fallback response with context
    console.error('All retry attempts failed, providing fallback response with healthcare context');
    
    const fallbackResponse = generateContextualFallback(message, healthcareContext);

    return new Response(
      JSON.stringify({ 
        response: fallbackResponse,
        error: lastError?.message || 'Service temporarily unavailable'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        response: 'I encountered an error processing your request. Please try again.'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function gatherHealthcareContext(supabase: any, userMessage: string): Promise<HealthcareContext> {
  try {
    // Determine what data to fetch based on the user's question
    const needsPatientData = /patient|triage|priority|bed|admission|emergency/i.test(userMessage);
    const needsDepartmentData = /department|location|staff|resource/i.test(userMessage);
    const needsEventsData = /event|timeline|history|recent/i.test(userMessage);

    // Fetch patients data
    const { data: patients } = await supabase
      .from('patients')
      .select('*')
      .order('triage_priority', { ascending: true, nullsLast: true })
      .limit(50);

    // Fetch resources data
    const { data: resources } = await supabase
      .from('resources')
      .select('*')
      .order('department');

    // Fetch staff data
    const { data: staff } = await supabase
      .from('staff')
      .select('*')
      .eq('active', true)
      .order('department');

    // Fetch recent events if needed
    let recentEvents = [];
    if (needsEventsData) {
      const { data: events } = await supabase
        .from('patient_events')
        .select('*')
        .order('event_timestamp', { ascending: false })
        .limit(20);
      recentEvents = events || [];
    }

    // Process and summarize data
    const totalPatients = patients?.length || 0;
    
    // Department breakdown
    const departmentBreakdown: Record<string, number> = {};
    patients?.forEach(patient => {
      const dept = patient.current_location || 'Unknown';
      departmentBreakdown[dept] = (departmentBreakdown[dept] || 0) + 1;
    });

    // Triage priority breakdown
    const triagePriorities: Record<string, number> = {};
    patients?.forEach(patient => {
      const priority = patient.triage_priority?.toString() || 'Unassigned';
      triagePriorities[priority] = (triagePriorities[priority] || 0) + 1;
    });

    // Critical patients (priority 1-2)
    const criticalPatients = patients?.filter(p => p.triage_priority && p.triage_priority <= 2) || [];

    return {
      patients: patients || [],
      totalPatients,
      departmentBreakdown,
      triagePriorities,
      criticalPatients,
      resources: resources || [],
      staff: staff || [],
      recentEvents
    };
  } catch (error) {
    console.error('Error gathering healthcare context:', error);
    return {
      patients: [],
      totalPatients: 0,
      departmentBreakdown: {},
      triagePriorities: {},
      criticalPatients: [],
      resources: [],
      staff: [],
      recentEvents: []
    };
  }
}

function formatMessageWithContext(userMessage: string, context: HealthcareContext): string {
  const contextSummary = `
CURRENT HEALTHCARE DATA CONTEXT:
- Total Patients: ${context.totalPatients}
- Department Distribution: ${JSON.stringify(context.departmentBreakdown)}
- Triage Priority Distribution: ${JSON.stringify(context.triagePriorities)}
- Critical Patients (Priority 1-2): ${context.criticalPatients.length}
- Active Staff: ${context.staff.length}
- Available Resources: ${context.resources.length}

${context.criticalPatients.length > 0 ? `
CRITICAL PATIENTS REQUIRING ATTENTION:
${context.criticalPatients.slice(0, 5).map(p => 
  `- ${p.first_name} ${p.last_name} (MRN: ${p.mrn}, Priority: ${p.triage_priority}, Location: ${p.current_location || 'Unassigned'})`
).join('\n')}
` : ''}

${context.recentEvents.length > 0 ? `
RECENT EVENTS:
${context.recentEvents.slice(0, 3).map(e => 
  `- ${e.event_type} at ${new Date(e.event_timestamp).toLocaleTimeString()} in ${e.department || 'Unknown'}`
).join('\n')}
` : ''}

USER QUESTION: ${userMessage}

Please provide a comprehensive response based on the current healthcare data above. Include specific insights, recommendations, and actionable information relevant to emergency department operations.`;

  return contextSummary;
}

function generateContextualFallback(userMessage: string, context: HealthcareContext): string {
  return `Based on your current healthcare data, I can see you have ${context.totalPatients} patients in the system${context.criticalPatients.length > 0 ? ` with ${context.criticalPatients.length} critical patients requiring immediate attention` : ''}. 

While I'm experiencing technical difficulties with the AI service, here's what I can tell you based on your current data:

${context.totalPatients > 0 ? `
**Current Status:**
- Total patients: ${context.totalPatients}
- Departments with patients: ${Object.keys(context.departmentBreakdown).join(', ')}
- Priority 1-2 patients: ${context.criticalPatients.length}
` : ''}

${context.criticalPatients.length > 0 ? `
**Immediate Attention Required:**
${context.criticalPatients.slice(0, 3).map(p => 
  `• ${p.first_name} ${p.last_name} - Priority ${p.triage_priority} in ${p.current_location || 'Unassigned'}`
).join('\n')}
` : ''}

Please try your question again in a moment, or rephrase it for more specific information about your healthcare operations.`;
}
