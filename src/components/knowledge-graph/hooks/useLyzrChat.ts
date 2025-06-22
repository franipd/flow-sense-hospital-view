
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
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
      console.log('Sending request to Lyzr AI with payload:', {
        user_id: 'dimplefrancis@gmail.com',
        agent_id: agentId,
        session_id: sessionId,
        message: currentMessage
      });

      const response = await fetch('https://agent-prod.studio.lyzr.ai/v3/inference/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'sk-default-0sYgKnAaPx5SKQSMmofgGz9T9LQYlFng'
        },
        body: JSON.stringify({
          user_id: 'dimplefrancis@gmail.com',
          agent_id: agentId,
          session_id: sessionId,
          message: currentMessage
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        
        // Handle specific 500 error from Lyzr AI
        if (response.status === 500) {
          throw new Error('Lyzr AI service is currently experiencing technical difficulties. This appears to be a server-side issue with their API.');
        }
        
        throw new Error(`API returned ${response.status}: ${errorText || response.statusText}`);
      }

      const data = await response.json();
      console.log('Lyzr AI response data:', data);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || data.message || data.content || 'I received your message but couldn\'t generate a response.',
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error calling Lyzr AI:', error);
      
      // Check if this is the coroutine serialization error
      const isCoroutineError = error instanceof Error && 
        error.message.includes('coroutine is not JSON serializable');
      
      let errorMessage = 'Failed to get response from Lyzr AI. Please try again.';
      
      if (isCoroutineError) {
        errorMessage = 'Lyzr AI service is experiencing technical difficulties. This is a known server-side issue. Please try again later or contact Lyzr AI support.';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });

      const aiErrorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: isCoroutineError 
          ? '🔧 I\'m experiencing technical difficulties due to a server-side issue with the Lyzr AI service. This is a known bug where their API is trying to serialize Python coroutine objects to JSON. Please try again later or contact Lyzr AI support.'
          : `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
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
