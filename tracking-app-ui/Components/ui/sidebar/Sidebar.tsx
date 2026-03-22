"use client";

import Link from "next/link";
import { Home, List, PlusCircle, RefreshCcw } from "lucide-react";
import { getWorkItems } from "@/lib/api";
import { useEffect, useState } from "react";

type Item = {
  id: string;
  title: string;
};

type SidebarProps = {
  recentItems?: Item[];
};

export default function Sidebar({ recentItems = [] }: SidebarProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchItems = async () => {
    setLoading(true);
    const res = await getWorkItems();

    setItems(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <aside className="w-64 h-screen bg-white   text-orange-500  flex flex-col p-4">
      <div className="flex items-center  gap-2 mb-8">
        <img
          src="/mukuru.png"
          alt="Mukuru Logo"
          className="w-8 h-8"
          height={25}
          width={25}
        />
        <h1 className="text-bg font-bold">Mukuru</h1>
      </div>

      <nav className="flex flex-col gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-orange-100"
        >
          <Home size={18} />
          Home
        </Link>

        <Link
          href="/create"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-orange-100"
        >
          <PlusCircle size={18} />
          Create
        </Link>

        <Link
          href="/work-items"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-orange-100"
        >
          <List size={18} />
          work item list
        </Link>
      </nav>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm text-gray-400">Recent</h2>

          <button
            onClick={fetchItems}
            className="p-1 rounded hover:bg-orange-100 transition"
            title="Refresh"
          >
            <RefreshCcw
              size={16}
              className={`${loading ? "animate-spin" : ""}`}
            />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {loading ? (
            <p className="text-gray-500 text-sm">Loading...</p>
          ) : (
            <>
              {" "}
              {items.length === 0 && (
                <p className="text-gray-500 text-sm">No recent items</p>
              )}
              {items.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  href={`/work-items/${item.id}`}
                  className="p-2 rounded-lg hover:bg-orange-100 text-sm truncate"
                >
                  {item.title}
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
