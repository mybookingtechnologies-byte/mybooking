import { IndustryTemplate } from "@/components/sections/industry-template";

export default function ClinicIndustryPage() {
  return (
    <IndustryTemplate
      title="Clinic Software"
      description="Deliver better patient experiences with appointment management, e-records and prescription workflows."
      capabilities={["Appointment Scheduling", "Patient Records", "Follow-up Reminders"]}
    />
  );
}