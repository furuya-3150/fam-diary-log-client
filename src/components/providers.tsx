"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";

/**
 * クライアントサイドのProviderをまとめるコンポーネント
 */
export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthProvider>
      {children}
      <Toaster position="top-center" />
    </AuthProvider>
  );
}
