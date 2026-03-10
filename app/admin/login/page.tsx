import { AdminLoginForm } from "@/components/sections/admin-login-form";
import { Card } from "@/components/ui/card";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <Card className="w-full max-w-md">
        <h1 className="text-center font-display text-2xl font-bold">Admin Portal</h1>
        <p className="mt-2 text-center text-sm text-slate-500">
          Sign in to manage your platform
        </p>
        <div className="mt-8 text-slate-900">
          <AdminLoginForm />
        </div>
      </Card>
    </div>
  );
}
