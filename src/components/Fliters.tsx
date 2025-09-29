"use client";

import { useEffect, useMemo, useState } from "react";
import { useMissionStore } from "../store/missionStore";
import debounce from "lodash.debounce";
import { ToggleSwitch } from "./ToggleSwitch"; 
import { RiResetLeftLine } from "react-icons/ri";

export default function Filters() {
  const launches = useMissionStore((s) => s.launches);
  const filters = useMissionStore((s) => s.filters);
  const setFilters = useMissionStore((s) => s.setFilters);
  const clearFilters = useMissionStore((s) => s.clearFilters);

  const years = useMemo(() => {
    if (!launches) return [];
    const set = new Set<string>();
    launches.forEach((l) => {
      const y = new Date(l.date_utc).getFullYear().toString();
      set.add(y);
    });
    return Array.from(set).sort((a, b) => parseInt(b) - parseInt(a));
  }, [launches]);

  const [searchInput, setSearchInput] = useState(filters.search);

  const debounced = useMemo(
    () =>
      debounce((val: string) => {
        setFilters({ search: val });
      }, 400),
    [setFilters]
  );

  useEffect(() => {
    debounced(searchInput);
  }, [searchInput, debounced]);

  useEffect(() => {
    return () => {
      debounced.cancel();
    };
  }, [debounced]);

  return (
    <div className="bg-amber-100 dark:bg-slate-800 border dark:border-slate-700 dark:text-black rounded-md p-4 flex flex-col md:flex-row gap-3 items-center">
      <input
        aria-label="Search missions"
        className="flex-1 rounded-md border px-3 py-2 focus:outline-none focus:ring"
        placeholder="Search by mission name"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <select
        aria-label="Filter by year"
        className="rounded-md border px-2 py-2"
        value={filters.year ?? ""}
        onChange={(e) => setFilters({ year: e.target.value || null })}
      >
        <option value="">All years</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <ToggleSwitch
        label="Successful only"
        checked={filters.onlySuccess}
        onChange={(isChecked) => setFilters({ onlySuccess: isChecked })}
      />

      <ToggleSwitch
        label="Show Favorites"
        checked={filters.onlyFavorites}
        onChange={(isChecked) => setFilters({ onlyFavorites: isChecked })}
      />

    
      <button
        onClick={() => {
          setSearchInput("");
          clearFilters();
        }}
        className="gap-1 ml-auto px-2 py-2 flex flex-row items-center justify-center bg-white rounded-md border hover:bg-blue-200 dark:hover:bg-blue-200 dark:text-black"
      >
        <div>
          Reset</div><RiResetLeftLine/>
      </button>
    </div>
  );
}
