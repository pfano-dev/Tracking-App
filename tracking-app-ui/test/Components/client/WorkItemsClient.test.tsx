import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import WorkItemsClient from "@/Components/client/WorkItemsClient";
import * as api from "@/lib/api";

// Mock the API module
jest.mock("@/lib/api", () => ({
  getWorkItems: jest.fn(),
  deleteWorkItem: jest.fn(),
}));

// Mock Next.js Link
jest.mock("next/link", () => ({ children, href }: any) => (
  <a href={href}>{children}</a>
));

// Mock Input and Select
jest.mock("@/Components/input/Input", () => ({
  Input: ({ value, onChange }: any) => (
    <input value={value} onChange={onChange} data-testid="input" />
  ),
  Select: ({ value, onChange, options }: any) => (
    <div data-testid="select">
      <span>{options.find((o: any) => o.value === value)?.label}</span>
      {options.map((opt: any) => (
        <button key={opt.value} onClick={() => onChange(opt.value)}>
          {opt.label}
        </button>
      ))}
    </div>
  ),
}));

describe("WorkItemsClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders work items from API", async () => {
    (api.getWorkItems as jest.Mock).mockResolvedValue({
      success: true,
      data: [
        { id: "1", title: "Test Item 1" },
        { id: "2", title: "Test Item 2" },
      ],
    });

    render(<WorkItemsClient />);

    expect(screen.getByText(/loading work items/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Test Item 1")).toBeInTheDocument();
      expect(screen.getByText("Test Item 2")).toBeInTheDocument();
    });
  });

  it("handles API error", async () => {
    (api.getWorkItems as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch"),
    );

    render(<WorkItemsClient />);

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
    });
  });

  it("deletes a work item", async () => {
    (api.getWorkItems as jest.Mock).mockResolvedValue({
      success: true,
      data: [{ id: "1", title: "Item to delete" }],
    });
    (api.deleteWorkItem as jest.Mock).mockResolvedValue({ success: true });

    render(<WorkItemsClient />);

    await waitFor(() => {
      expect(screen.getByText("Item to delete")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Delete")); // open modal

    const modalDeleteButtons = screen.getAllByText("Delete", {
      selector: "button",
    });
    fireEvent.click(modalDeleteButtons[modalDeleteButtons.length - 1]); // confirm delete

    await waitFor(() => {
      expect(api.deleteWorkItem).toHaveBeenCalledWith("1");
    });
  });

  it("changes status filter using Select", async () => {
    (api.getWorkItems as jest.Mock).mockResolvedValue({
      success: true,
      data: [],
    });

    render(<WorkItemsClient />);

    const openButton = screen
      .getAllByRole("button")
      .find((btn) => btn.textContent === "Open");
    fireEvent.click(openButton!);

    await waitFor(() => {
      expect(api.getWorkItems).toHaveBeenCalledWith(
        expect.objectContaining({ status: "open" }),
      );
    });
  });

  it("search filters items", async () => {
    (api.getWorkItems as jest.Mock).mockResolvedValue({
      success: true,
      data: [
        { id: "1", title: "Alpha" },
        { id: "2", title: "Beta" },
      ],
    });

    render(<WorkItemsClient />);

    await waitFor(() => {
      expect(screen.getByText("Alpha")).toBeInTheDocument();
      expect(screen.getByText("Beta")).toBeInTheDocument();
    });

    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "Alpha" } });

    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.queryByText("Beta")).not.toBeInTheDocument();
  });
});
