"use client";

import { useEffect, useState } from "react";
import { getWorkItem, updateWorkItem } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");

  useEffect(() => {
    const loadItem = async () => {
      const res = await getWorkItem(id as string);
      const item = res.data;

      setTitle(item.title);
      setDescription(item.description);
      setStatus(item.status);
    };

    loadItem();
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await updateWorkItem(id as string, {
      title,
      description,
      status,
    });

    router.push("/work-items");
  };

  return (
    <div className="container">
      <h1>Edit Work Item</h1>

      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Open">Open</option>
          <option value="InProgress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
