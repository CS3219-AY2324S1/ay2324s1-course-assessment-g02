import { Category } from '../models';

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
}

export interface UserIdSchema {
  id: number;
}
