"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { MembersProvider } from "@/contexts/MembersContext";
import { Toaster } from "@/components/ui/sonner";

/**
 * クライアントサイドのProviderをまとめるコンポーネント
 */
export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthProvider>
      <MembersProvider>
        {children}
        <Toaster position="top-center" />
      </MembersProvider>
    </AuthProvider>
  );
}
