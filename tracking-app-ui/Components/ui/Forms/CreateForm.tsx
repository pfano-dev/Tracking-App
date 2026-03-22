"use client";

import { Input, Select, Textarea } from "@/Components/input/Input";
import { useState } from "react";

export default function CreateForm() {
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
    </div>
  );
}
