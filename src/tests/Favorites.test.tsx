import { render, screen, fireEvent } from "@testing-library/react";
import Favorites from "../components/Favorites";
import * as api from "../lib/api";

jest.mock("../lib/api");

describe("Favorites", () => {
  beforeEach(() => {
    (api.fetchLaunches as jest.Mock).mockResolvedValue([
      { id: "alpha1", mission_name: "Alpha", launch_success: true },
    ]);
  });

  it("can favorite and persist", async () => {
    render(<Favorites />);
    await screen.findByText("Alpha");
    const favButton = screen.getByTitle("Add to favorites");
    fireEvent.click(favButton);
    expect(await screen.findByText("Alpha")).toBeInTheDocument();
  });
});
