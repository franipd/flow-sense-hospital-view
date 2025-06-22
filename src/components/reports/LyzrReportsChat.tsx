
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
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

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-white/10 h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Healthcare Reports & Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          <ReportsChatEmptyState />
        ) : (
          <ReportsChatMessages messages={messages} isLoading={isLoading} />
        )}
        
        <ReportsChatInput
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          onSendMessage={sendMessage}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};
