"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Mail, UserPlus, Trash2, ShieldCheck, User as UserIcon } from "lucide-react";

type Member = {
  id: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
  user: {
    name: string | null;
    email: string;
  };
};

export default function TeamManagement() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const response = await fetch("/api/team");
        if (response.ok) {
          const data = await response.json();
          setMembers(data);
        }
      } catch (error) {
        console.error("Failed to fetch team:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">Manage your organization members and roles.</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" /> Invite Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Organization Members</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-10 text-center text-sm text-muted-foreground italic">Loading members...</div>
          ) : members.length === 0 ? (
            <div className="py-10 text-center">
              <Users className="mx-auto h-12 w-12 text-slate-200 mb-4" />
              <p className="text-slate-500">No members found besides you.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {members.map((member) => (
                <div key={member.id} className="flex items-center justify-between py-4 group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                      <UserIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{member.user.name || "Unnamed User"}</p>
                      <p className="text-sm text-slate-500 flex items-center gap-1">
                        <Mail className="h-3 w-3" /> {member.user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 rounded-full px-3 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      <ShieldCheck className="h-3 w-3" /> {member.role}
                    </div>
                    {member.role !== "OWNER" && (
                      <button className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-slate-50 border-dashed border-slate-200">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-2">
             <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                <Mail className="h-5 w-5" />
             </div>
             <h3 className="font-bold text-slate-900">Invite by Email</h3>
             <p className="text-sm text-slate-500 max-w-sm">Share the magic! Send an invite to your colleagues to collaborate on this organization.</p>
             <div className="flex w-full max-w-md gap-2 mt-4">
               <input type="email" placeholder="colleague@company.com" className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
               <Button variant="secondary" className="px-6 font-bold">Send Invite</Button>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
