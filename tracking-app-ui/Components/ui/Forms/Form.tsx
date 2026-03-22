"use client";

import { Input, Select, Textarea } from "@/Components/input/Input";
import { useState } from "react";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");

  return (
    <div className="max-w-md space-y-4">
      <Input
        label="Title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        label="Description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Select
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        options={[
          { label: "Open", value: "Open" },
          { label: "In Progress", value: "InProgress" },
          { label: "Completed", value: "Completed" },
        ]}
      />
    </div>
  );
}
