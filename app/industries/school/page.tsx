import { IndustryTemplate } from "@/components/sections/industry-template";

export default function SchoolIndustryPage() {
  return (
    <IndustryTemplate
      title="School ERP"
      description="Unify admissions, attendance, fees, reports and parent communication on a secure cloud platform."
      capabilities={["Admissions", "Fee Management", "Academic Reporting"]}
    />
  );
}