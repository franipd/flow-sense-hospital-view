
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

    // Generate session ID for this conversation
    const session_id = `6857e02217bfa0b3af0f3f90-${Math.random().toString(36).substr(2, 9)}`;

    // Call Lyzr Agent API for reports
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
        message: message
      })
    });

    if (!lyzrResponse.ok) {
      throw new Error(`Lyzr API responded with status: ${lyzrResponse.status}`);
    }

    const lyzrData = await lyzrResponse.json();
    console.log('Lyzr Reports API response received:', {
      hasResponse: !!lyzrData.response,
      responseLength: lyzrData.response?.length || 0
    });

    // Check if this conversation warrants an email report
    const shouldSendEmail = message.toLowerCase().includes('report') || 
                           message.toLowerCase().includes('summary') || 
                           message.toLowerCase().includes('analysis') ||
                           lyzrData.response?.toLowerCase().includes('critical') ||
                           lyzrData.response?.toLowerCase().includes('urgent');

    let emailSent = false;

    if (shouldSendEmail) {
      console.log('Triggering email report based on conversation content');
      
      // Create Supabase client for calling the email function
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);

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
        subject: `${reportType} Report - ${currentDate}`,
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
          console.log('Email report sent successfully:', emailResult);
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
      email_sent: emailSent
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
