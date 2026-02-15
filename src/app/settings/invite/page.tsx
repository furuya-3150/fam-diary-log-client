"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { InviteScreen } from "../../../components/InviteScreen";
import { useAuth } from "@/contexts/AuthContext";
import { Loading } from "@/components/ui/loading";

export default function InvitePage() {
  const router = useRouter();
  const { loading, isAdmin } = useAuth();
  if (loading) {
    return <Loading message="認証状態を確認中..." fullScreen gradient />;
  }
  useEffect(() => {}, [router]);

  const handleBack = () => {
    router.push("/settings");
  };

  return isAdmin() ? (
    <InviteScreen onBack={handleBack} />
  ) : (
    router.push("/settings")
  );
}
