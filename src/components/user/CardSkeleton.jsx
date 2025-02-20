import React from "react";

export default function CardSkeleton() {
  return (
    <div className="w-full max-w-sm overflow-hidden bg-white shadow-sm min-w-max animate-pulse ">
      <div className="w-full bg-gray-300 rounded-lg h-36 md:h-40 lg:h-48"></div>
      <div className="mt-4 space-y-2">
        <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
        <div className="w-3/4 h-4 bg-gray-300 rounded-md"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
}
