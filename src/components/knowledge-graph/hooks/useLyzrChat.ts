
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
      console.log('Sending message through edge function:', {
        user_id: 'dimplefrancis@gmail.com',
        agent_id: agentId,
        session_id: sessionId,
        message: currentMessage.substring(0, 100)
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

      console.log('Edge function response:', data);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'I received your message but couldn\'t generate a response.',
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Show a toast if there was an error but we provided a fallback
      if (data.error) {
        toast({
          title: "Service Notice",
          description: "AI service is experiencing issues, but I've provided a helpful response.",
          variant: "default",
        });
      }

    } catch (error) {
      console.error('Error in useLyzrChat:', error);
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });

      const aiErrorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '🔧 I\'m experiencing technical difficulties. Please try again in a moment. If the issue persists, the service may be temporarily unavailable.',
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
