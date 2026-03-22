"use client";

import { useState, useEffect } from "react";
import { deleteWorkItem, getWorkItems } from "@/lib/api";
import LinkButton from "../buttons/LinkButton";
import Button from "../buttons/Button";
import { SquarePen } from "lucide-react";
import { Input, Select } from "../input/Input";
import WorkItemCard from "../Cards/WorkItemCard";

export default function WorkItemsClient() {
  const [items, setItems] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdat");
  const [order, setOrder] = useState("desc");

  const fetchItems = async () => {
    const res = await getWorkItems({
      status: statusFilter,
      sortBy,
      order,
    });

    setItems(res.data || []);
  };

  useEffect(() => {
    fetchItems();
  }, [statusFilter, sortBy, order]);

  const handleDelete = async () => {
    if (!selectedId) return;

    await deleteWorkItem(selectedId);
    setSelectedId(null);
    fetchItems();
  };

  // 🔍 client-side search only (API handles filtering)
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className=" mx-auto p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Work Items</h1>

        <LinkButton
          textColor=" text-white"
          href="/create"
          text="Create Work Item"
          icon={<SquarePen />}
          variant="warning"
        />
      </div>

      {/* 🔍 FILTER BAR */}
      <div className="bg-white p-4 mb-6 flex items-center gap-4">
        <div className="flex-2">
          <Input
            placeholder="Search work items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { label: "All", value: "all" },
              { label: "Open", value: "open" },
              { label: "In Progress", value: "inprogress" },
              { label: "Completed", value: "completed" },
            ]}
          />
        </div>

        <div className="flex-1">
          <Select
            value={sortBy}
            onChange={setSortBy}
            options={[
              { label: "Created Date", value: "createdat" },
              { label: "Title", value: "title" },
            ]}
          />
        </div>

        <div className="flex-1">
          <Select
            value={order}
            onChange={setOrder}
            options={[
              { label: "Descending", value: "desc" },
              { label: "Ascending", value: "asc" },
            ]}
          />
        </div>
      </div>

      {/* EMPTY */}
      {!filteredItems.length && (
        <div className="text-center text-gray-500 mt-10">
          No work items found.
        </div>
      )}

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <WorkItemCard
            key={item.id}
            item={item}
            onDelete={(id: string) => setSelectedId(id)}
          />
        ))}
      </div>

      {/* MODAL */}
      {selectedId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this work item?
            </p>

            <div className="flex justify-end gap-3">
              <Button
                text="Cancel"
                variant="outline"
                onClick={() => setSelectedId(null)}
              />

              <Button text="Delete" variant="danger" onClick={handleDelete} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
