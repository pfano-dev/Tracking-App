"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createWorkItem } from "@/lib/api";
import { Input, Textarea, Select } from "@/Components/input/Input";
import Button from "@/Components/buttons/Button";

export default function CreateWorkItemForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!title.trim()) {
      newErrors.push("Title is required");
    }

    if (title.length < 3) {
      newErrors.push("Title must be at least 3 characters");
    }

    if (!description.trim()) {
      newErrors.push("Description is required");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      setErrors([]);

      const response = await createWorkItem({
        title,
        description,
      });

      // 🔍 Validate API response structure
      if (!response) {
        throw new Error("No response from server");
      }

      const success = response.success ?? response.Success;
      const apiErrors = response.errors ?? response.Errors;

      if (!success) {
        setErrors(apiErrors || ["Something went wrong"]);
        return;
      }

      if (!response.data) {
        setErrors(["Invalid response: missing data"]);
        return;
      }

      router.push("/work-items");
    } catch (err: any) {
      console.error(err);

      setErrors([err.message || "Unexpected error occurred"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mt-4 mx-auto p-6 space-y-4 bg-white rounded-2xl shadow"
    >
      <h1 className="text-2xl font-bold">Create Work Item</h1>
      {errors.length > 0 && (
        <div className="p-3 bg-red-100 text-red-700 rounded">
          <ul className="list-disc pl-5">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <Input
        label="Title"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        label="Description"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button
        text={loading ? "Creating..." : "Create Work Item"}
        variant="success"
        disabled={loading}
      />
    </form>
  );
}
