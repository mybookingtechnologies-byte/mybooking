"use client";

import { createOrganizationAction } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function OrganizationsPage() {
  const [state, formAction] = useFormState(createOrganizationAction, { success: false, message: "" });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold">Your Organizations</h1>
        <p className="text-slate-500">Create or switch between your business workspaces.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
           <h2 className="text-lg font-bold mb-4 text-slate-900">Create New</h2>
           <form action={formAction} className="space-y-4">
              <input 
                name="name" 
                placeholder="Org Name" 
                required 
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900" 
              />
              <SubmitButton />
              {state.message && <p className="text-sm text-red-500">{state.message}</p>}
           </form>
        </Card>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Creating..." : "Create Organization"}
    </Button>
  );
}
