import { IndustryTemplate } from "@/components/sections/industry-template";

export default function HotelIndustryPage() {
  return (
    <IndustryTemplate
      title="Hotel Management System"
      description="Manage reservations, front-office tasks, housekeeping and reporting for single or multi-property operations."
      capabilities={["Reservation Engine", "Housekeeping Automation", "Revenue Analytics"]}
    />
  );
}