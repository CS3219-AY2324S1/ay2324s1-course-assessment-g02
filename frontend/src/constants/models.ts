export interface Category {
  id: number;
  name: string;
}

export interface Question {
  id?: number;
  title: string;
  // TODO: Fix this to be dynamic with the backend
  categories: string[];
  complexity: 'Easy' | 'Medium' | 'Hard';
  body: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}
