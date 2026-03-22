import WorkItemDetail from "@/Components/client/WorkItemDetail";
import Banner from "@/Components/ui/banner/Banner";

export default function ItemDetail() {
  return (
    <div className="p-6">
      <Banner
        title="View a work item details"
        subtitle="Manage your tasks efficiently."
        image="/mukurubanner.jpg"
        height="h-[300px]"
      />
      <WorkItemDetail />
    </div>
  );
}
