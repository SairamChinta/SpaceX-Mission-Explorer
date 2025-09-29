"use client";

import Filters from "../components/Fliters";
import MissionList from "../components/MissionList";

export default function Page() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Browse SpaceX launches</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
             through search, filter and favorite missions
          </p>
        </div>
        <div className="w-full md:w-2/3">
          <Filters />
        </div>
      </header>

      <MissionList />
    </div>
  );
}

