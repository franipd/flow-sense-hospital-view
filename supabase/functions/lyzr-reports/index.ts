
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { ContextBuilder } from './contextBuilder.ts';
import { MessageFormatter } from './messageFormatter.ts';
import { LyzrService } from './lyzrService.ts';
import { EmailService } from './emailService.ts';

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

    // Build healthcare context
    const contextBuilder = new ContextBuilder();
    const healthcareContext = await contextBuilder.buildHealthcareContext(message);

    // Format enhanced message
    const enhancedMessage = MessageFormatter.enhanceMessage(message, healthcareContext);

    // Generate session ID
    const session_id = `6857e02217bfa0b3af0f3f90-${Math.random().toString(36).substr(2, 9)}`;

    // Call Lyzr API
    const lyzrData = await LyzrService.sendMessage(user_id, session_id, enhancedMessage);

    // Handle email report
    const emailService = new EmailService();
    const emailSent = await emailService.sendReport(
      message, 
      lyzrData.response, 
      healthcareContext.relevant_patients.length
    );

    return new Response(JSON.stringify({
      response: lyzrData.response || 'I received your message but couldn\'t generate a response.',
      session_id: session_id,
      email_sent: emailSent,
      data_source: 'live_database',
      patients_included: healthcareContext.relevant_patients.length,
      structured_format: true,
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
