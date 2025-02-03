import React from "react";

const LandingPageSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-12 text-center">
        <div className="h-16 w-3/4 mx-auto mb-4 bg-gray-300 rounded"></div>
        <div className="h-8 w-1/2 mx-auto bg-gray-300 rounded"></div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
        <div>
          <div className="h-64 w-full bg-gray-300 rounded"></div>
        </div>
        <div>
          <div className="h-12 w-3/4 mb-4 bg-gray-300 rounded"></div>
          <div className="h-8 w-full mb-3 bg-gray-300 rounded"></div>
          <div className="h-8 w-5/6 mb-3 bg-gray-300 rounded"></div>
          <div className="h-12 w-1/2 mt-6 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Features Section Skeleton */}
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="text-center">
            <div className="h-16 w-16 mx-auto mb-4 bg-gray-300 rounded-full"></div>
            <div className="h-6 w-3/4 mx-auto mb-3 bg-gray-300 rounded"></div>
            <div className="h-4 w-full bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* CTA Section Skeleton */}
      <div className="text-center mt-16">
        <div className="h-12 w-1/2 mx-auto mb-4 bg-gray-300 rounded"></div>
        <div className="h-8 w-3/4 mx-auto bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default LandingPageSkeleton;
