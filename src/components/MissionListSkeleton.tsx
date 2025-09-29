"use client";

import SkeletonCard from "./SkeleteonCard";

export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}