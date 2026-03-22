"use client";

import Link from "next/link";
import { Home, List, PlusCircle, RefreshCcw, Menu } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getWorkItems();
      setItems(res.data || []);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load work items");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
  fixed md:static top-0 left-0 z-50
  w-64 h-screen md:h-auto overflow-y-auto
  bg-white text-orange-500 flex flex-col p-4
  transform transition-transform duration-300
  ${open ? "translate-x-0" : "-translate-x-full"}
  md:translate-x-0
`}
      >
        <div className="md:hidden flex items-center justify-between mb-4">
          <h1 className="font-bold"></h1>
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        <div className="flex items-center gap-2 mb-8">
          <img src="/mukuru.png" alt="Mukuru Logo" className="w-8 h-8" />
          <h1 className="font-bold">Mukuru</h1>
        </div>

        <nav className="flex flex-col gap-2">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-orange-100 transition"
          >
            <Home size={18} />
            Home
          </Link>

          <Link
            href="/create"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-orange-100 transition"
          >
            <PlusCircle size={18} />
            Create
          </Link>

          <Link
            href="/work-items"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-orange-100 transition"
          >
            <List size={18} />
            Work item list
          </Link>
        </nav>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm text-gray-400">Recent</h2>

            <button
              onClick={fetchItems}
              disabled={loading}
              className="p-1 rounded hover:bg-orange-100 transition disabled:opacity-50"
            >
              <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {error && (
              <div className="mb-2 w-full p-2 bg-red-100 text-red-700 rounded text-sm">
                {error}
              </div>
            )}
            {loading ? (
              <p className="text-gray-500 text-sm">Loading...</p>
            ) : (
              <>
                {items.length === 0 && !error && (
                  <p className="text-gray-500 text-sm">No recent items</p>
                )}

                {items.slice(0, 3).map((item) => (
                  <Link
                    key={item.id}
                    href={`/work-items/${item.id}`}
                    onClick={() => setOpen(false)}
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

      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow"
      >
        <Menu />
      </button>
    </>
  );
}
