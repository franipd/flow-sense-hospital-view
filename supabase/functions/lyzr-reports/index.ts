
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user_id, message } = await req.json();
    
    console.log('Healthcare Reports Chat - Processing message:', {
      user_id,
      message_preview: message.substring(0, 100),
      timestamp: new Date().toISOString()
    });

    // Initialize Supabase client for data fetching
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch real patient data from Supabase
    console.log('Fetching real patient data from Supabase...');
    
    // Get current patients
    const { data: patients, error: patientsError } = await supabase
      .from('patients')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (patientsError) {
      console.error('Error fetching patients:', patientsError);
    }

    // Get recent patient events
    const { data: patientEvents, error: eventsError } = await supabase
      .from('patient_events')
      .select(`
        *,
        patients!inner(mrn, first_name, last_name, current_location, current_status)
      `)
      .order('event_timestamp', { ascending: false })
      .limit(100);

    if (eventsError) {
      console.error('Error fetching patient events:', eventsError);
    }

    // Get staff information
    const { data: staff, error: staffError } = await supabase
      .from('staff')
      .select('*')
      .eq('active', true);

    if (staffError) {
      console.error('Error fetching staff:', staffError);
    }

    // Get resources/equipment
    const { data: resources, error: resourcesError } = await supabase
      .from('resources')
      .select('*');

    if (resourcesError) {
      console.error('Error fetching resources:', resourcesError);
    }

    console.log('Fetched real data:', {
      patients_count: patients?.length || 0,
      events_count: patientEvents?.length || 0,
      staff_count: staff?.length || 0,
      resources_count: resources?.length || 0
    });

    // Filter patients by department if mentioned in message
    let relevantPatients = patients || [];
    const messageLower = message.toLowerCase();
    
    if (messageLower.includes('icu')) {
      relevantPatients = patients?.filter(p => 
        p.current_location?.toLowerCase().includes('icu') ||
        p.current_location?.toLowerCase().includes('intensive')
      ) || [];
    } else if (messageLower.includes('emergency') || messageLower.includes('ed')) {
      relevantPatients = patients?.filter(p => 
        p.current_location?.toLowerCase().includes('emergency') ||
        p.current_location?.toLowerCase().includes('ed')
      ) || [];
    } else if (messageLower.includes('surgery') || messageLower.includes('surgical')) {
      relevantPatients = patients?.filter(p => 
        p.current_location?.toLowerCase().includes('surgery') ||
        p.current_location?.toLowerCase().includes('surgical') ||
        p.current_location?.toLowerCase().includes('or')
      ) || [];
    }

    // Build comprehensive healthcare context
    const healthcareContext = {
      current_datetime: new Date().toISOString(),
      total_patients: patients?.length || 0,
      relevant_patients: relevantPatients.map(p => ({
        mrn: p.mrn,
        name: `${p.first_name} ${p.last_name}`,
        location: p.current_location,
        status: p.current_status,
        admission_date: p.admission_datetime,
        triage_priority: p.triage_priority,
        assigned_bed: p.assigned_bed,
        age: p.date_of_birth ? Math.floor((new Date().getTime() - new Date(p.date_of_birth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : null
      })),
      recent_events: patientEvents?.slice(0, 20).map(e => ({
        patient_mrn: e.patients?.mrn,
        patient_name: e.patients ? `${e.patients.first_name} ${e.patients.last_name}` : 'Unknown',
        event_type: e.event_type,
        timestamp: e.event_timestamp,
        department: e.department,
        duration: e.duration_minutes
      })) || [],
      staff_summary: {
        total_active_staff: staff?.length || 0,
        by_department: staff?.reduce((acc: any, s) => {
          const dept = s.department || 'Unknown';
          acc[dept] = (acc[dept] || 0) + 1;
          return acc;
        }, {}) || {}
      },
      resources_summary: {
        total_resources: resources?.length || 0,
        by_type: resources?.reduce((acc: any, r) => {
          acc[r.resource_type] = (acc[r.resource_type] || 0) + 1;
          return acc;
        }, {}) || {},
        utilization: resources?.map(r => ({
          name: r.resource_name,
          type: r.resource_type,
          capacity: r.capacity,
          current_utilization: r.current_utilization,
          status: r.status
        })) || []
      }
    };

    // Enhanced message with real healthcare data context
    const enhancedMessage = `${message}

IMPORTANT: Use ONLY the following REAL healthcare data from our live database in your response. Do NOT use fictional data.

CURRENT HEALTHCARE SYSTEM DATA:
${JSON.stringify(healthcareContext, null, 2)}

INSTRUCTIONS:
- Use actual patient MRNs, names, and details from the data above
- Reference real current locations, statuses, and bed assignments
- Include actual patient counts and demographics
- Use real staff numbers and department allocations
- Reference actual resource utilization and equipment status
- If no relevant patients are found for a specific department, state this clearly
- Always indicate that this report is based on live database information from ${new Date().toLocaleString()}
- Focus on the specific patients and data relevant to the request`;

    console.log('Enhanced message with real data context, length:', enhancedMessage.length);

    // Generate session ID for this conversation
    const session_id = `6857e02217bfa0b3af0f3f90-${Math.random().toString(36).substr(2, 9)}`;

    // Call Lyzr Agent API for reports with real data context
    const lyzrResponse = await fetch('https://agent-prod.studio.lyzr.ai/v3/inference/chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'sk-default-0sYgKnAaPx5SKQSMmofgGz9T9LQYlFng'
      },
      body: JSON.stringify({
        user_id: user_id,
        agent_id: "6857e02217bfa0b3af0f3f90",
        session_id: session_id,
        message: enhancedMessage
      })
    });

    if (!lyzrResponse.ok) {
      throw new Error(`Lyzr API responded with status: ${lyzrResponse.status}`);
    }

    const lyzrData = await lyzrResponse.json();
    console.log('Lyzr Reports API response received:', {
      hasResponse: !!lyzrData.response,
      responseLength: lyzrData.response?.length || 0,
      using_real_data: true
    });

    // Check if this conversation warrants an email report
    const shouldSendEmail = message.toLowerCase().includes('report') || 
                           message.toLowerCase().includes('summary') || 
                           message.toLowerCase().includes('analysis') ||
                           lyzrData.response?.toLowerCase().includes('critical') ||
                           lyzrData.response?.toLowerCase().includes('urgent');

    let emailSent = false;

    if (shouldSendEmail) {
      console.log('Triggering email report with real patient data');
      
      // Generate a professional subject line
      const reportType = message.toLowerCase().includes('icu') ? 'ICU' :
                        message.toLowerCase().includes('emergency') ? 'Emergency Department' :
                        message.toLowerCase().includes('surgery') ? 'Surgery Department' :
                        message.toLowerCase().includes('patient') ? 'Patient' :
                        'Healthcare';
      
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const emailData = {
        to_email: "franipd2025@gmail.com",
        subject: `${reportType} Report - ${currentDate} (Live Data)`,
        message_content: lyzrData.response
      };

      try {
        const { data: emailResult, error: emailError } = await supabase.functions.invoke('send_high_priority_report', {
          body: emailData
        });

        if (emailError) {
          console.error('Error sending email report:', emailError);
          emailSent = false;
        } else if (emailResult?.success) {
          console.log('Email report with real data sent successfully:', emailResult);
          emailSent = true;
        } else {
          console.error('Email function returned unsuccessful result:', emailResult);
          emailSent = false;
        }
      } catch (emailErr) {
        console.error('Failed to send email report:', emailErr);
        emailSent = false;
      }
    }

    return new Response(JSON.stringify({
      response: lyzrData.response || 'I received your message but couldn\'t generate a response.',
      session_id: session_id,
      email_sent: emailSent,
      data_source: 'live_database',
      patients_included: relevantPatients.length,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in lyzr-reports function:', error);
    return new Response(JSON.stringify({
      error: 'Failed to process healthcare reports request',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
