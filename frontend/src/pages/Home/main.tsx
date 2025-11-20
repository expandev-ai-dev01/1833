import { Link } from 'react-router-dom';
import { Button } from '@/core/components/ui/button';

/**
 * @page HomePage
 * @summary Landing page for FoodTrack application
 */
export const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">FoodTrack</h1>
      <p className="mb-8 text-xl text-muted-foreground max-w-[600px]">
        Simple food purchase tracking system. Manage your grocery history and monitor your monthly
        spending.
      </p>
      <div className="flex gap-4">
        <Link to="/dashboard">
          <Button size="lg">Go to Dashboard</Button>
        </Link>
        <Link to="/auth/login">
          <Button variant="outline" size="lg">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
