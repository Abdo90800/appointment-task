
import React from 'react';

export const DoctorCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 animate-pulse">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Doctor Image Skeleton */}
        <div className="flex-shrink-0 self-center sm:self-start">
          <div className="w-24 h-24 rounded-full bg-gray-200" />
        </div>
        
        {/* Doctor Info Skeleton */}
        <div className="flex-1 space-y-3">
          <div>
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
          
          {/* Rating Skeleton */}
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-200 rounded-full mr-1" />
            <div className="h-4 bg-gray-200 rounded w-12" />
          </div>
          
          {/* Location Skeleton */}
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-200 rounded-full mr-1" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
          
          {/* Availability Skeleton */}
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-200 rounded-full mr-1" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
        
        {/* Button Skeleton */}
        <div className="flex-shrink-0 self-center mt-2 sm:mt-0">
          <div className="h-10 bg-gray-200 rounded w-32" />
        </div>
      </div>
    </div>
  );
};

export const AppointmentCardSkeleton = () => {
  return (
    <div className="py-4 animate-pulse">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Image Skeleton */}
        <div className="flex-shrink-0 self-center sm:self-start">
          <div className="w-16 h-16 rounded-full bg-gray-200" />
        </div>
        
        {/* Info Skeleton */}
        <div className="flex-1">
          <div className="mb-1">
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="h-4 w-4 bg-gray-200 rounded-full mr-2" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 bg-gray-200 rounded-full mr-2" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 bg-gray-200 rounded-full mr-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        </div>
        
        {/* Action Button Skeleton */}
        <div className="flex-shrink-0 self-center">
          <div className="h-8 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </div>
  );
};
