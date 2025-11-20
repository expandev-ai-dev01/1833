import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from '@/core/components/ErrorBoundary';

/**
 * @layout RootLayout
 * @summary Base layout wrapper for the application
 */
export const RootLayout = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Outlet />
      </div>
    </ErrorBoundary>
  );
};

export default RootLayout;
