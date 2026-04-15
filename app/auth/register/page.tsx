"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RegisterWizard } from "@/components/auth/register/RegisterWizard";

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background pt-28">
          <div className="mx-auto h-10 max-w-[480px] animate-pulse rounded-2xl bg-bg-light" />
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const registrationToken = searchParams.get("registrationToken") || "";
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (!registrationToken) {
      router.replace("/auth/login");
    }
  }, [registrationToken, router]);

  if (!registrationToken) {
    return null;
  }

  return <RegisterWizard registrationToken={registrationToken} redirect={redirect} />;
}
