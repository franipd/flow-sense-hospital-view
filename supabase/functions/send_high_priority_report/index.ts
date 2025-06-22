
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PatientData {
  mrn: string;
  name: string;
  age: number | null;
  location: string;
  status: string;
  bed: string;
  priority: string;
}

const parsePatientData = (content: string): PatientData[] => {
  const patients: PatientData[] = [];
  const lines = content.split('\n');
  
  let currentPatient: Partial<PatientData> = {};
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    const mrnMatch = trimmedLine.match(/MRN[:\s]+(\w+)/i);
    const nameMatch = trimmedLine.match(/(?:Patient|Name)[:\s]+([^,\n]+)/i);
    const ageMatch = trimmedLine.match(/Age[:\s]+(\d+)/i);
    const locationMatch = trimmedLine.match(/Location[:\s]+([^,\n]+)/i);
    const statusMatch = trimmedLine.match(/Status[:\s]+([^,\n]+)/i);
    const bedMatch = trimmedLine.match(/Bed[:\s]+([^,\n]+)/i);
    const priorityMatch = trimmedLine.match(/Priority[:\s]+([^,\n]+)/i);
    
    if (mrnMatch) {
      if (currentPatient.mrn) {
        patients.push(currentPatient as PatientData);
      }
      currentPatient = { mrn: mrnMatch[1].trim() };
    }
    
    if (nameMatch) currentPatient.name = nameMatch[1].trim();
    if (ageMatch) currentPatient.age = parseInt(ageMatch[1]);
    if (locationMatch) currentPatient.location = locationMatch[1].trim();
    if (statusMatch) currentPatient.status = statusMatch[1].trim();
    if (bedMatch) currentPatient.bed = bedMatch[1].trim();
    if (priorityMatch) currentPatient.priority = priorityMatch[1].trim();
  }
  
  if (currentPatient.mrn) {
    patients.push(currentPatient as PatientData);
  }
  
  return patients;
};

const createPatientTable = (patients: PatientData[]): string => {
  if (patients.length === 0) return '';
  
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'stable': return '#10b981';
      case 'critical': return '#ef4444';
      case 'admitted': return '#3b82f6';
      case 'discharged': return '#6b7280';
      default: return '#f59e0b';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': case 'urgent': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#3b82f6';
    }
  };

  return `
    <div style="margin: 30px 0;">
      <h3 style="color: #1e40af; margin-bottom: 20px; font-size: 18px; font-weight: bold;">Patient Roster (${patients.length} patients)</h3>
      <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <thead>
          <tr style="background-color: #f8fafc;">
            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb; font-weight: 600; color: #374151;">MRN</th>
            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb; font-weight: 600; color: #374151;">Patient Name</th>
            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb; font-weight: 600; color: #374151;">Age</th>
            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb; font-weight: 600; color: #374151;">Location</th>
            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb; font-weight: 600; color: #374151;">Status</th>
            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb; font-weight: 600; color: #374151;">Bed</th>
            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb; font-weight: 600; color: #374151;">Priority</th>
          </tr>
        </thead>
        <tbody>
          ${patients.map((patient, index) => `
            <tr style="border-bottom: 1px solid #f3f4f6; ${index % 2 === 0 ? 'background-color: #fafafa;' : ''}">
              <td style="padding: 12px; font-family: monospace; color: #1e40af; font-weight: 500;">${patient.mrn || 'N/A'}</td>
              <td style="padding: 12px; font-weight: 500; color: #111827;">${patient.name || 'Unknown'}</td>
              <td style="padding: 12px; color: #6b7280;">${patient.age || 'N/A'}</td>
              <td style="padding: 12px; color: #6b7280;">${patient.location || 'N/A'}</td>
              <td style="padding: 12px;">
                <span style="background-color: ${getStatusColor(patient.status)}20; color: ${getStatusColor(patient.status)}; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500; border: 1px solid ${getStatusColor(patient.status)}40;">
                  ${patient.status || 'Unknown'}
                </span>
              </td>
              <td style="padding: 12px; color: #6b7280;">${patient.bed || 'N/A'}</td>
              <td style="padding: 12px;">
                <span style="background-color: ${getPriorityColor(patient.priority)}20; color: ${getPriorityColor(patient.priority)}; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500; border: 1px solid ${getPriorityColor(patient.priority)}40;">
                  ${patient.priority || 'Normal'}
                </span>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
};

const cleanReportContent = (content: string): string => {
  // Remove unwanted sections
  let cleaned = content;
  
  // Remove the "Would you like me to email this report..." section
  cleaned = cleaned.replace(/Would you like me to email this report.*?Session ID:.*$/gims, '');
  
  // Remove session ID references
  cleaned = cleaned.replace(/Session ID:.*$/gm, '');
  
  // Remove "Generated by FlowSense Care Intelligence System" if standalone
  cleaned = cleaned.replace(/^\s*Generated by FlowSense Care Intelligence System\s*$/gm, '');
  
  // Remove email formatting instructions
  cleaned = cleaned.replace(/EMAIL_TO:.*?---/gims, '');
  
  // Clean up extra whitespace
  cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n');
  cleaned = cleaned.trim();
  
  return cleaned;
};

