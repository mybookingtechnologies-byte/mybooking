"use client";

import { useFormState } from "react-dom";
import { loginAction, type ActionResult } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";

const initialState: ActionResult = { success: false, message: "" };

export function AdminLoginForm() {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <form action={formAction} className="mx-auto max-w-sm space-y-4">
      <Input name="email" type="email" placeholder="Email" required />
      <Input name="password" type="password" placeholder="Password" required />
      <Button type="submit" className="w-full">Sign In</Button>
      {state.message ? (
        <p className={state.success ? "text-green-600" : "text-red-600"}>{state.message}</p>
      ) : null}
    </form>
  );
}
