import { Category } from '../constants/models';

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
}

export interface UserIdSchema {
  id: number;
}
