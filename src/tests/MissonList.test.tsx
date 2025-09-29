// missionlist.test.tsx
import { render, screen } from "@testing-library/react";
import MissionList from "../components/MissionList";
import * as api from "../lib/api";

jest.mock("../lib/api");

const mockLaunches = [
  {
    id: "1",
    name: "FalconSat",
    date_utc: "2006-03-24T22:30:00.000Z",
    success: false,
    details: "Test mission 1",
    rocket: { name: "Falcon 1" },
    links: { patch: { small: null, large: null }, webcast: null, wikipedia: null },
    failures: [],
  },
  {
    id: "2",
    name: "DemoSat",
    date_utc: "2007-03-21T01:10:00.000Z",
    success: false,
    details: "Test mission 2",
    rocket: { name: "Falcon 1" },
    links: { patch: { small: null, large: null }, webcast: null, wikipedia: null },
    failures: [],
  },
];

describe("MissionList", () => {
  beforeEach(() => {
    (api.fetchLaunches as jest.Mock).mockResolvedValue(mockLaunches);
  });

  it("renders list after fetching", async () => {
    render(<MissionList />);
    expect(await screen.findByText("FalconSat")).toBeInTheDocument();
    expect(screen.getByText("DemoSat")).toBeInTheDocument();
  });
});
