import React from 'react';
import { PageTransition } from '../components/animations/PageTransition';
import { Button } from '../components/common/Button';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <PageTransition>
      <section className="min-h-[80vh] flex items-center justify-center py-24 bg-px-bg text-center px-4">
        <div className="max-w-md mx-auto space-y-6">
          <span className="text-8xl font-black text-px-primary/20 block">404</span>
          <h1 className="text-3xl font-extrabold text-px-dark">Page Not Found</h1>
          <p className="text-sm text-gray-600">
            The page you are looking for does not exist or has been moved to another logistics route.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Button to="/" variant="primary" icon={<Home className="w-4 h-4" />}>
              Return to Home
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
