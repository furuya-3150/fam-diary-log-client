export type Screen = 
  | 'login' 
  | 'create-family'
  | 'dashboard' 
  | 'post' 
  | 'analysis' 
  | 'settings'
  | 'invite'
  | 'profile-edit';

export interface DiaryPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  timestamp: Date;
  image?: string;
  vocabularyScore: number;
  writingTime: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
