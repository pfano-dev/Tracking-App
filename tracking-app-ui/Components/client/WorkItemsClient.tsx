"use client";

import { useState, useEffect } from "react";
import { deleteWorkItem, getWorkItems } from "@/lib/api";
import LinkButton from "../buttons/LinkButton";
import Button from "../buttons/Button";
import { FunnelPlus, SquarePen } from "lucide-react";
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

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Work Items</h1>

        <LinkButton
          textColor="text-white"
          href="/create"
          text="Create Work Item"
          icon={<SquarePen size={18} />}
          variant="warning"
        />
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <FunnelPlus size={18} />
          <span className="font-medium text-sm">Filters</span>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
          <div className="w-full md:flex-1">
            <Input
              placeholder="Search work items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="w-full md:w-40">
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

          <div className="w-full md:w-40">
            <Select
              value={sortBy}
              onChange={setSortBy}
              options={[
                { label: "Created Date", value: "createdat" },
                { label: "Title", value: "title" },
              ]}
            />
          </div>

          <div className="w-full md:w-40">
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
      </div>

      {!filteredItems.length && (
        <div className="text-center text-gray-500 mt-10">
          No work items found.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredItems.map((item) => (
          <WorkItemCard
            key={item.id}
            item={item}
            onDelete={(id: string) => setSelectedId(id)}
          />
        ))}
      </div>

      {selectedId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-5 md:p-6 rounded-2xl shadow-xl w-full max-w-md">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Confirm Delete
            </h2>

            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Are you sure you want to delete this work item?
            </p>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
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
