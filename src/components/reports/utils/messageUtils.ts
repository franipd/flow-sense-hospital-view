
export const cleanAIResponse = (content: string): string => {
  // Remove unwanted system messages and email formatting
  let cleaned = content
    .replace(/AFFIRMATIVE\s*\n*/gi, '')
    .replace(/EMAIL_TO:\s*[^\n]+\n*/gi, '')
    .replace(/SUBJECT:\s*[^\n]+\n*/gi, '')
    .replace(/--\s*\n*/gi, '')
    .replace(/SESSION_ID:\s*[^\n]+\n*/gi, '')
    .replace(/\[SYSTEM\].*?\[\/SYSTEM\]/gi, '')
    .trim();
  
  return cleaned;
};

export const formatTimestamp = (timestamp: Date): string => {
  const now = new Date();
  const isToday = timestamp.toDateString() === now.toDateString();
  
  if (isToday) {
    return `Today at ${timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })}`;
  }
  
  return timestamp.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
