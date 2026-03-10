import { IndustryTemplate } from "@/components/sections/industry-template";

export default function CinemaIndustryPage() {
  return (
    <IndustryTemplate
      title="Cinema Booking"
      description="Power your theater with seat mapping, ticketing, concession sales and occupancy analytics."
      capabilities={["Seat Selection", "Online Booking", "Showtime Analytics"]}
    />
  );
}