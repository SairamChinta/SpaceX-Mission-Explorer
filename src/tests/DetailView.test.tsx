import { render, screen, fireEvent } from "@testing-library/react";
import DetailView from "../components/DetailView";
import * as api from "../lib/api";

jest.mock("../lib/api");

describe("DetailView", () => {
  beforeEach(() => {
    (api.fetchLaunchById as jest.Mock).mockResolvedValue({
      id: "x1",
      mission_name: "X-Mission",
      details: "Test mission details",
    });
  });

  it("opens detail modal", async () => {
    render(<DetailView missionId="x1" />);
    const missionTitle = await screen.findByText("X-Mission");
    expect(missionTitle).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /details/i }));
    expect(await screen.findByText("Test mission details")).toBeInTheDocument();
  });
});
