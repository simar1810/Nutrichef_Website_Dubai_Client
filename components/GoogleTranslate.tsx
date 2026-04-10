'use client';

import { GoogleTranslateBootstrap } from '@/components/GoogleTranslateBootstrap';
import { LanguageSelect } from '@/components/LanguageSelect';

/** Footer: single Google gadget + language dropdown (script loads once per page). */
export function GoogleTranslate() {
  return (
    <div className="notranslate relative w-full max-w-[280px]">
      <GoogleTranslateBootstrap />
      <LanguageSelect selectId="nutrichef-lang-footer" />
    </div>
  );
}
