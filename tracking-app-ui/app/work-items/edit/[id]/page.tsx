import Banner from "@/Components/ui/banner/Banner";
import EditWorkItemForm from "@/Components/ui/Forms/EditForm";

export default async function EditPage() {
  return (
    <div className="p-6">
      <Banner
        title="Edit work item"
        subtitle="Manage your tasks efficiently."
        image="/mukurubanner.jpg"
        height="h-[300px]"
      />
      <EditWorkItemForm />
    </div>
  );
}
