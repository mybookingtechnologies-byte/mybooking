import { IndustryTemplate } from "@/components/sections/industry-template";

export default function GymIndustryPage() {
  return (
    <IndustryTemplate
      title="Gym Management"
      description="Digitize your memberships, trainer schedules, class planning and recurring payment operations."
      capabilities={["Membership Billing", "Trainer Scheduling", "Attendance Tracking"]}
    />
  );
}