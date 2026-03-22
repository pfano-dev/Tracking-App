import Banner from "@/Components/ui/banner/Banner";
import CreateWorkItemForm from "@/Components/ui/Forms/CreateForm";

export default function CreatePage() {
  return (
    <div className="p-6">
      <Banner
        title="create work item"
        subtitle="Manage your tasks efficiently."
        image="/mukurubanner.jpg"
        height="h-[300px]"
      />
      <CreateWorkItemForm />
    </div>
  );
}
