export default function ModalSkeleton() {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="relative z-50 bg-white dark:bg-slate-800 rounded-lg p-8 w-[90%] max-w-4xl h-[30vh] shadow-xl animate-pulse">
        <div className="flex gap-6">
          <div className="w-1/3 h-32 bg-gray-300 dark:bg-slate-700 rounded-md skeleton" />

          <div className="flex-1 space-y-5">
            <div className="h-5 bg-gray-300 dark:bg-slate-700 rounded w-2/3 skeleton"></div>
            <div className="h-3 bg-gray-300 dark:bg-slate-700 rounded w-1/2 skeleton"></div>
           <div className="h-3 bg-gray-300 dark:bg-slate-700 rounded w-3/4 skeleton"></div>
            
          </div>
        </div>

        <div className="mt-2 flex justify-end gap-2">
          <div className="w-24 h-9 mr-80 bg-gray-300 dark:bg-slate-700 rounded skeleton"></div>
          <div className="w-24 h-9 bg-gray-300 dark:bg-slate-700 rounded skeleton"></div>
        </div>
      </div>
    </div>
  );
}
