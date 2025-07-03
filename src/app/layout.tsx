import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
import { QueryProvider } from '@/contexts/query.context';
import { NetworkProvider } from '@/contexts/network.context';
import { SidebarProvider } from '@/contexts/sidebar.context';
import { GlobalProvider } from '@/contexts/global.context';
import './globals.css';

const FeedbackModal = dynamic(() => import('@/components/ui/modal/FeedbackModal'));

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CMS Application',
  description: 'Page of CMS Application',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <QueryProvider>
          <GlobalProvider>
            <NetworkProvider>
              <SidebarProvider>
                <FeedbackModal />
                <Toaster />
                {children}
              </SidebarProvider>
            </NetworkProvider>
          </GlobalProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
