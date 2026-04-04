/** Shared Google Website Translator helpers (single gadget per page). */

export const LANGUAGE_CHOICES: { code: string; label: string }[] = [
  { code: '', label: 'English' },
  { code: 'ar', label: 'Arabic' },
  { code: 'hi', label: 'Hindi' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'it', label: 'Italian' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'zh-CN', label: 'Chinese (Simplified)' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'ru', label: 'Russian' },
  { code: 'tr', label: 'Turkish' },
  { code: 'pl', label: 'Polish' },
  { code: 'nl', label: 'Dutch' },
  { code: 'ur', label: 'Urdu' },
  { code: 'bn', label: 'Bengali' },
  { code: 'ta', label: 'Tamil' },
  { code: 'ms', label: 'Malay' },
  { code: 'id', label: 'Indonesian' },
  { code: 'th', label: 'Thai' },
  { code: 'vi', label: 'Vietnamese' },
];

export const INCLUDED_LANGUAGES = LANGUAGE_CHOICES.map((l) => l.code).filter(Boolean).join(',');

export const CB_NAME = 'googleTranslateElementInit';
export const SCRIPT_ID = 'google-translate-script';
export const SCRIPT_SRC = 'https://translate.google.com/translate_a/element.js';
export const MAX_INIT_FRAMES = 180;

/** Fired when language changes from any `LanguageSelect` so duplicates stay in sync. */
export const LANGUAGE_CHANGE_EVENT = 'nutrichef:language';

export function dispatchLanguageChange(code: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(LANGUAGE_CHANGE_EVENT, { detail: { code } }));
}

export function parseGoogtransTarget(): string {
  if (typeof document === 'undefined') return '';
  const m = document.cookie.match(/(?:^|; )googtrans=([^;]+)/);
  if (!m) return '';
  const raw = decodeURIComponent(m[1].trim());
  if (!raw || raw === '/en/en') return '';
  const parts = raw.split('/').filter(Boolean);
  if (parts.length >= 2 && parts[0] === 'en') return parts[1];
  return '';
}

function clearGoogtransCookies() {
  const host = typeof location !== 'undefined' ? location.hostname : '';
  const base = 'googtrans=;path=/;max-age=0';
  document.cookie = base;
  if (host && !host.startsWith('localhost')) {
    document.cookie = `${base};domain=.${host.replace(/^www\./, '')}`;
  }
}

export function setGoogtransCookie(targetCode: string) {
  if (!targetCode) {
    clearGoogtransCookies();
    return;
  }
  document.cookie = `googtrans=/en/${targetCode};path=/;max-age=31536000`;
}

export function tryInit(): boolean {
  const w = window as Window & {
    google?: {
      translate?: {
        TranslateElement: {
          new (options: Record<string, unknown>, elementId: string): void;
          InlineLayout?: { SIMPLE?: number; VERTICAL?: number };
        };
      };
    };
  };

  const TE = w.google?.translate?.TranslateElement;
  if (!TE) return false;

  const host = document.getElementById('google_translate_element');
  if (!host) return false;

  if (host.children.length > 0) return true;

  const layout = TE.InlineLayout?.SIMPLE ?? TE.InlineLayout?.VERTICAL ?? 0;

  try {
    new TE(
      {
        pageLanguage: 'en',
        includedLanguages: INCLUDED_LANGUAGES,
        layout,
      },
      'google_translate_element'
    );
  } catch {
    return false;
  }

  return host.children.length > 0;
}

export function scheduleInit() {
  let frames = 0;
  const tick = () => {
    frames++;
    if (tryInit()) return;
    if (frames < MAX_INIT_FRAMES) requestAnimationFrame(tick);
  };
  tick();
}

export function getGoogleCombo(): HTMLSelectElement | null {
  return document.querySelector('#google_translate_element select.goog-te-combo');
}

export function syncComboToLang(combo: HTMLSelectElement, lang: string) {
  const want = lang || '';
  const opts = Array.from(combo.options);
  const exact = opts.find((o) => o.value === want);
  if (exact) {
    combo.value = exact.value;
    return;
  }
  if (!want) {
    const empty = opts.find((o) => o.value === '' || /select language/i.test(o.text));
    if (empty) {
      combo.value = empty.value;
      return;
    }
  }
  const byCode = opts.find((o) => o.value === want || o.value.endsWith(want) || o.value.includes(want));
  if (byCode) combo.value = byCode.value;
}
