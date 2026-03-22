"use client";

import { useEffect, useState } from "react";
import { getWorkItem } from "@/lib/api";
import { useParams } from "next/navigation";

export default function WorkItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    const fetchItem = async () => {
      const res = await getWorkItem(id as string);
      setItem(res.data);
    };

    fetchItem();
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <div>
      <h1>{item.title}</h1>
      <p>{item.description}</p>
      <p>Status: {item.status}</p>
    </div>
  );
}
