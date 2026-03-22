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

  const [loading, setLoading] = useState(false); // submit loading
  const [initialLoading, setInitialLoading] = useState(true); // fetch loading

  useEffect(() => {
    const loadItem = async () => {
      try {
        const res = await getWorkItem(id as string);
        const item = res.data;

        setTitle(item.title || "");
        setDescription(item.description || "");
        setStatus(item.status || "open");
      } catch (err) {
        console.error(err);
      } finally {
        setInitialLoading(false); // ✅ stop loading AFTER fetch
      }
    };

    loadItem();
  }, [id]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await updateWorkItem(id as string, {
        title,
        description,
        status,
      });

      router.push("/work-items");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {initialLoading ? (
        <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow">
          <p className="text-center">Loading work item...</p>
        </div>
      ) : (
        <div className="max-w-md mt-4 mx-auto p-6 space-y-4 bg-white rounded-2xl shadow">
          <h1 className="text-2xl font-bold">Edit Work Item</h1>

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
            onClick={handleSubmit} // ✅ fixed
            disabled={loading}
          />
        </div>
      )}
    </>
  );
}
