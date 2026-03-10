"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { submitLeadAction, type ActionResult } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/field";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const initialState: ActionResult = { success: false, message: "" };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Submitting..." : label}
    </Button>
  );
}

type ContactFormProps = {
  formId?: string;
  leadSource?: string;
  leadInterest?: string;
  defaultBusinessType?: string;
  defaultMessage?: string;
  submitLabel?: string;
  showMessageField?: boolean;
  compact?: boolean;
};

export function ContactForm({
  formId = "contact-form",
  leadSource = "contact-page",
  leadInterest = "",
  defaultBusinessType = "Business Software",
  defaultMessage = "We need help planning a software solution for our business.",
  submitLabel = "Send Message",
  showMessageField = true,
  compact = false,
}: ContactFormProps) {
  const [state, formAction] = useFormState(submitLeadAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      const source = leadSource.toLowerCase();
      trackEvent("lead_submit", { form: formId, source: leadSource, interest: leadInterest || "general" });
      trackEvent("contact_form_submission", { form: formId, source: leadSource, interest: leadInterest || "general" });

      if (source.includes("demo") || source.includes("product")) {
        trackEvent("demo_request", { form: formId, source: leadSource, interest: leadInterest || "general" });
      }
    }
  }, [state.success, formId, leadSource, leadInterest]);

  return (
    <form id={formId} ref={formRef} action={formAction} className={cn("space-y-4", compact && "space-y-3")}>
      <input type="hidden" name="leadSource" value={leadSource} />
      <input type="hidden" name="leadInterest" value={leadInterest} />
      <Input name="name" placeholder="Name" required />
      <Input name="email" type="email" placeholder="Email" required />
      <Input name="phone" placeholder="Phone" required />
      <Input name="businessType" placeholder="Business Type" defaultValue={defaultBusinessType} required />
      {showMessageField ? (
        <Textarea name="message" placeholder="Message" rows={compact ? 4 : 5} defaultValue={defaultMessage} required />
      ) : (
        <input type="hidden" name="message" value={defaultMessage} />
      )}
      <SubmitButton label={submitLabel} />
      {state.message ? (
        <p className={state.success ? "text-sm text-green-700" : "text-sm text-red-600"}>{state.message}</p>
      ) : null}
    </form>
  );
}