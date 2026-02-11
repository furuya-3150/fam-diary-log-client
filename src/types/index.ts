export type Screen = 
  | 'login' 
  | 'google-auth'
  | 'facebook-auth'
  | 'create-family'
  | 'dashboard' 
  | 'post' 
  | 'confirm' 
  | 'analysis' 
  | 'settings'
  | 'invite'
  | 'notifications'
  | 'two-factor-auth'
  | 'password-change'
  | 'login-history'
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
