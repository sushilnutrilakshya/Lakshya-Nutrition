"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice, cn } from "@/lib/utils";
import { RAZORPAY_KEY_ID, SITE_NAME } from "@/lib/constants";
import { Lock, CheckCircle, Loader2, Quote, AlertTriangle } from "lucide-react";

// ── Validation schema ─────────────────────────────────────────────

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Valid 10-digit Indian mobile number required"),
  address: z.string().min(10, "Full address required"),
  city: z.string().min(2, "City required"),
  state: z.string().min(2, "State required"),
  pincode: z.string().regex(/^\d{6}$/, "Valid 6-digit pincode required"),
  paymentMethod: z.enum(["razorpay", "cod"]),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;
type CheckoutStep = "address" | "payment" | "success";

// ── Main component ────────────────────────────────────────────────

export default function CheckoutPage() {
  const store = useCartStore();
  const [step, setStep] = useState<CheckoutStep>("address");
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "razorpay" },
  });

  const paymentMethod = watch("paymentMethod");

  /**
   * Destructure store values here — NOT inside onSubmit — to avoid a
   * temporal dead zone bug where `cart` was referenced before its declaration.
   * These values are stable references from Zustand and safe to destructure
   * at the top of the component body.
   */
  const { cart, clearCart } = store;

  const onSubmit = useCallback(
    async (data: CheckoutForm) => {
      setSubmitting(true);
      setSubmitError(null);

      try {
        if (data.paymentMethod === "razorpay") {
          // 1. Create order on server
          const response = await fetch("/api/orders/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: cart.total * 100, // Razorpay expects paise
              currency: "INR",
              cart: cart.items,
              customer: data,
            }),
          });

          if (!response.ok) throw new Error("Failed to create order. Please try again.");
          const { orderId: rzpOrderId } = (await response.json()) as { orderId: string };

          // 2. Dynamically inject the Razorpay checkout script
          await loadRazorpayScript();

          const options = {
            key: RAZORPAY_KEY_ID,
            amount: cart.total * 100,
            currency: "INR",
            name: SITE_NAME,
            description: `Order #${rzpOrderId}`,
            order_id: rzpOrderId,
            handler: () => {
              setOrderId(rzpOrderId);
              clearCart();
              setStep("success");
            },
            prefill: {
              name: `${data.firstName} ${data.lastName}`,
              email: data.email,
              contact: data.phone,
            },
            theme: { color: "#7fe85a" },
          };

          // @ts-expect-error — Razorpay is injected as a global by the checkout script
          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          // COD flow
          const response = await fetch("/api/orders/create-cod", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cart: cart.items, customer: data, total: cart.total }),
          });
          if (!response.ok) throw new Error("Failed to place COD order. Please try again.");
          const { orderId: newOrderId } = (await response.json()) as { orderId: string };
          setOrderId(newOrderId);
          clearCart();
          setStep("success");
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again or contact support.";
        setSubmitError(message);
      } finally {
        setSubmitting(false);
      }
    },
    [cart, clearCart]
  );

  // ── Success screen ──────────────────────────────────────────────

  if (step === "success") {
    return (
      <div style={{ background: "var(--bg-primary)", minHeight: "100dvh", paddingTop: "80px" }}>
        <div
          className="w-full px-6 py-24 flex flex-col items-center text-center"
          style={{ maxWidth: "672px", marginLeft: "auto", marginRight: "auto" }}
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-10"
            style={{ background: "rgba(127,232,90,0.1)", border: "2px solid var(--accent)" }}
          >
            <CheckCircle size={48} style={{ color: "var(--accent)" }} />
          </div>
          <h1 className="font-bold tracking-tight mb-6 text-center" style={{ color: "var(--text-primary)" }}>
            Order Confirmed! 🎉
          </h1>
          <p className="text-xl mb-4" style={{ color: "var(--text-secondary)" }}>
            Success! Your performance fuel is on its way.
          </p>
          {orderId != null && (
            <div
              className="px-6 py-2 rounded-full mb-10 text-sm font-bold uppercase tracking-widest"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
            >
              Order ID: <span style={{ color: "var(--accent)" }}>#{orderId}</span>
            </div>
          )}
          <p className="text-base mb-12 max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
            We&apos;ve sent a confirmation to your email and WhatsApp. You&apos;ll receive tracking
            details as soon as your order ships.
          </p>
          <Link href="/products" className="btn btn-primary px-12 py-4 text-base font-bold rounded-full">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // ── Loading skeleton (pre-hydration) ───────────────────────────

  if (!mounted) {
    return (
      <div
        style={{
          background: "var(--bg-primary)",
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader2 className="animate-spin" style={{ color: "var(--accent)" }} size={32} />
      </div>
    );
  }

  // ── Empty cart guard ────────────────────────────────────────────

  if (cart.items.length === 0) {
    return (
      <div style={{ background: "var(--bg-primary)", minHeight: "100dvh", paddingTop: "80px" }}>
        <div
          className="w-full px-6 py-24 flex flex-col items-center text-center"
          style={{ maxWidth: "672px", marginLeft: "auto", marginRight: "auto" }}
        >
          <div className="text-5xl mb-8">🛒</div>
          <h1 className="font-bold tracking-tight mb-6 text-center" style={{ color: "var(--text-primary)" }}>
            Your cart is empty
          </h1>
          <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>
            You need to add items to your cart before you can checkout.
          </p>
          <Link href="/products" className="btn btn-primary px-10 py-4 font-bold rounded-full">
            Shop Supplements →
          </Link>
        </div>
      </div>
    );
  }

  // ── Main checkout form ──────────────────────────────────────────

  return (
    <div className="min-h-[100dvh] md:h-[100dvh] w-full flex flex-col md:flex-row overflow-hidden" style={{ background: "var(--bg-secondary)" }}>

      {/* Visual Left Half */}
      <div className="relative hidden md:flex flex-col justify-end p-12 md:w-1/2 overflow-hidden h-full">
        <Image
          src="https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=1200&q=85&auto=format&fit=crop"
          alt="Athlete training — dark studio editorial"
          fill
          className="object-cover object-center opacity-20 mix-blend-overlay"
          sizes="50vw"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 top-1/2 blur-[80px] opacity-40 bg-gradient-to-tr from-[var(--accent)] via-transparent to-[var(--accent-dark)]" style={{ zIndex: 1 }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-[var(--bg-secondary)]" style={{ zIndex: 1 }} />

        <div className="relative z-10 glass rounded-3xl p-8 max-w-md shadow-2xl" style={{ border: "1px solid var(--border)" }}>
          <Quote size={28} strokeWidth={1.5} className="mb-4" style={{ color: "var(--accent)" }} />
          <p className="text-xl font-bold mb-5 italic leading-tight" style={{ color: "var(--text-primary)" }}>
            &ldquo;This isn&rsquo;t just about whey. It&rsquo;s about unlocking what you&rsquo;re truly capable of.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&q=85&auto=format&fit=crop&crop=face"
                alt="Elite athlete testimonial"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div>
              <div className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>Elite Athlete</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>Lakshya Nutrition Ambassador</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Half */}
      <div className="md:w-1/2 flex flex-col overflow-y-auto h-full p-6 md:p-20 custom-scrollbar" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-lg w-full mx-auto pb-24 md:pb-0">
          <div className="mb-14 text-center md:text-left flex flex-col items-center md:items-start">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] mb-6"
              style={{ background: "rgba(127,232,90,0.1)", border: "1px solid rgba(127,232,90,0.2)", color: "var(--accent)" }}
            >
              Secure Checkout
            </div>
            <h1 className="font-bold tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>Final Step.</h1>
            <p className="text-lg leading-relaxed max-w-md" style={{ color: "var(--text-secondary)" }}>
              Verify your delivery details to complete your order.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8" noValidate>
            {/* Delivery address */}
            <fieldset
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent)]" />
              <legend className="font-bold text-lg mb-5 pl-3" style={{ color: "var(--text-primary)" }}>
                Delivery Address
              </legend>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="First Name" error={errors.firstName?.message} required>
                  <input {...register("firstName")} placeholder="Arjun" className="form-input" id="firstName" autoComplete="given-name" />
                </FormField>
                <FormField label="Last Name" error={errors.lastName?.message} required>
                  <input {...register("lastName")} placeholder="Sharma" className="form-input" id="lastName" autoComplete="family-name" />
                </FormField>
                <FormField label="Email Address" error={errors.email?.message} required className="col-span-2">
                  <input {...register("email")} type="email" placeholder="arjun@email.com" className="form-input" id="email" autoComplete="email" />
                </FormField>
                <FormField label="Mobile Number" error={errors.phone?.message} required className="col-span-2">
                  <input {...register("phone")} type="tel" placeholder="9876543210" className="form-input" id="phone" maxLength={10} autoComplete="tel-national" inputMode="numeric" />
                </FormField>
                <FormField label="Full Address" error={errors.address?.message} required className="col-span-2">
                  <textarea {...register("address")} placeholder="Flat No., Building, Street, Area" rows={3} className="form-input resize-none" id="address" autoComplete="street-address" />
                </FormField>
                <FormField label="City" error={errors.city?.message} required>
                  <input {...register("city")} placeholder="Mumbai" className="form-input" id="city" autoComplete="address-level2" />
                </FormField>
                <FormField label="State" error={errors.state?.message} required>
                  <input {...register("state")} placeholder="Maharashtra" className="form-input" id="state" autoComplete="address-level1" />
                </FormField>
                <FormField label="Pincode" error={errors.pincode?.message} required>
                  <input {...register("pincode")} placeholder="400001" maxLength={6} className="form-input" id="pincode" autoComplete="postal-code" inputMode="numeric" />
                </FormField>
              </div>
            </fieldset>

            {/* Payment method */}
            <fieldset
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="absolute top-0 left-0 w-1 h-full opacity-50 bg-[var(--accent-gold)]" />
              <legend className="font-bold text-lg mb-5 pl-3" style={{ color: "var(--text-primary)" }}>
                Payment Method
              </legend>

              <div className="flex flex-col gap-3" role="radiogroup" aria-label="Payment method">
                {[
                  { value: "razorpay" as const, label: "UPI / Cards / Net Banking", sub: "Powered by Razorpay", icon: "💳" },
                  { value: "cod" as const, label: "Cash on Delivery", sub: "Pay when your order arrives", icon: "💵" },
                ].map((method) => {
                  const isSelected = paymentMethod === method.value;
                  return (
                    <label
                      key={method.value}
                      htmlFor={`payment-${method.value}`}
                      className="flex items-center gap-4 rounded-xl p-4 cursor-pointer transition-all duration-200"
                      style={{
                        background: isSelected ? "rgba(127,232,90,0.08)" : "var(--bg-secondary)",
                        border: `1.5px solid ${isSelected ? "var(--accent)" : "var(--border)"}`,
                      }}
                    >
                      <input
                        {...register("paymentMethod")}
                        type="radio"
                        id={`payment-${method.value}`}
                        value={method.value}
                        className="sr-only"
                      />
                      <div
                        className="w-5 h-5 rounded-full flex-shrink-0"
                        style={{
                          border: `2px solid ${isSelected ? "var(--accent)" : "var(--border-strong)"}`,
                          background: isSelected ? "var(--accent)" : "transparent",
                        }}
                      />
                      <span className="text-2xl" aria-hidden="true">{method.icon}</span>
                      <div>
                        <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{method.label}</div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>{method.sub}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Error banner — replaces the blocking alert() */}
            {submitError != null && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl px-4 py-3"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)" }}
              >
                <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#ef4444" }} />
                <p className="text-sm" style={{ color: "#ef4444" }}>{submitError}</p>
              </div>
            )}

            {/* Sticky order summary + submit */}
            <div
              className="rounded-2xl p-6 shadow-xl sticky bottom-4 z-20"
              style={{ background: "var(--surface-elevated, var(--surface))", border: "1px solid var(--border)" }}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                  {cart.items.length} {cart.items.length === 1 ? "Item" : "Items"}
                </span>
                <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                  {formatPrice(cart.total)} total
                </span>
              </div>
              <button
                disabled={submitting}
                type="submit"
                className="btn btn-primary w-full justify-center py-4 text-base"
                aria-busy={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                    <span>Processing…</span>
                  </>
                ) : (
                  <>
                    <Lock size={16} aria-hidden="true" />
                    <span>Pay {formatPrice(cart.total)}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ── Helper components ─────────────────────────────────────────────

interface FormFieldProps {
  label: string;
  error?: string | undefined;
  required?: boolean | undefined;
  className?: string | undefined;
  children: React.ReactNode;
}

function FormField({ label, error, required, className, children }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
        {label}
        {required === true && (
          <span style={{ color: "var(--accent)" }} aria-label="required">
            {" "}*
          </span>
        )}
      </label>
      {children}
      {error != null && (
        <span className="text-xs" role="alert" style={{ color: "#ef4444" }}>
          {error}
        </span>
      )}
    </div>
  );
}

// ── Razorpay script loader ────────────────────────────────────────

/**
 * Dynamically inject the Razorpay checkout script into <head>.
 * Resolves immediately if the script is already loaded.
 * Rejects with a descriptive Error on failure.
 */
async function loadRazorpayScript(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Razorpay can only be loaded in a browser context."));
      return;
    }
    // @ts-expect-error — Razorpay is injected as a global
    if (typeof window.Razorpay !== "undefined") {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay checkout script. Check your network connection."));
    document.head.appendChild(script);
  });
}
