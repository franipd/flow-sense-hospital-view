
export class LyzrService {
  private static readonly API_URL = 'https://agent-prod.studio.lyzr.ai/v3/inference/chat/';
  private static readonly API_KEY = 'sk-default-0sYgKnAaPx5SKQSMmofgGz9T9LQYlFng';
  private static readonly AGENT_ID = '6857e02217bfa0b3af0f3f90';

  static async sendMessage(userId: string, sessionId: string, enhancedMessage: string) {
    console.log('Enhanced message with structured formatting request, length:', enhancedMessage.length);

    const response = await fetch(this.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.API_KEY
      },
      body: JSON.stringify({
        user_id: userId,
        agent_id: this.AGENT_ID,
        session_id: sessionId,
        message: enhancedMessage
      })
    });

    if (!response.ok) {
      throw new Error(`Lyzr API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Lyzr Reports API response received:', {
      hasResponse: !!data.response,
      responseLength: data.response?.length || 0,
      using_structured_format: true
    });

    return data;
  }
}
