"use client";

import LinkButton from "../buttons/LinkButton";
import Button from "../buttons/Button";
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function WorkItemCard({ item, onDelete }: any) {
  const statusStyles =
    item.status === "Completed"
      ? "bg-green-100 text-green-600"
      : item.status === "InProgress"
        ? "bg-blue-100 text-blue-600"
        : "bg-yellow-100 text-yellow-600";

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2 truncate">{item.title}</h3>

      <p className="text-gray-600 mb-3 truncate">{item.description}</p>

      <span
        className={`text-sm font-medium px-3 py-1 rounded-full ${statusStyles}`}
      >
        {item.status}
      </span>

      <div className="flex gap-3 mt-4 flex-wrap">
        <LinkButton
          href={`/work-items/${item.id}`}
          text="View"
          textColor={"text-white"}
          icon={<Eye />}
          variant="warning"
        />

        <LinkButton
          href={`/work-items/edit/${item.id}`}
          text="Edit"
          variant="success"
          icon={<Pencil />}
          textColor={""}
        />

        <Button
          text="Delete"
          variant="danger"
          onClick={() => onDelete(item.id)}
        />
      </div>
    </div>
  );
}
