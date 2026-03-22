"use client";

import { useState } from "react";
import { createWorkItem } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await createWorkItem({ title, description });

    router.push("/work-items");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Work Item</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Create</button>
    </form>
  );
}
