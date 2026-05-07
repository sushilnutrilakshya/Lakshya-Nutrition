"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
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
    <html lang="en">
      <body style={{ 
        backgroundColor: "#0a0e27", 
        color: "#ffffff", 
        fontFamily: "'Product Sans', 'Inter', system-ui, sans-serif",
        margin: 0,
        padding: 0
      }}>
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center", 
          minHeight: "100vh", 
          padding: "clamp(2rem, 10vw, 6rem)", 
          textAlign: "center" 
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(127, 232, 90, 0.1)",
            border: "2px solid #7FE85A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "2.5rem"
          }}>
            <span style={{ fontSize: "2.5rem" }}>⚠️</span>
          </div>
          <h1 style={{ 
            fontSize: "clamp(2rem, 5vw, 3.5rem)", 
            fontWeight: "bold", 
            marginBottom: "1.5rem", 
            letterSpacing: "-0.04em",
            lineHeight: "1.1"
          }}>
            Critical System Error
          </h1>
          <p style={{ 
            color: "#a8b8d8", 
            marginBottom: "3rem", 
            fontSize: "1.125rem", 
            maxWidth: "500px",
            lineHeight: "1.6"
          }}>
            We&apos;ve encountered a low-level rendering failure. Our architects have been notified.
          </p>
          <button
            onClick={() => reset()}
            style={{ 
              padding: "1rem 2.5rem", 
              backgroundColor: "#7FE85A", 
              color: "#000", 
              border: "none", 
              borderRadius: "999px", 
              fontWeight: "bold", 
              fontSize: "1rem",
              cursor: "pointer",
              transition: "transform 0.2s ease"
            }}
          >
            Attempt Restoration
          </button>
        </div>
      </body>
    </html>
  );
}

