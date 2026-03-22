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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createWorkItem({
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
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mt-4 mx-auto p-6 space-y-4 bg-white rounded-2xl shadow"
    >
      <h1 className="text-2xl font-bold">Create Work Item</h1>

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
