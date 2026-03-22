"use client";

import { useEffect, useState } from "react";
import { deleteWorkItem, getWorkItem } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import LinkButton from "../buttons/LinkButton";
import Button from "../buttons/Button";
import { Pencil } from "lucide-react";

export default function WorkItemDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState<any>(null);
  const [selected, setSelected] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getWorkItem(id as string);

        if (!res) {
          throw new Error("No response from server");
        }

        const success = res.success ?? res.Success;
        const data = res.data ?? res.Data;
        const errors = res.errors ?? res.Errors;

        if (!success) {
          setError(errors?.[0] || "Failed to fetch item");
          setItem(null);
          return;
        }

        if (!data || typeof data !== "object") {
          setError("Invalid data received from server");
          setItem(null);
          return;
        }

        setItem(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchItem();
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

    try {
      setDeleting(true);
      setError(null);

      const res = await deleteWorkItem(id as string);

      const success = res?.success ?? res?.Success;
      const errors = res?.errors ?? res?.Errors;

      if (!success) {
        setError(errors?.[0] || "Failed to delete item");
        return;
      }

      router.push("/work-items");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Delete failed");
    } finally {
      setDeleting(false);
      setSelected(false);
    }
  };

  if (!item && !loading) {
    return (
      <div className="mb-4 mt-4 w-full text-center p-3 bg-red-100 text-red-700 rounded">
        {error || "Failed to load item."}
      </div>
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
      {error && (
        <div className="max-w-xl mx-auto mt-6 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

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
          icon={<Pencil />}
          textColor={"text-orange-500"}
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

              <Button
                text={deleting ? "Deleting..." : "Delete"}
                variant="danger"
                onClick={handleDelete}
                disabled={deleting}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
