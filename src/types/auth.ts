export interface User {
  id: string;
  email: string;
  name?: string;
  role: "admin" | "user";
  permissions: string[];
  familyId?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  refetch: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  isAdmin: () => boolean;
}
