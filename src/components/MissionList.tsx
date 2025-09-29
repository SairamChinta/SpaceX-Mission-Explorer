"use client";

import { useEffect, useMemo, useState } from "react";
import MissionCard from "./MissionCard";
import { useMissionStore } from "../store/missionStore";
import { fetchLaunches, fetchLaunchById, Launch } from "../lib/api";
import Loading from "./MissionListSkeleton";
import MissionDetailModal from "./MissionDetailModal";
import LoadingModal from "./ModalSkeleton";

export default function MissionList() {
  const launches = useMissionStore((s) => s.launches);
  const setLaunches = useMissionStore((s) => s.setLaunches);
  const loading = useMissionStore((s) => s.loading);
  const setLoading = useMissionStore((s) => s.setLoading);
  const error = useMissionStore((s) => s.error);
  const setError = useMissionStore((s) => s.setError);
  const filters = useMissionStore((s) => s.filters);
  const favorites = useMissionStore((s) => s.favorites);
  const showNotification = useMissionStore((s) => s.showNotification);

  const [open, setOpen] = useState<Launch | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    if (launches) return;
    setLoading(true);
    fetchLaunches()
      .then((data) => {
        setLaunches(data);
        setError(null);
        showNotification({
          message: "Launches loaded and sorted by the latest date.",
          type: "success",
        });
      })
      .catch(() => {
        setError("Failed to load launches. Try again later.");
      })
      .finally(() => setLoading(false));
  }, [launches, setLaunches, setLoading, setError, showNotification]);

  useEffect(() => {
    if (!launches) return;
    showNotification({
      message: "Filters applied successfully.",
      type: "success",
    });
  }, [filters, launches, showNotification]);

  const filtered = useMemo(() => {
    if (!launches) return [];
    const s = filters.search.trim().toLowerCase();
    return launches.filter((l) => {
      if (filters.onlyFavorites && !favorites[l.id]) return false;
      if (filters.year) {
        const y = new Date(l.date_utc).getFullYear().toString();
        if (y !== filters.year) return false;
      }
      if (filters.onlySuccess && !l.success) return false;
      if (s && !l.name.toLowerCase().includes(s)) return false;
      return true;
    });
  }, [launches, filters, favorites]);

  const openDetails = async (id: string) => {
    setDetailLoading(true);
    try {
      const d = await fetchLaunchById(id);
      setOpen(d);
    } catch {
      const cached = launches?.find((x) => x.id === id) ?? null;
      setOpen(cached);
    } finally {
      setDetailLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!launches) return null;

  if (filtered.length === 0) {
    return <div className="text-center py-12 text-gray-500">No launches match your filters.</div>;
  }

  return (
    <>
      {detailLoading && (
        <div className="fixed inset-0 z-70">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative z-10 flex h-full w-full items-center justify-center">
            <LoadingModal />
          </div>
        </div>
      )}

      {/* Render mission cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((launch) => (
          <MissionCard
            key={launch.id}
            launch={launch}
            onOpen={openDetails}
          />
        ))}
      </div>

      <MissionDetailModal launch={open} onClose={() => setOpen(null)} />
    </>
  );
}