const formatContentAsHTML = (content: string): string => {
  const cleanedContent = cleanReportContent(content);
  const patients = parsePatientData(cleanedContent);
  
  // Create summary statistics
  const totalPatients = patients.length;
  const statusCounts = patients.reduce((acc, p) => {
    const status = p.status || 'Unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const departmentCounts = patients.reduce((acc, p) => {
    const dept = p.location || 'Unknown';
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Create statistics cards
  const statsHtml = totalPatients > 0 ? `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0;">
      <div style="background: linear-gradient(135deg, #3b82f6, #1e40af); color: white; padding: 20px; border-radius: 8px; text-align: center;">
        <h4 style="margin: 0 0 10px 0; font-size: 14px; opacity: 0.9;">Total Patients</h4>
        <div style="font-size: 28px; font-weight: bold; margin: 0;">${totalPatients}</div>
      </div>
      <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; border-radius: 8px; text-align: center;">
        <h4 style="margin: 0 0 10px 0; font-size: 14px; opacity: 0.9;">Departments</h4>
        <div style="font-size: 28px; font-weight: bold; margin: 0;">${Object.keys(departmentCounts).length}</div>
      </div>
      <div style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 20px; border-radius: 8px; text-align: center;">
        <h4 style="margin: 0 0 10px 0; font-size: 14px; opacity: 0.9;">Critical Status</h4>
        <div style="font-size: 28px; font-weight: bold; margin: 0;">${statusCounts['Critical'] || 0}</div>
      </div>
    </div>
  ` : '';

  // Convert text to HTML with proper formatting
  let html = cleanedContent
    .replace(/^([A-Z][A-Za-z\s]+:)\s*$/gm, '<h3 style="color: #1e40af; margin: 25px 0 15px 0; font-weight: bold; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">$1</h3>')
    .replace(/^[-•*]\s+(.+)$/gm, '<li style="margin: 8px 0; line-height: 1.6;">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\s*)+/gs, '<ul style="margin: 15px 0; padding-left: 25px; list-style-type: disc;">$&</ul>')
    .replace(/^\d+\.\s+(.+)$/gm, '<li style="margin: 8px 0; line-height: 1.6;">$1</li>')
    .replace(/^(?!<|$)(.+)$/gm, '<p style="margin: 15px 0; line-height: 1.7; color: #374151;">$1</p>');

  return statsHtml + createPatientTable(patients) + html;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to_email, subject, message_content } = await req.json();

    console.log('High priority report email request:', {
      to_email,
      subject: subject?.substring(0, 50),
      message_length: message_content?.length
    });

    if (!to_email || !subject || !message_content) {
      throw new Error('Missing required fields: to_email, subject, message_content');
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error('Resend API key not configured');
    }

    // Format the content as enhanced HTML
    const formattedContent = formatContentAsHTML(message_content);
    
    // Get current date in a readable format
    const reportDate = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'FlowSense Care <onboarding@resend.dev>',
        to: [to_email],
        subject: subject,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
          </head>
          <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc;">
            <div style="max-width: 1000px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 40px; text-align: center;">
                <h1 style="margin: 0; font-size: 32px; font-weight: bold;">🏥 FlowSense Care</h1>
                <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.9;">Healthcare Intelligence Report</p>
                <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin-top: 20px;">
                  <h2 style="margin: 0; font-size: 20px; font-weight: 600;">${subject}</h2>
                  <p style="margin: 8px 0 0 0; opacity: 0.8; font-size: 14px;">Generated on ${reportDate}</p>
                </div>
              </div>
              
              <!-- Content -->
              <div style="padding: 40px;">
                ${formattedContent}
              </div>
              
              <!-- Footer -->
              <div style="background-color: #f3f4f6; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                <div style="margin-bottom: 15px;">
                  <span style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 600;">AUTOMATED REPORT</span>
                </div>
                <p style="margin: 0; color: #6b7280; font-size: 14px; font-weight: 500;">
                  This report was automatically generated by FlowSense Care Intelligence System
                </p>
                <p style="margin: 8px 0 0 0; color: #9ca3af; font-size: 12px;">
                  © ${new Date().getFullYear()} FlowSense Care - Healthcare Analytics Platform
                </p>
              </div>
              
            </div>
          </body>
          </html>
        `
      })
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Enhanced email sent successfully:', {
        messageId: result.id,
        to_email
      });

      return new Response(JSON.stringify({
        success: true,
        messageId: result.id,
        to_email,
        subject,
        deliveredAt: new Date().toISOString()
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } else {
      throw new Error(`Resend API error: ${JSON.stringify(result)}`);
    }

  } catch (error) {
    console.error('Error sending enhanced report email:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to send email',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
