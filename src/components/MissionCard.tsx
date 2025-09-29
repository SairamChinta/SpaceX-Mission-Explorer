"use client";

import { Launch } from "../lib/api";
import { useMissionStore } from "../store/missionStore";
import clsx from "clsx";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

export default function MissionCard({ launch, onOpen }: { launch: Launch; onOpen: (id: string) => void }) {
  const toggleFavorite = useMissionStore((s) => s.toggleFavorite);
  const favorites = useMissionStore((s) => s.favorites);
  const isFav = !!favorites[launch.id];

  return (
    <article
      className="flex gap-4 p-4 border rounded-md hover:shadow transition-colors dark:border-slate-700 bg-white dark:bg-slate-800"
      aria-labelledby={`title-${launch.id}`}
    >
      <img
        src={launch.links.patch.small??""}
        alt={`${launch.name} patch`}
        className="w-20 h-20 rounded-md object-contain bg-gray-50 dark:bg-slate-700"
        loading="lazy"
      />
      <div className="flex-1">
        <h3 id={`title-${launch.id}`} className="text-lg font-semibold">
          {launch.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {new Date(launch.date_utc).toLocaleString()} • {typeof launch.rocket === "string" ? launch.rocket : (launch.rocket?.name ?? "Unknown rocket")}
        </p>
        <div className="mt-3 flex items-center gap-3">
          <span
            className={clsx(
              "px-2 py-1 rounded-md text-sm font-medium",
              launch.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            )}
            aria-label={launch.success ? "Success" : "Failure or unknown"}
          >
            {launch.success ? "Success" : "Failure"}
          </span>

          <button
            onClick={() => onOpen(launch.id)}
            className="text-sm px-3 py-1 rounded-md border hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            Details
          </button>

          <button
            aria-pressed={isFav}
            onClick={() => toggleFavorite(launch.id)}
            className="ml-auto"
            title={isFav ? "Unfavorite" : "Add to favorites"}
          >
            {isFav ? <FaStar size={20} /> : <CiStar size={25} />}
          </button>
        </div>
      </div>
    </article>
  );
}
