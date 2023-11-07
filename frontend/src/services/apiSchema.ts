import { Category } from '../constants/models';

export interface AttemptedQuestionSchema {
  id: number;
  questionId: number;
  userId1: string;
  userId2: string;
  code: string;
  attemptedAt: Date;
  completedAt: Date;
  language: string;
}

export interface QuestionSchema {
  id: number;
  title: string;
  body: string;
  categories: Category[];
  complexity: string;
  createdAt: Date;
  updatedAt: Date;
  avgRating: number;
  ratings: number;
  solves: number;
}

export interface UserSchema {
  id: number;
  username: string;
  preferredComplexity: 'Easy' | 'Medium' | 'Hard';
  preferredLanguage: string;
  attemptedQuestion1: AttemptedQuestionSchema[];
  attemptedQuestion2: AttemptedQuestionSchema[];
}

export interface UserIdSchema {
  id: number;
}
