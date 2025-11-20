import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { RootLayout } from '@/pages/layouts/RootLayout';
import { DashboardLayout } from '@/pages/layouts/DashboardLayout';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorBoundary } from '@/core/components/ErrorBoundary';

// Lazy load pages
const HomePage = lazy(() => import('@/pages/Home'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

// Placeholder for future Purchase pages
// const PurchaseListPage = lazy(() => import('@/pages/Purchase/List'));

/**
 * @router router
 * @summary Main application routing configuration
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: (
      <ErrorBoundary>
        <div className="flex h-screen items-center justify-center">
          <h1>Application Error</h1>
        </div>
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: (
              <div className="p-4">
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <p className="text-muted-foreground">Welcome to FoodTrack Dashboard</p>
                {/* Dashboard widgets will go here */}
              </div>
            ),
          },
          // Purchase routes will be added here
          // {
          //   path: 'purchases',
          //   element: <PurchaseListPage />
          // }
        ],
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
