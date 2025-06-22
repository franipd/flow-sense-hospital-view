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

const createAdvancedStatsSection = (patients: PatientData[]): string => {
  if (patients.length === 0) return '';
  
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

  const priorityCounts = patients.reduce((acc, p) => {
    const priority = p.priority || 'Normal';
    acc[priority] = (acc[priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const avgAge = patients.filter(p => p.age).reduce((sum, p) => sum + (p.age || 0), 0) / patients.filter(p => p.age).length;

  return `
    <div style="margin: 40px 0;">
      <h2 style="color: #1e40af; margin-bottom: 30px; font-size: 24px; font-weight: bold; text-align: center; border-bottom: 3px solid #3b82f6; padding-bottom: 15px;">📊 Key Metrics Overview</h2>
      
      <!-- Main Stats Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 25px; margin: 30px 0;">
        <div style="background: linear-gradient(135deg, #3b82f6, #1e40af); color: white; padding: 25px; border-radius: 12px; text-align: center; box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);">
          <div style="font-size: 18px; opacity: 0.9; margin-bottom: 8px;">👥 Total Patients</div>
          <div style="font-size: 36px; font-weight: bold; margin: 10px 0;">${patients.length}</div>
          <div style="font-size: 14px; opacity: 0.8;">Active in system</div>
        </div>
        
        <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 25px; border-radius: 12px; text-align: center; box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);">
          <div style="font-size: 18px; opacity: 0.9; margin-bottom: 8px;">🏢 Departments</div>
          <div style="font-size: 36px; font-weight: bold; margin: 10px 0;">${Object.keys(departmentCounts).length}</div>
          <div style="font-size: 14px; opacity: 0.8;">Active locations</div>
        </div>
        
        <div style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 25px; border-radius: 12px; text-align: center; box-shadow: 0 8px 16px rgba(245, 158, 11, 0.3);">
          <div style="font-size: 18px; opacity: 0.9; margin-bottom: 8px;">⚠️ High Priority</div>
          <div style="font-size: 36px; font-weight: bold; margin: 10px 0;">${priorityCounts['High'] || priorityCounts['Urgent'] || 0}</div>
          <div style="font-size: 14px; opacity: 0.8;">Needs attention</div>
        </div>
        
        <div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; padding: 25px; border-radius: 12px; text-align: center; box-shadow: 0 8px 16px rgba(139, 92, 246, 0.3);">
          <div style="font-size: 18px; opacity: 0.9; margin-bottom: 8px;">📈 Avg Age</div>
          <div style="font-size: 36px; font-weight: bold; margin: 10px 0;">${isNaN(avgAge) ? 'N/A' : Math.round(avgAge)}</div>
          <div style="font-size: 14px; opacity: 0.8;">Years old</div>
        </div>
      </div>

      <!-- Department Distribution Chart -->
      <div style="background: white; border-radius: 12px; padding: 30px; margin: 30px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h3 style="color: #1e40af; margin-bottom: 25px; font-size: 20px; font-weight: bold; text-align: center;">🏥 Department Distribution</h3>
        <div style="display: flex; flex-direction: column; gap: 15px;">
          ${Object.entries(departmentCounts).map(([dept, count]) => {
            const percentage = Math.round((count / patients.length) * 100);
            return `
              <div style="display: flex; align-items: center; gap: 15px;">
                <div style="min-width: 120px; font-weight: 600; color: #374151;">${dept}</div>
                <div style="flex: 1; background: #f3f4f6; border-radius: 8px; height: 24px; position: relative; overflow: hidden;">
                  <div style="background: linear-gradient(90deg, #3b82f6, #60a5fa); height: 100%; width: ${percentage}%; border-radius: 8px; transition: width 0.3s ease;"></div>
                  <div style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); font-size: 12px; font-weight: 600; color: #374151;">${count} (${percentage}%)</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Status Distribution Chart -->
      <div style="background: white; border-radius: 12px; padding: 30px; margin: 30px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h3 style="color: #1e40af; margin-bottom: 25px; font-size: 20px; font-weight: bold; text-align: center;">📋 Patient Status Overview</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
          ${Object.entries(statusCounts).map(([status, count]) => {
            const percentage = Math.round((count / patients.length) * 100);
            const getStatusColor = (status: string) => {
              switch (status?.toLowerCase()) {
                case 'stable': return { bg: '#10b981', light: '#d1fae5' };
                case 'critical': return { bg: '#ef4444', light: '#fef2f2' };
                case 'admitted': return { bg: '#3b82f6', light: '#eff6ff' };
                case 'discharged': return { bg: '#6b7280', light: '#f9fafb' };
                default: return { bg: '#f59e0b', light: '#fffbeb' };
              }
            };
            const colors = getStatusColor(status);
            return `
              <div style="background: ${colors.light}; border: 2px solid ${colors.bg}20; border-radius: 12px; padding: 20px; text-align: center;">
                <div style="color: ${colors.bg}; font-size: 28px; font-weight: bold; margin-bottom: 8px;">${count}</div>
                <div style="color: #374151; font-weight: 600; margin-bottom: 4px;">${status}</div>
                <div style="color: #6b7280; font-size: 14px;">${percentage}% of total</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
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
    <div style="margin: 40px 0;">
      <h2 style="color: #1e40af; margin-bottom: 25px; font-size: 24px; font-weight: bold; text-align: center; border-bottom: 3px solid #3b82f6; padding-bottom: 15px;">👨‍⚕️ Detailed Patient Roster</h2>
      <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 16px rgba(0,0,0,0.1); border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white;">
              <th style="padding: 18px 15px; text-align: left; font-weight: 700; font-size: 14px; letter-spacing: 0.5px;">MRN</th>
              <th style="padding: 18px 15px; text-align: left; font-weight: 700; font-size: 14px; letter-spacing: 0.5px;">Patient Name</th>
              <th style="padding: 18px 15px; text-align: left; font-weight: 700; font-size: 14px; letter-spacing: 0.5px;">Age</th>
              <th style="padding: 18px 15px; text-align: left; font-weight: 700; font-size: 14px; letter-spacing: 0.5px;">Location</th>
              <th style="padding: 18px 15px; text-align: left; font-weight: 700; font-size: 14px; letter-spacing: 0.5px;">Status</th>
              <th style="padding: 18px 15px; text-align: left; font-weight: 700; font-size: 14px; letter-spacing: 0.5px;">Bed</th>
              <th style="padding: 18px 15px; text-align: left; font-weight: 700; font-size: 14px; letter-spacing: 0.5px;">Priority</th>
            </tr>
          </thead>
          <tbody>
            ${patients.map((patient, index) => `
              <tr style="border-bottom: 1px solid #f3f4f6; ${index % 2 === 0 ? 'background: linear-gradient(90deg, #f8fafc, #ffffff);' : 'background: white;'} transition: background-color 0.2s ease;">
                <td style="padding: 16px 15px; font-family: 'Monaco', 'Menlo', monospace; color: #1e40af; font-weight: 600; font-size: 13px; border-right: 1px solid #f3f4f6;">${patient.mrn || 'N/A'}</td>
                <td style="padding: 16px 15px; font-weight: 600; color: #111827; border-right: 1px solid #f3f4f6;">${patient.name || 'Unknown'}</td>
                <td style="padding: 16px 15px; color: #6b7280; font-weight: 500; border-right: 1px solid #f3f4f6;">${patient.age || 'N/A'}</td>
                <td style="padding: 16px 15px; color: #6b7280; font-weight: 500; border-right: 1px solid #f3f4f6;">${patient.location || 'N/A'}</td>
                <td style="padding: 16px 15px; border-right: 1px solid #f3f4f6;">
                  <span style="background: ${getStatusColor(patient.status)}15; color: ${getStatusColor(patient.status)}; padding: 8px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; border: 2px solid ${getStatusColor(patient.status)}30; text-transform: uppercase; letter-spacing: 0.5px;">
                    ${patient.status || 'Unknown'}
                  </span>
                </td>
                <td style="padding: 16px 15px; color: #6b7280; font-weight: 500; border-right: 1px solid #f3f4f6;">${patient.bed || 'N/A'}</td>
                <td style="padding: 16px 15px;">
                  <span style="background: ${getPriorityColor(patient.priority)}15; color: ${getPriorityColor(patient.priority)}; padding: 8px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; border: 2px solid ${getPriorityColor(patient.priority)}30; text-transform: uppercase; letter-spacing: 0.5px;">
                    ${patient.priority || 'Normal'}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
};

const cleanReportContent = (content: string): string => {
  let cleaned = content;
  
  cleaned = cleaned.replace(/Would you like me to email this report.*?Session ID:.*$/gims, '');
  cleaned = cleaned.replace(/Session ID:.*$/gm, '');
  cleaned = cleaned.replace(/^\s*Generated by FlowSense Care Intelligence System\s*$/gm, '');
  cleaned = cleaned.replace(/EMAIL_TO:.*?---/gims, '');
  cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n');
  cleaned = cleaned.trim();
  
  return cleaned;
};

const formatContentAsHTML = (content: string): string => {
  const cleanedContent = cleanReportContent(content);
  const patients = parsePatientData(cleanedContent);
  
  // Create enhanced statistics and charts
  const advancedStats = createAdvancedStatsSection(patients);
  const patientTable = createPatientTable(patients);

  // Convert text to HTML with enhanced formatting
  let html = cleanedContent
    .replace(/^([A-Z][A-Za-z\s]+:)\s*$/gm, '<h2 style="color: #1e40af; margin: 35px 0 20px 0; font-weight: bold; font-size: 22px; border-left: 5px solid #3b82f6; padding-left: 15px; background: linear-gradient(90deg, #eff6ff, transparent); padding: 15px 15px 15px 20px; border-radius: 8px;">$1</h2>')
    .replace(/^[-•*]\s+(.+)$/gm, '<li style="margin: 12px 0; line-height: 1.8; color: #374151; padding-left: 8px; border-left: 3px solid #e5e7eb; padding-left: 15px;">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\s*)+/gs, '<ul style="margin: 20px 0; padding-left: 0; list-style: none; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e5e7eb;">$&</ul>')
    .replace(/^\d+\.\s+(.+)$/gm, '<li style="margin: 12px 0; line-height: 1.8; color: #374151; padding: 12px; background: white; border-radius: 8px; border-left: 4px solid #3b82f6; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">$1</li>')
    .replace(/^(?!<|$)(.+)$/gm, '<p style="margin: 18px 0; line-height: 1.8; color: #374151; font-size: 16px;">$1</p>');

  return advancedStats + patientTable + html;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to_email, subject, message_content } = await req.json();

    console.log('Enhanced high priority report email request:', {
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

    // Format the content with enhanced visuals
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
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
              * { box-sizing: border-box; }
              body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
              @media only screen and (max-width: 600px) {
                .stats-grid { grid-template-columns: 1fr !important; }
                .department-chart { font-size: 14px !important; }
              }
            </style>
          </head>
          <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
            <div style="max-width: 1200px; margin: 0 auto; background-color: white; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);">
              
              <!-- Enhanced Header -->
              <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%); color: white; padding: 50px; text-align: center; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grid\" width=\"10\" height=\"10\" patternUnits=\"userSpaceOnUse\"><path d=\"M 10 0 L 0 0 0 10\" fill=\"none\" stroke=\"rgba(255,255,255,0.1)\" stroke-width=\"1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grid)\"/></svg>'); opacity: 0.3;"></div>
                <div style="position: relative; z-index: 1;">
                  <h1 style="margin: 0; font-size: 42px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">🏥 FlowSense Care</h1>
                  <p style="margin: 20px 0 0 0; font-size: 20px; opacity: 0.95; font-weight: 500;">Advanced Healthcare Intelligence Platform</p>
                  <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 25px; border-radius: 16px; margin-top: 30px; border: 1px solid rgba(255,255,255,0.2);">
                    <h2 style="margin: 0; font-size: 24px; font-weight: 600;">${subject}</h2>
                    <p style="margin: 12px 0 0 0; opacity: 0.9; font-size: 16px;">📅 Generated on ${reportDate}</p>
                  </div>
                </div>
              </div>
              
              <!-- Enhanced Content -->
              <div style="padding: 50px 40px;">
                ${formattedContent}
              </div>
              
              <!-- Enhanced Footer -->
              <div style="background: linear-gradient(135deg, #f8fafc, #e2e8f0); padding: 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                <div style="margin-bottom: 20px;">
                  <span style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 12px 24px; border-radius: 25px; font-size: 14px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);">🤖 AI-Generated Report</span>
                </div>
                <p style="margin: 0; color: #6b7280; font-size: 16px; font-weight: 600;">
                  This comprehensive report was automatically generated by FlowSense Care Intelligence System
                </p>
                <p style="margin: 12px 0 0 0; color: #9ca3af; font-size: 14px; font-weight: 500;">
                  © ${new Date().getFullYear()} FlowSense Care - Transforming Healthcare Through Data Intelligence
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
      console.log('Enhanced visual email sent successfully:', {
        messageId: result.id,
        to_email
      });

      return new Response(JSON.stringify({
        success: true,
        messageId: result.id,
        to_email,
        subject,
        deliveredAt: new Date().toISOString(),
        enhanced: true
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } else {
      throw new Error(`Resend API error: ${JSON.stringify(result)}`);
    }

  } catch (error) {
    console.error('Error sending enhanced visual report email:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to send enhanced email',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
