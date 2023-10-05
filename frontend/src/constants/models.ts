export interface Category {
  id: number;
  name: string;
}

export interface Question {
  id?: number;
  title: string;
  categories: Category[];
  complexity: 'Easy' | 'Medium' | 'Hard';
  link: string;
  body: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}
