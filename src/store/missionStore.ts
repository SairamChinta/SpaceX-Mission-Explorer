import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Launch } from "../lib/api";

interface NotificationState {
  message: string;
  type: "success" | "error";
}
let notificationTimer: NodeJS.Timeout;

type State = {
  launches: Launch[] | null;
  loading: boolean;
  error: string | null;
  favorites: Record<string, boolean>;
  filters: {
    year: string | null;
    search: string;
    onlySuccess: boolean;
    onlyFavorites: boolean;
  };
  notification: NotificationState | null;
  setLaunches: (l: Launch[]) => void;
  setLoading: (v: boolean) => void;
  setError: (e: string | null) => void;
  toggleFavorite: (id: string) => void;
  setFilters: (patch: Partial<State["filters"]>) => void;
  clearFilters: () => void;
  showNotification: (notification: NotificationState) => void; 
  hideNotification: () => void;
};

export const useMissionStore = create<State>()(
  persist(
    (set, get) => ({
      launches: null,
      loading: false,
      error: null,
      favorites: {},
      filters: {
        year: null,
        search: "",
        onlySuccess: false,
        onlyFavorites: false,
      },
      notification: null, 
      setLaunches: (l) => set({ launches: l }),
      setLoading: (v) => set({ loading: v }),
      setError: (e) => set({ error: e }),
      toggleFavorite: (id) =>
        set((state) => {
          const f = { ...state.favorites };
          if (f[id]) delete f[id];
          else f[id] = true;
          return { favorites: f };
        }),
      setFilters: (patch) =>
        set((state) => ({ filters: { ...state.filters, ...patch } })),
      clearFilters: () =>
        set({
          filters: { year: null, search: "", onlySuccess: false, onlyFavorites: false },
        }),
      
      showNotification: (notification) => {
        if (notificationTimer) clearTimeout(notificationTimer);
        set({ notification });
        notificationTimer = setTimeout(() => {
          set({ notification: null });
        }, 2000);
      },
      hideNotification: () => {
        if (notificationTimer) clearTimeout(notificationTimer);
        set({ notification: null });
      },
    }),
    {
      name: "mission-store",
      partialize: (state) => ({
        favorites: state.favorites,
        filters: state.filters,
      }),
    }
  )
);