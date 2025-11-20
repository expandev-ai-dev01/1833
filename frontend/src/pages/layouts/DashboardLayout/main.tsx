import { Outlet, Link } from 'react-router-dom';
import { ErrorBoundary } from '@/core/components/ErrorBoundary';

/**
 * @layout DashboardLayout
 * @summary Layout for authenticated dashboard pages with navigation
 */
export const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-bold text-primary">
              FoodTrack
            </Link>
            <nav className="hidden md:flex items-center gap-4">
              <Link
                to="/dashboard"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/purchases"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Purchases
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {/* User menu placeholder */}
            <div className="h-8 w-8 rounded-full bg-secondary" />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-6 px-4">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default DashboardLayout;
