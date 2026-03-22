"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getWorkItem, updateWorkItem } from "@/lib/api";
import { Input, Textarea, Select } from "@/Components/input/Input";
import Button from "@/Components/buttons/Button";

export default function EditWorkItemForm() {
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [errors, setErrors] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!title.trim()) newErrors.push("Title is required");
    if (title.trim().length < 3)
      newErrors.push("Title must be at least 3 characters");

    if (!description.trim()) newErrors.push("Description is required");

    if (!status) newErrors.push("Status is required");

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  useEffect(() => {
    const loadItem = async () => {
      try {
        setInitialLoading(true);
        setError(null);

        const res = await getWorkItem(id as string);

        if (!res) {
          throw new Error("No response from server");
        }

        const success = res.success ?? res.Success;
        const data = res.data ?? res.Data;
        const errors = res.errors ?? res.Errors;

        if (!success) {
          setError(errors?.[0] || "Failed to load item");
          return;
        }

        if (!data) {
          setError("Invalid data received");
          return;
        }

        setTitle(data.title || "");
        setDescription(data.description || "");
        setStatus(data.status || "Open");
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setInitialLoading(false);
      }
    };

    if (id) loadItem();
  }, [id]);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError(null);
      setErrors([]);

      const res = await updateWorkItem(id as string, {
        title,
        description,
        status,
      });

      if (!res) {
        throw new Error("No response from server");
      }

      const success = res.success ?? res.Success;
      const apiErrors = res.errors ?? res.Errors;

      if (!success) {
        setErrors(apiErrors || ["Update failed"]);
        return;
      }

      router.push("/work-items");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {initialLoading ? (
        <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow">
          <p className="text-center text-gray-500">Loading work item...</p>
        </div>
      ) : error ? (
        <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow">
          <p className="text-center text-red-500">{error}</p>
        </div>
      ) : (
        <div className="max-w-md mt-4 mx-auto p-6 space-y-4 bg-white rounded-2xl shadow">
          <h1 className="text-2xl font-bold">Edit Work Item</h1>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>
          )}

          {errors.length > 0 && (
            <div className="p-3 bg-red-100 text-red-700 rounded">
              <ul className="list-disc pl-5">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Select
            label="Status"
            value={status}
            onChange={setStatus}
            options={[
              { label: "Open", value: "Open" },
              { label: "In Progress", value: "InProgress" },
              { label: "Completed", value: "Completed" },
            ]}
          />

          <Button
            text={loading ? "Updating..." : "Update Work Item"}
            variant="success"
            onClick={handleSubmit}
            disabled={loading}
          />
        </div>
      )}
    </>
  );
}
