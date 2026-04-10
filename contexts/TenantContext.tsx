"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { api, TENANT_ID } from "@/lib/api";

const DEFAULT_CURRENCY = "INR";

export interface TenantInfo {
  _id: string;
  name?: string;
  brand?: string;
  currency: string;
  appPackageName?: string;
  featureList?: Array<{ name: string; status: boolean; _id: string }>;
}

interface TenantContextType {
  tenant: TenantInfo | null;
  currency: string;
  loading: boolean;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<TenantInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!TENANT_ID) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await api.get<TenantInfo>(`/tenant/${TENANT_ID}`, { noAuth: true });
        if (!cancelled && res.data?.currency) {
          setTenant(res.data);
        }
      } catch {
        if (!cancelled) setTenant(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const currency = tenant?.currency?.trim() || DEFAULT_CURRENCY;

  return (
    <TenantContext.Provider value={{ tenant, currency, loading }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant(): TenantContextType {
  const ctx = useContext(TenantContext);
  if (ctx === undefined) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return ctx;
}
