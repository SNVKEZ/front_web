import React from "react";

export default function PageSkeleton() {
  return (
    <div className="animate-pulse space-y-6">

      <div className="h-8 w-48 bg-purple-200 rounded"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Карточка 1 */}
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="h-40 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>

        {/* Карточка 2 */}
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="h-40 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>

        {/* Карточка 3 */}
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="h-40 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

    </div>
  );
}
