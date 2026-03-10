"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { Card } from "@/components/ui/card";

export function GrowthWidgets() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem("lead-popup-dismissed");
    if (dismissed === "1") return;

    const timer = window.setTimeout(() => {
      setShowPopup(true);
    }, 15000);

    return () => window.clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    window.localStorage.setItem("lead-popup-dismissed", "1");
  };

  return (
    <>
      {showPopup ? (
        <div className="fixed inset-x-4 bottom-24 z-[60] md:inset-x-auto md:bottom-6 md:right-6 md:w-[360px]">
          <Card className="border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-700">Quick Consultation</p>
                <h3 className="mt-2 text-lg font-bold text-slate-900">Need a project estimate?</h3>
              </div>
              <button
                type="button"
                aria-label="Close lead popup"
                onClick={closePopup}
                className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-sm text-slate-600">Share your details and our team will reach out with a tailored proposal.</p>
            <div className="mt-4">
              <ContactForm
                formId="lead-popup-form"
                leadSource="lead-popup"
                submitLabel="Get Callback"
                defaultBusinessType="Startup / SMB"
                defaultMessage="Please call me to discuss project requirements and pricing options."
                showMessageField={false}
                compact
              />
            </div>
          </Card>
        </div>
      ) : null}

      {whatsappNumber ? (
        <Link
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition hover:scale-105"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-7 w-7" />
        </Link>
      ) : null}
    </>
  );
}
