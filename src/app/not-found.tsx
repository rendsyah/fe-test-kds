'use client';

import type React from 'react';
import { useRouter } from 'next/navigation';
import AppDefaultLayout from '@/components/layout/AppDefault';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  return (
    <AppDefaultLayout>
      <div className="w-full h-screen max-w-sm mx-auto flex flex-col justify-center items-center gap-4">
        <h1 className="text-xl">404 - Not Found!</h1>
        <ButtonSecondary className="w-auto" onClick={() => router.back()}>
          Go Back
        </ButtonSecondary>
      </div>
    </AppDefaultLayout>
  );
};

export default NotFoundPage;
