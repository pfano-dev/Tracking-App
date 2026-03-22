import LinkButton from "@/Components/buttons/LinkButton";
import { List, SquarePen } from "lucide-react";

export default function Home() {
  return (
    <div className="container">
      <h1>🛠 Work Item Tracker</h1>

      <p>Manage your tasks efficiently.</p>
      <div className="space-x-3">
        <LinkButton
          href="/work-items"
          text="View Work Items"
          icon={<List />}
          variant="success"
        />

        <LinkButton
          href="/create"
          text="Create Work Item"
          icon={<SquarePen />}
          variant="warning"
        />
      </div>
    </div>
  );
}
