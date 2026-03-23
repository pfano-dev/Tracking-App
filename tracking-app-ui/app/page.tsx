import LinkButton from "@/Components/buttons/LinkButton";
import Banner from "@/Components/ui/banner/Banner";
import { List, SquarePen } from "lucide-react";

export default function Home() {
  return (
    <div className="container">
      <Banner
        title="Work Item Tracker"
        subtitle="Manage your tasks efficiently."
        image="/mukurubanner.jpg"
        height="h-[300px]"
      />
      <div className="flex justify-center mt-4 space-x-3 ">
        <LinkButton
          textColor="text-orange-500"
          href="/work-items"
          text="View Work Items"
          icon={<List />}
          variant="success"
        />

        <LinkButton
          textColor=" text-white"
          href="/create"
          text="Create Work Item"
          icon={<SquarePen />}
          variant="warning"
        />
      </div>
    </div>
  );
}
