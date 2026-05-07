"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div
      className="flex flex-col items-center justify-center text-center px-6 py-24"
      style={{ background: "var(--bg-primary)", minHeight: "80dvh" }}
    >
      {/* Icon */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
        style={{ background: "rgba(239,68,68,0.08)", border: "2px solid rgba(239,68,68,0.3)" }}
      >
        <AlertTriangle size={36} strokeWidth={1.5} style={{ color: "#ef4444" }} />
      </div>

      {/* Content — Pattern A */}
      <div
        className="flex flex-col items-center text-center gap-5"
        style={{ maxWidth: "520px" }}
      >
        <span
          className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444" }}
        >
          System Alert
        </span>

        <h1 className="font-bold tracking-tight text-center" style={{ color: "var(--text-primary)" }}>
          Something went wrong
        </h1>

        <p className="text-base leading-relaxed text-center" style={{ color: "var(--text-secondary)" }}>
          We encountered an unexpected error. Our team has been notified and is working on a fix.
        </p>

        <button
          onClick={() => reset()}
          className="btn btn-primary px-8 py-3.5 text-sm font-bold rounded-full flex items-center gap-2 mt-4"
        >
          <RefreshCcw size={15} strokeWidth={2} /> Try Again
        </button>
      </div>
    </div>
  );
}
