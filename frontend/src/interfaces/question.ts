export interface Question {
  id: number;
  title: string;
  complexity: Complexity;
  categories: string[];
  description: string;
}

export enum Complexity {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}
