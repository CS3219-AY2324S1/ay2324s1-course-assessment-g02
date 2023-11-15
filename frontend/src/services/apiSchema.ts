export interface AttemptedQuestionSchema {
  id: number;
  questionId: number;
  userId1: number;
  userId2: number;
  code: string;
  attemptedAt: Date;
  completedAt: Date;
  language: string;
  question;
  user1;
  user2;
}

export interface QuestionSchema {
  id?: number;
  title: string;
  body: string;
  categories: { [key: number]: string };
  complexity: string;
  createdAt?: Date;
  updatedAt?: Date;
  avgRating?: number;
  ratings?: number;
  solves?: number;
}

export interface UserSchema {
  id: number;
  username: string;
  preferredComplexity: 'Easy' | 'Medium' | 'Hard';
  preferredLanguage: string;
  attemptedQuestion1: AttemptedQuestionSchema[];
  attemptedQuestion2: AttemptedQuestionSchema[];
  isDeleted: boolean;
}

export interface UserIdSchema {
  id: number;
}
