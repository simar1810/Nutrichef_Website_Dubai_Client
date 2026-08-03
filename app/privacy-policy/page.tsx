import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, type LegalSection } from "@/components/legal/LegalPageLayout";
import { buildPageMetadata } from "@/lib/metadata";
import { CONTACT, SITE_NAME, whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy | NutriChef UAE",
  description:
    "How NutriChef collects, uses, and protects your personal data — account details, delivery information, payment processing, and your rights under UAE data protection law.",
  path: "/privacy-policy",
});

const LAST_UPDATED = "17 July 2026";

const sections: LegalSection[] = [
  {
    id: "overview",
    heading: "1. Overview",
    body: (
      <>
        <p>
          {CONTACT.name} (trading as {SITE_NAME}, &ldquo;NutriChef&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates nutrichef.ae and the
          NutriChef ordering experience across the UAE. This Privacy Policy
          explains what personal data we collect when you browse our site,
          create an account, subscribe to a meal plan, or contact our
          concierge team — and how we use, store, and protect it.
        </p>
        <p>
          By using our website or placing an order, you agree to the
          practices described here. If you do not agree, please do not use
          our services, or contact us so we can address your concerns
          directly.
        </p>
      </>
    ),
  },
  {
    id: "data-we-collect",
    heading: "2. Information we collect",
    body: (
      <>
        <p>
          <strong className="text-foreground">Account &amp; contact details</strong>{" "}
          — your name, mobile number, email address, and delivery
          address(es) when you register or check out.
        </p>
        <p>
          <strong className="text-foreground">Order &amp; plan preferences</strong>{" "}
          — the meal programme, meals per day, duration, and any dietary
          preferences or health-related goals you select (for example, if
          you choose a Fat Loss, Diabetic Friendly, PCOD/PCOS, Thyroid, or
          Pregnancy Nutrition plan). We treat this as sensitive information
          and use it solely to personalise your meals and macros — never to
          profile you for unrelated purposes.
        </p>
        <p>
          <strong className="text-foreground">Payment information</strong> — we
          use Stripe as our payment processor. NutriChef never sees or
          stores your full card number; Stripe handles payment data under
          its own PCI-compliant security standards.
        </p>
        <p>
          <strong className="text-foreground">Communications</strong> — messages
          you send us via WhatsApp, phone, or our contact form, including
          the one-time passcodes (OTPs) used to verify your phone number at
          login.
        </p>
        <p>
          <strong className="text-foreground">Technical data</strong> — IP
          address, browser type, device information, and pages visited,
          collected automatically through cookies and analytics tools
          (including Google Ads/Analytics) to keep the site secure and
          understand how it&rsquo;s used.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    heading: "3. How we use your information",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>To create and manage your account and verify your identity via OTP.</li>
        <li>To prepare, personalise, and deliver your meal plan to the correct address, on time.</li>
        <li>To process payments and manage subscriptions, renewals, pauses, and cancellations.</li>
        <li>To send order updates, delivery notifications, and — only with your consent — offers and product news via WhatsApp, SMS, or email.</li>
        <li>To respond to your questions through our concierge team.</li>
        <li>To improve our website, menu, and operations, and to detect fraud or misuse.</li>
        <li>To comply with our legal and regulatory obligations in the UAE.</li>
      </ul>
    ),
  },
  {
    id: "sharing",
    heading: "4. Who we share it with",
    body: (
      <>
        <p>We do not sell your personal data. We share it only where necessary to run our service:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-foreground">Payment processing</strong> — Stripe, to complete and secure transactions.</li>
          <li><strong className="text-foreground">Messaging</strong> — WhatsApp/Twilio, to deliver OTPs and order notifications.</li>
          <li><strong className="text-foreground">Cloud &amp; infrastructure providers</strong> — for secure hosting and storage of order data.</li>
          <li><strong className="text-foreground">Delivery riders and kitchen staff</strong> — limited to the name, address, and order details needed to fulfil your delivery.</li>
          <li><strong className="text-foreground">Legal authorities</strong> — only where required by UAE law or a valid legal request.</li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    heading: "5. Cookies & tracking",
    body: (
      <p>
        We use essential cookies to keep you logged in and remember your
        preferences (such as your selected market and language), and
        analytics/advertising cookies (including Google Ads conversion
        tracking) to understand site performance and measure campaign
        effectiveness. You can control or disable cookies in your browser
        settings at any time; some parts of the site may not function
        correctly without them.
      </p>
    ),
  },
  {
    id: "retention",
    heading: "6. Data retention",
    body: (
      <p>
        We retain your account and order data for as long as your account
        is active and for a reasonable period afterwards to meet
        accounting, tax, and legal obligations in the UAE. You may request
        deletion of your account at any time, subject to records we are
        legally required to keep.
      </p>
    ),
  },
  {
    id: "security",
    heading: "7. How we protect your data",
    body: (
      <p>
        We use industry-standard safeguards — encrypted connections
        (HTTPS), access-controlled databases, and OTP-based authentication
        — to protect your information from unauthorised access, loss, or
        misuse. No method of transmission or storage is 100% secure, but we
        continuously review our practices to keep your data safe.
      </p>
    ),
  },
  {
    id: "your-rights",
    heading: "8. Your rights",
    body: (
      <>
        <p>You can, at any time:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Access, update, or correct the personal information in your account.</li>
          <li>Request a copy of the data we hold about you.</li>
          <li>Request deletion of your account and associated data.</li>
          <li>Opt out of marketing messages via WhatsApp, SMS, or email at any time.</li>
          <li>Withdraw consent for optional data uses (this does not affect data we must keep for legal or contractual reasons).</li>
        </ul>
        <p>
          To exercise any of these rights, contact us using the details
          below — we&rsquo;ll respond within a reasonable timeframe.
        </p>
      </>
    ),
  },
  {
    id: "children",
    heading: "9. Children's privacy",
    body: (
      <p>
        NutriChef&rsquo;s services are intended for adults capable of
        entering a binding contract. We do not knowingly collect personal
        data from children under 18. If you believe a child has provided us
        with personal information, please contact us and we will remove it.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "10. Changes to this policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time to reflect
        changes in our practices or applicable law. Material changes will
        be posted on this page with an updated &ldquo;Last updated&rdquo;
        date. We encourage you to review this page periodically.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "11. Contact us",
    body: (
      <p>
        For any privacy questions or requests, reach us at{" "}
        <a href={`mailto:${CONTACT.email}`} className="font-semibold text-primary underline-offset-4 hover:underline">
          {CONTACT.email}
        </a>
        , call{" "}
        <a href={`tel:${CONTACT.phoneTel}`} className="font-semibold text-primary underline-offset-4 hover:underline">
          {CONTACT.phone}
        </a>
        , message us on{" "}
        <a
          href={whatsappLink("Hi NutriChef, I have a question about your Privacy Policy.")}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          WhatsApp
        </a>
        , or write to us at {CONTACT.address}. You can also visit our{" "}
        <Link href="/contact-us" className="font-semibold text-primary underline-offset-4 hover:underline">
          Contact page
        </Link>
        .
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      intro="Your trust matters as much as your macros. Here's exactly what we collect, why, and how we keep it safe."
      lastUpdated={LAST_UPDATED}
      sections={sections}
    />
  );
}
