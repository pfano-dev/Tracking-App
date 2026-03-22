"use client";

import { useEffect, useState } from "react";
import { getWorkItems, deleteWorkItem } from "@/lib/api";
import Link from "next/link";

export default function WorkItemsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const res = await getWorkItems();
    setItems(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteWorkItem(id);
    fetchItems();
  };

  if (loading) return <p>Loading...</p>;

  if (!items.length) return <p>No work items found.</p>;

  return (
    <div className="container">
      <h1>Work Items</h1>

      <Link href="/create">➕ Create New</Link>

      {items.map((item) => (
        <div className="card" key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>
            <strong>Status:</strong> {item.status}
          </p>

          <Link href={`/work-items/${item.id}`}>View</Link>
          <Link href={`/work-items/edit/${item.id}`}>Edit</Link>

          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
