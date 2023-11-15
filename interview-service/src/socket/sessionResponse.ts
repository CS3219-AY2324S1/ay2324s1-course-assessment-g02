export interface SessionResponse {
  status: boolean;
  id1: number;
  id2: number;
  userId1: string;
  userId2: string;
  sessionId: string;
  questionId: number;
  isConnected: boolean;
  startTime: number;
  messages: Message[];
  difficulty: string;
  language: string;
  code: string;
}

export interface Message {
  id: string;
  message: string;
  time: number;
}
