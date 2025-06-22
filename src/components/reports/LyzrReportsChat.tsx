
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Mail } from 'lucide-react';
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
    sendMessage
  } = useLyzrReports();

  const handleExampleClick = (query: string) => {
    setInputMessage(query);
  };

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-white/10 flex flex-col shadow-2xl min-h-full">
      <CardHeader className="pb-4 border-b border-white/10 flex-shrink-0">
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">Reports</span>
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <Mail className="w-4 h-4" />
            <span className="text-xs">Auto-email enabled</span>
          </div>
        </CardTitle>
      </CardHeader>
      
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
