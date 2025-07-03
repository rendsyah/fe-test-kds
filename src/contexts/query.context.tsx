'use client';

import type React from 'react';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  queryClient.setDefaultOptions({
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
