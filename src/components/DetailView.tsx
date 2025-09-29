import { useEffect, useState } from "react";
import { fetchLaunchById } from "../lib/api";

interface LaunchDetail {
  id: string;
  mission_name: string;
  details: string;
}

interface DetailViewProps {
  missionId: string;
}

export default function DetailView({ missionId }: DetailViewProps) {
  const [launch, setLaunch] = useState<LaunchDetail | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchLaunchById(missionId).then((launch) => {
      if (launch) {
        setLaunch({
          id: launch.id,
          mission_name: launch.mission_name ?? launch.mission_name ?? "",
          details: launch.details ?? "",
        });
      } else {
        setLaunch(null);
      }
    });
  }, [missionId]);

  if (!launch) return <div>Loading...</div>;

  return (
    <div>
      <h1>{launch.mission_name}</h1>
      <button onClick={() => setShowDetails(prev => !prev)}>Details</button>
      {showDetails && <p>{launch.details}</p>}
    </div>
  );
}
