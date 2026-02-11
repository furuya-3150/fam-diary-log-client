'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AnalysisDashboard } from '../../components/AnalysisDashboard';

export default function AnalysisPage() {
  const router = useRouter();

  useEffect(() => {
  }, [router]);

  const handleBack = () => {
    router.push('/dashboard');
  };

  return <AnalysisDashboard onBack={handleBack} />;
}
