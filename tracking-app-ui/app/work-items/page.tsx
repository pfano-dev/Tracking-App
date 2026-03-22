import WorkItemsClient from "@/Components/client/WorkItemsClient";
import { getWorkItems } from "@/lib/api";

export default async function WorkItemsPage() {
  return <WorkItemsClient />;
}
