"use client";

import { loginAction } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  const [state, formAction] = useFormState(loginAction, { success: false, message: "" });

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold font-display">Login to MyBooking</h1>
          <p className="text-slate-500 text-sm">Welcome back! Please enter your details.</p>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm" 
            />
          </div>

          {state.message && (
            <p className={`text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>
              {state.message}
            </p>
          )}

          <SubmitButton />
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Don\'t have an account? <Link href="/signup" className="text-primary-600 hover:underline">Sign up</Link>
        </div>
      </Card>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Logging in..." : "Login"}
    </Button>
  );
}
