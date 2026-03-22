"use client";

import { useEffect, useState } from "react";
import { deleteWorkItem, getWorkItem } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import LinkButton from "../buttons/LinkButton";
import Button from "../buttons/Button";

export default function WorkItemDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState<any>(null);
  const [selected, setSelected] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await getWorkItem(id as string);
        setItem(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-24 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!id) return;

    await deleteWorkItem(id as string);
    setSelected(true);
    router.push("/work-items");
  };

  if (!item) {
    return (
      <p className="text-center mt-10 text-red-500">Failed to load item.</p>
    );
  }

  const formattedDate = new Date(item.createdAt).toLocaleString();

  const statusColor =
    item.status.toLowerCase() === "completed"
      ? "bg-green-100 text-green-700"
      : item.status.toLowerCase() === "inprogress"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-blue-100 text-blue-700";

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow space-y-4">
      <h1 className="text-3xl font-bold text-gray-800">{item.title}</h1>

      <div className="flex items-center justify-between">
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${statusColor}`}
        >
          {item.status}
        </span>

        <span className="text-sm text-gray-500">{formattedDate}</span>
      </div>

      <div className="border-t pt-4">
        <p className="text-gray-700 leading-relaxed">
          {item.description || "No description provided."}
        </p>
      </div>

      <div className="flex gap-3 mt-4 flex-wrap">
        <LinkButton
          href={`/work-items/edit/${item.id}`}
          text="Edit"
          variant="success"
          textColor={""}
        />

        <Button
          text="Delete"
          variant="danger"
          onClick={() => setSelected(true)}
        />
      </div>

      {selected && (
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
                onClick={() => setSelected(false)}
              />

              <Button text="Delete" variant="danger" onClick={handleDelete} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
