
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface ReportMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emailSent?: boolean;
}

export const useLyzrReports = () => {
  const [messages, setMessages] = useState<ReportMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `reports-${Math.random().toString(36).substr(2, 9)}`);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ReportMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      console.log('Sending healthcare reports message:', {
        user_id: 'dimplefrancis@gmail.com',
        message: currentMessage.substring(0, 100),
        session_id: sessionId
      });

      const { data, error } = await supabase.functions.invoke('lyzr-reports', {
        body: {
          user_id: 'dimplefrancis@gmail.com',
          message: currentMessage
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Failed to call reports function');
      }

      console.log('Healthcare Reports AI response received:', {
        hasResponse: !!data.response,
        responseLength: data.response?.length || 0,
        emailSent: data.email_sent
      });

      const aiMessage: ReportMessage = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'I received your message but couldn\'t generate a response.',
        sender: 'ai',
        timestamp: new Date(),
        emailSent: data.email_sent
      };

      setMessages(prev => [...prev, aiMessage]);

      // Show appropriate toast based on email status
      if (data.email_sent) {
        toast({
          title: "Report Generated & Emailed",
          description: "Your healthcare report has been generated and sent to franipd2025@gmail.com",
          variant: "default",
        });
      } else {
        toast({
          title: "Healthcare Analysis Complete",
          description: "Response includes insights from your current healthcare data.",
          variant: "default",
        });
      }

    } catch (error) {
      console.error('Error in useLyzrReports:', error);
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });

      const aiErrorMessage: ReportMessage = {
        id: (Date.now() + 1).toString(),
        text: '🔧 I\'m experiencing technical difficulties with the healthcare reports system. Please try asking about patient summaries, department analytics, or operational reports.',
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    sendMessage
  };
};
