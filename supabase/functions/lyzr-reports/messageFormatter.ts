
import { HealthcareContext } from './types.ts';

export class MessageFormatter {
  static enhanceMessage(message: string, healthcareContext: HealthcareContext): string {
    return `${message}

IMPORTANT: Use ONLY the following REAL healthcare data from our live database in your response. Do NOT use fictional data.

CURRENT HEALTHCARE SYSTEM DATA:
${JSON.stringify(healthcareContext, null, 2)}

CRITICAL FORMATTING INSTRUCTIONS:
- Present patient data in clear table format using pipes (|) for columns
- Use headers like: | MRN | Patient Name | Age | Location | Status | Bed | Priority |
- Include section headers with colons (e.g., "Patient Roster:", "Summary:", "Key Findings:")
- Group related information under clear headings
- Use bullet points (-) for lists and recommendations
- Always indicate that this report is based on live database information from ${new Date().toLocaleString()}
- Focus on the specific patients and data relevant to the request

EXAMPLE TABLE FORMAT:
Patient Roster:
| MRN | Patient Name | Age | Location | Status | Bed | Priority |
|-----|-------------|-----|----------|---------|-----|-----------|
| P001 | John Smith | 45 | ICU | Critical | A-201 | High |

Include actual statistics and trends based on the real data provided above.`;
  }
}
