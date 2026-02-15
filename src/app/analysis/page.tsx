"use client";

import { useRouter } from "next/navigation";
import { AnalysisDashboard } from "../../components/AnalysisDashboard";
import { useAuth } from "@/contexts/AuthContext";
import { Loading } from "@/components/ui/loading";

export default function AnalysisPage() {
  const router = useRouter();
  const { loading, isBelongsToFamily } = useAuth();

  if (loading) {
    return <Loading message="認証状態を確認中..." fullScreen gradient />;
  }

  const handleBack = () => {
    router.push("/dashboard");
  };

  return isBelongsToFamily ? (
    <AnalysisDashboard onBack={handleBack} />
  ) : (
    router.push("/dashboard")
  );
}
