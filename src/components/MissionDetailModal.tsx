"use client";

import { Launch } from "../lib/api";
import { useEffect, useState } from "react";

export default function MissionDetailModal({
  launch,
  onClose
}: {
  launch: Launch | null;
  onClose: () => void;
}) {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (launch) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [launch]);
  
  useEffect(() => {
    if (launch) {
      const timer = setTimeout(() => setIsShowing(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsShowing(false);
    }
  }, [launch]);

  if (!launch) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${launch.name}`}
      className="fixed inset-0 z-50"
    >
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isShowing ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div className="relative z-10 flex h-full w-full items-center justify-center p-4">
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white dark:bg-slate-800 rounded-lg p-6 max-w-3xl w-full shadow-lg transition-all duration-300 ease-in-out ${isShowing ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <img
              src={launch.links.patch.large ?? launch.links.patch.small ?? "/vercel.svg"}
              alt={`${launch.name} patch`}
              className="w-36 h-36 object-contain rounded-md bg-gray-50 dark:bg-slate-700 self-center sm:self-start"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold">{launch.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {new Date(launch.date_utc).toLocaleString()} • Rocket: {typeof launch.rocket === "string" ? launch.rocket : (launch.rocket?.name ?? "Unknown")}
              </p>
              
              
              {launch.success === false && launch.failures.length > 0 && (
                <div className="mt-4 text-sm">
                  <h4 className="font-semibold text-red-600 dark:text-red-400">Mission Failure</h4>
                  <p className="mt-1 italic text-red-500 dark:text-red-400">
                    "{launch.failures[0].reason}"
                  </p>
                </div>
              )}
              

              <div className="mt-4 text-sm">
                <h4 className="font-semibold">Details</h4>
                <p className="mt-2">{launch.details ?? "No additional details available."}</p>
              </div>

              <div className="mt-4 flex gap-3 flex-wrap">
                {launch.links.wikipedia && (
                  <a href={launch.links.wikipedia} target="_blank" rel="noreferrer" className="px-3 py-1 rounded-md border bg-amber-100">
                    Wikipedia
                  </a>
                )}
                {launch.links.webcast && (
                  <a href={launch.links.webcast} target="_blank" rel="noreferrer" className="px-3 py-1 rounded-md border bg-amber-100">
                    Webcast
                  </a>
                )}
                <button onClick={onClose} className="ml-auto px-3 py-1 rounded-md border bg-red-500">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}