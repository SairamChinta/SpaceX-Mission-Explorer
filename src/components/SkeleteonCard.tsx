"use client";

export default function SkeletonCard() {
  return (
    <div className="flex animate-pulse gap-4 rounded-md border border-slate-200 dark:border-slate-700 p-4">
      <div className="h-20 w-20 rounded-md bg-slate-200 dark:bg-slate-700"></div>
      <div className="flex-1 space-y-3 py-1">
        <div className="h-4 w-3/4 rounded bg-slate-20 dark:bg-slate-700"></div>
        <div className="space-y-2">
          <div className="h-3 rounded bg-slate-200 dark:bg-slate-700"></div>
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-20 rounded-md bg-slate-200 dark:bg-slate-700"></div>
          <div className="h-6 w-20 rounded-md bg-slate-200 dark:bg-slate-700"></div>
        </div>
      </div>
    </div>
  );
}