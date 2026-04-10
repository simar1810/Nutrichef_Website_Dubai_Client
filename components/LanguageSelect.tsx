'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  LANGUAGE_CHOICES,
  parseGoogtransTarget,
  setGoogtransCookie,
  getGoogleCombo,
  syncComboToLang,
  dispatchLanguageChange,
  LANGUAGE_CHANGE_EVENT,
} from '@/lib/googleTranslateShared';

const selectStyles =
  'w-full appearance-none cursor-pointer rounded-[12px] border border-gray-200 bg-white px-4 py-2.5 pr-9 text-left text-[13px] font-medium text-[#3D4450] shadow-none outline-none transition-colors hover:border-[#249B60]/40 hover:bg-gray-50 focus:border-[#249B60] focus:ring-2 focus:ring-[#249B60]/20';

type LanguageSelectProps = {
  /** Unique id for accessibility (multiple selects on the page). */
  selectId: string;
  /** Optional wrapper class. */
  className?: string;
};

export function LanguageSelect({ selectId, className = '' }: LanguageSelectProps) {
  const [value, setValue] = useState('');
  const [hydrated, setHydrated] = useState(false);

  const options = useMemo(() => LANGUAGE_CHOICES, []);

  const syncFromCombo = useCallback(() => {
    const combo = getGoogleCombo();
    if (!combo) return;
    const raw = combo.value;
    if (options.some((o) => o.code === raw)) {
      setValue(raw);
      return;
    }
    if (!raw) {
      setValue('');
      return;
    }
    const tail = raw.split('/').pop() ?? raw;
    const hit = options.find((o) => o.code === tail || raw.endsWith(o.code));
    setValue(hit?.code ?? parseGoogtransTarget());
  }, [options]);

  useEffect(() => {
    setValue(parseGoogtransTarget());
    setHydrated(true);
  }, []);

  useEffect(() => {
    const onExternal = (e: Event) => {
      const code = (e as CustomEvent<{ code: string }>).detail?.code;
      if (typeof code === 'string') setValue(code);
    };
    window.addEventListener(LANGUAGE_CHANGE_EVENT, onExternal);
    return () => window.removeEventListener(LANGUAGE_CHANGE_EVENT, onExternal);
  }, []);

  useEffect(() => {
    let ticks = 0;
    const id = window.setInterval(() => {
      ticks++;
      const combo = getGoogleCombo();
      if (combo && combo.options.length > 0) {
        syncComboToLang(combo, parseGoogtransTarget());
        combo.addEventListener('change', syncFromCombo);
        window.clearInterval(id);
        return;
      }
      if (ticks > 200) window.clearInterval(id);
    }, 100);

    return () => {
      window.clearInterval(id);
      getGoogleCombo()?.removeEventListener('change', syncFromCombo);
    };
  }, [syncFromCombo]);

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value;
    setValue(next);

    const combo = getGoogleCombo();
    if (combo && combo.options.length > 0) {
      syncComboToLang(combo, next);
      combo.dispatchEvent(new Event('change', { bubbles: true }));
      dispatchLanguageChange(next);
      return;
    }

    setGoogtransCookie(next);
    dispatchLanguageChange(next);
    window.location.reload();
  };

  const allowed = options.some((o) => o.code === value);
  const showValue = hydrated ? (allowed ? value : '') : '';

  return (
    <div className={`notranslate relative z-10 w-full ${className}`.trim()}>
      <label className="sr-only" htmlFor={selectId}>
        Choose language
      </label>
      <div className="relative">
        <select
          id={selectId}
          value={showValue}
          onChange={onSelectChange}
          className={selectStyles}
        >
          {options.map((o) => (
            <option key={o.code || 'en'} value={o.code}>
              {o.label}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#878E99]"
          aria-hidden
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </div>
    </div>
  );
}
