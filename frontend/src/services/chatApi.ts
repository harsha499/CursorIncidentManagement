import { config } from '../config';

const API_URL = config.apiUrl;

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  message: string;
  functionCalls?: {
    function: string;
    args: any;
    result: any;
  }[];
}

export const sendChatMessage = async (
  messages: ChatMessage[]
): Promise<ChatResponse> => {
  const response = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to send message');
  }

  return response.json();
};

