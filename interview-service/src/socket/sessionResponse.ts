export interface SessionResponse {
  status: boolean;
  id1: string;
  id2: string;
  sessionId: string;
  questionId: number;
  isConnected: boolean;
  startTime: number;
  messages: Message[];
  code: string;
}

export interface Message {
  id: string;
  message: string;
  time: number;
}
