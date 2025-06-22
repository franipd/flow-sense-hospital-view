
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Bot, User, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const LyzrAIChat = () => {
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-white/10 h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center gap-2">
          <Bot className="w-5 h-5" />
          Lyzr AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 space-y-4 mb-4 max-h-96 overflow-y-auto">
          {messages.length === 0 && (
            <div className="text-center text-white/60 py-8">
              <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Start a conversation with Lyzr AI</p>
              <p className="text-sm mt-2">Ask questions about your healthcare data and knowledge graph</p>
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-xs font-medium">Note</span>
                </div>
                <p className="text-xs text-yellow-300">
                  Currently using a demo API key. For production use, store your Lyzr AI key securely in Supabase secrets.
                </p>
              </div>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white ml-auto'
                    : 'bg-white/10 text-white'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
              
              {message.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/10 text-white p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Lyzr AI about your healthcare data..."
            className="flex-1 min-h-[40px] max-h-[100px] bg-white/10 border-white/20 text-white placeholder:text-white/60 resize-none"
            disabled={isLoading}
          />
          <Button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-3"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
