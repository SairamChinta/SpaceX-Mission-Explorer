interface Rocket {
  name: string;
}

export interface Launch {

  mission_name?: any;
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null; 
  details: string | null;
  rocket: Rocket; 
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    webcast: string | null;
    wikipedia: string | null;
  };
  failures: {
    reason: string;
  }[];
}

const API_URL = "https://api.spacexdata.com/v4/launches/query";

async function queryApi(query: object): Promise<any> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data from SpaceX API.");
  }
  return response.json();
}

// Fetches ALL launches
export async function fetchLaunches(): Promise<Launch[]> {
  const query = {
    query: {}, 
    options: {
      sort: { date_utc: "desc" },
      populate: ["rocket"],
      limit:10000
    },
  };
  const data = await queryApi(query);
  return data.docs;
}

// Fetch a single launch by ID
export async function fetchLaunchById(id: string): Promise<Launch> {
  const query = {
    query: { _id: id },
    options: {
      populate: ["rocket"],
      select: {
        name: 1,
        date_utc: 1,
        success: 1,
        details: 1,
        links: 1,
        failures: 1,
      },
    },
  };
  const data = await queryApi(query);
  return data.docs[0];
}