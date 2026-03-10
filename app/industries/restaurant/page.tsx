import { IndustryTemplate } from "@/components/sections/industry-template";

export default function RestaurantIndustryPage() {
  return (
    <IndustryTemplate
      title="Restaurant Software"
      description="Streamline ordering, billing, kitchen management and delivery operations with one integrated system."
      capabilities={["POS + Billing", "Kitchen Display System", "Delivery Workflow"]}
    />
  );
}