import { useEffect, useState } from "react";
import { fetchLaunches, Launch } from "../lib/api";

export default function Favorites() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    fetchLaunches().then(setLaunches);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  return (
    <div>
      {launches.map(launch => (
        <div key={launch.id}>
          <span>{launch.mission_name}</span>
          <button
            title="Add to favorites"
            onClick={() => toggleFavorite(launch.id)}
          >
            {favorites.includes(launch.id) ? "★" : "☆"}
          </button>
        </div>
      ))}
    </div>
  );
}
