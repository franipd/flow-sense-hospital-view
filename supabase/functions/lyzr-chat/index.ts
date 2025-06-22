
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

    const lyzrApiKey = Deno.env.get('LYZR_API_KEY') || 'sk-default-0sYgKnAaPx5SKQSMmofgGz9T9LQYlFng';

    console.log('Sending request to Lyzr AI:', { user_id, agent_id, session_id, message: message.substring(0, 100) });

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
            message
          })
        });

        console.log(`Attempt ${attempt} - Response status:`, response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Attempt ${attempt} - API Error:`, errorText);
          
          if (response.status === 500 && attempt < maxRetries) {
            // Wait before retrying (exponential backoff)
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
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

    // All retries failed, return fallback response
    console.error('All retry attempts failed, providing fallback response');
    
    const fallbackResponse = `I'm experiencing technical difficulties connecting to the AI service. This appears to be a temporary issue. 

Here are some things you can try:
- Ask your question again in a moment
- Try rephrasing your question
- Check back in a few minutes

I apologize for the inconvenience. The issue has been logged for our technical team.`;

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
