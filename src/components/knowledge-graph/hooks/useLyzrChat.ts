
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Message } from '../types';

export const useLyzrChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const agentId = '6857bcec0377126b617ff15a';
  const [sessionId] = useState(() => `${agentId}-${Math.random().toString(36).substr(2, 9)}`);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
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
      console.log('Sending message with healthcare context integration:', {
        user_id: 'dimplefrancis@gmail.com',
        agent_id: agentId,
        session_id: sessionId,
        message: currentMessage.substring(0, 100),
        context_enabled: true
      });

      const { data, error } = await supabase.functions.invoke('lyzr-chat', {
        body: {
          user_id: 'dimplefrancis@gmail.com',
          agent_id: agentId,
          session_id: sessionId,
          message: currentMessage
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Failed to call edge function');
      }

      console.log('Healthcare-contextual AI response received:', {
        hasResponse: !!data.response,
        responseLength: data.response?.length || 0,
        hasError: !!data.error
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'I received your message but couldn\'t generate a response with the current healthcare data.',
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Show a toast if there was an error but we provided a fallback
      if (data.error) {
        toast({
          title: "Enhanced Healthcare Context",
          description: "AI service had issues, but I've provided insights based on your current patient data.",
          variant: "default",
        });
      } else {
        // Show success toast for healthcare context integration
        toast({
          title: "Healthcare Data Integrated",
          description: "Response includes insights from your current patient and department data.",
          variant: "default",
        });
      }

    } catch (error) {
      console.error('Error in useLyzrChat with healthcare context:', error);
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });

      const aiErrorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '🔧 I\'m experiencing technical difficulties connecting to the healthcare AI service. However, I can still help analyze your current patient data - please try asking about your department status, patient priorities, or resource allocation.',
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
