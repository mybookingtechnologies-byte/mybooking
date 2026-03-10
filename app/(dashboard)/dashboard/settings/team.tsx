import { prisma } from "@/lib/prisma";
import TeamManagement from "./team-page-client";
import { headers } from "next/headers";

export default async function TeamSettingsPage() {
  // In a real app, you'd get the organization ID and user status from the session.
  // We'll mock it for now since the auth system is integrated but may be complex for build-time generation.
  // We'll return the client component which handles the dynamic fetching from the API.
  
  return <TeamManagement />;
}
