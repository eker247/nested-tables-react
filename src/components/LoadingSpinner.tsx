import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-center text-blue-600 motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
    <span className="sr-only">Loading...</span>
  </div>
);
