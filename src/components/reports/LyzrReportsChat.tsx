
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Mail, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLyzrReports } from './hooks/useLyzrReports';
import { ReportsChatMessages } from './ReportsChatMessages';
import { ReportsChatInput } from './ReportsChatInput';
import { ReportsChatEmptyState } from './ReportsChatEmptyState';

export const LyzrReportsChat = () => {
  const {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    sendMessage,
    clearMessages
  } = useLyzrReports();

  const handleExampleClick = (query: string) => {
    setInputMessage(query);
  };

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-white/10 flex flex-col shadow-2xl min-h-full">
      {/* Clear Button - Only show when there are messages */}
      {messages.length > 0 && (
        <div className="p-4 border-b border-white/10">
          <Button
            onClick={clearMessages}
            variant="outline"
            size="sm"
            className="bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear Chat
          </Button>
        </div>
      )}
      
      <CardContent className="flex-1 flex flex-col p-6 min-h-0">
        {messages.length === 0 ? (
          <ReportsChatEmptyState onExampleClick={handleExampleClick} />
        ) : (
          <ReportsChatMessages messages={messages} isLoading={isLoading} />
        )}
        
        <div className="flex-shrink-0 mt-auto">
          <ReportsChatInput 
            inputMessage={inputMessage} 
            setInputMessage={setInputMessage} 
            onSendMessage={sendMessage} 
            isLoading={isLoading} 
          />
        </div>
      </CardContent>
    </Card>
  );
};
