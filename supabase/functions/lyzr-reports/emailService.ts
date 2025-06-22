
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

export class EmailService {
  private supabase;

  constructor() {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  shouldSendEmail(message: string, response: string): boolean {
    return message.toLowerCase().includes('report') || 
           message.toLowerCase().includes('summary') || 
           message.toLowerCase().includes('analysis') ||
           response?.toLowerCase().includes('critical') ||
           response?.toLowerCase().includes('urgent');
  }

  generateEmailSubject(message: string): string {
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

    return `${reportType} Report - ${currentDate} (Live Data)`;
  }

  async sendReport(message: string, response: string, relevantPatientsCount: number): Promise<boolean> {
    if (!this.shouldSendEmail(message, response)) {
      return false;
    }

    console.log('Triggering email report with structured data');

    const emailData = {
      to_email: "franipd2025@gmail.com",
      subject: this.generateEmailSubject(message),
      message_content: response
    };

    try {
      const { data: emailResult, error: emailError } = await this.supabase.functions.invoke('send_high_priority_report', {
        body: emailData
      });

      if (emailError) {
        console.error('Error sending email report:', emailError);
        return false;
      } else if (emailResult?.success) {
        console.log('Email report with structured data sent successfully:', emailResult);
        return true;
      } else {
        console.error('Email function returned unsuccessful result:', emailResult);
        return false;
      }
    } catch (emailErr) {
      console.error('Failed to send email report:', emailErr);
      return false;
    }
  }
}
