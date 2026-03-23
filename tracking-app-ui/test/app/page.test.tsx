// test/app/page.test.tsx
import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

describe("Home Component", () => {
  it("renders the Banner component with correct content", () => {
    render(<Home />);

    // Check that title and subtitle render
    expect(screen.getByText("Work Item Tracker")).toBeInTheDocument();
    expect(
      screen.getByText("Manage your tasks efficiently."),
    ).toBeInTheDocument();
  });

  it("renders the LinkButtons with correct text and hrefs", () => {
    render(<Home />);

    const viewButton = screen.getByText("View Work Items");
    expect(viewButton).toBeInTheDocument();
    expect(viewButton.closest("a")).toHaveAttribute("href", "/work-items");

    const createButton = screen.getByText("Create Work Item");
    expect(createButton).toBeInTheDocument();
    expect(createButton.closest("a")).toHaveAttribute("href", "/create");
  });
});
