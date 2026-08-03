import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, type LegalSection } from "@/components/legal/LegalPageLayout";
import { buildPageMetadata } from "@/lib/metadata";
import { CONTACT, DELIVERY_ZONES_TEXT, SITE_NAME, whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms & Conditions | NutriChef UAE",
  description:
    "The terms governing your use of NutriChef's website, meal plan subscriptions, payments, and delivery service across the UAE.",
  path: "/terms-and-conditions",
});

const LAST_UPDATED = "17 July 2026";

const sections: LegalSection[] = [
  {
    id: "acceptance",
    heading: "1. Acceptance of these terms",
    body: (
      <p>
        These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your
        access to and use of the {SITE_NAME} website and ordering service,
        operated by {CONTACT.name}. By creating an account, placing an
        order, or otherwise using our services, you agree to be bound by
        these Terms. If you do not agree, please do not use our services.
      </p>
    ),
  },
  {
    id: "eligibility",
    heading: "2. Eligibility & your account",
    body: (
      <>
        <p>
          You must be at least 18 years old and able to form a legally
          binding contract under UAE law to use NutriChef. You are
          responsible for keeping your account details accurate and for
          any activity carried out under your account.
        </p>
        <p>
          We verify your account using a one-time passcode (OTP) sent via
          WhatsApp or SMS. Do not share your OTP or account access with
          anyone else — NutriChef will never ask for your OTP over phone or
          email.
        </p>
      </>
    ),
  },
  {
    id: "plans-orders",
    heading: "3. Meal plans & orders",
    body: (
      <>
        <p>
          NutriChef offers meal programmes (including Fat Loss, Muscle
          Gain, Balanced Diet, Diabetic Friendly, Body Detox, Gut Health,
          Age Reverse, Customized Meal Plan, PCOD/PCOS Care, Thyroid Care,
          and Pregnancy Nutrition) across durations of 20, 24, 30, or 90
          days, with 2 to 5 meals per day. Pricing is calculated per meal
          and displayed in full before checkout.
        </p>
        <p>
          Once placed, an order&rsquo;s meal plan, duration, and meal count
          are locked in for that billing cycle; changes for the next cycle
          can be made any time before renewal via your account or our
          concierge team.
        </p>
      </>
    ),
  },
  {
    id: "health-disclaimer",
    heading: "4. Health & nutrition disclaimer",
    body: (
      <>
        <p>
          NutriChef meal plans, including those designed around fat loss,
          diabetic-friendly eating, PCOD/PCOS, thyroid support, or
          pregnancy nutrition, are prepared under the guidance of our
          nutrition team as general wellness support. They are{" "}
          <strong className="text-foreground">
            not a substitute for medical advice, diagnosis, or treatment
          </strong>
          .
        </p>
        <p>
          Always consult your physician or a qualified healthcare provider
          before starting any meal plan, particularly if you are pregnant,
          managing a medical condition, or taking medication. Please inform
          us of any food allergies or intolerances before subscribing —
          while we take care in our kitchen, we cannot guarantee any dish
          is entirely free of allergens due to shared preparation
          facilities.
        </p>
      </>
    ),
  },
  {
    id: "payments",
    heading: "5. Payments & billing",
    body: (
      <>
        <p>
          All payments are processed securely through Stripe. Prices are
          shown in AED (or your selected market&rsquo;s currency) and
          include applicable taxes unless stated otherwise. By subscribing,
          you authorise us to charge your chosen payment method for the
          plan and duration you select, and for any renewal you confirm.
        </p>
        <p>
          Because meals are prepared fresh to order, payments for a
          programme already in progress are generally non-refundable,
          except where required by UAE consumer protection law or at
          NutriChef&rsquo;s discretion for verified service failures.
        </p>
      </>
    ),
  },
  {
    id: "pause-cancel",
    heading: "6. Pausing & cancelling",
    body: (
      <p>
        You may pause or cancel your subscription at any time from your
        account dashboard or by messaging our concierge team on WhatsApp,
        with no lock-in and no penalty fees. Pausing preserves any
        remaining days on your current programme; cancelling stops future
        renewals. Meals already prepared or dispatched for delivery cannot
        be cancelled or refunded.
      </p>
    ),
  },
  {
    id: "delivery",
    heading: "7. Delivery",
    body: (
      <>
        <p>
          {DELIVERY_ZONES_TEXT}. Meals are
          prepared fresh each morning and delivered in temperature-controlled
          packaging, typically before 10 AM. Delivery windows may vary due
          to traffic, weather, or circumstances beyond our control.
        </p>
        <p>
          You are responsible for providing an accurate delivery address
          and being reasonably available to receive your order. NutriChef
          is not liable for delays or spoilage caused by an incorrect
          address, inaccessible location, or failure to collect a delivered
          order promptly.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    heading: "8. Acceptable use",
    body: (
      <p>
        You agree not to misuse our website or service — including
        attempting unauthorised access to our systems, interfering with
        site operation, submitting false order or payment information, or
        using the service for any unlawful purpose. We reserve the right to
        suspend or terminate accounts that violate these Terms.
      </p>
    ),
  },
  {
    id: "ip",
    heading: "9. Intellectual property",
    body: (
      <p>
        All content on this website — including the NutriChef name, logo,
        recipes, photography, and copy — is owned by or licensed to{" "}
        {CONTACT.name} and protected under applicable UAE and international
        intellectual property laws. You may not reproduce, distribute, or
        create derivative works from our content without prior written
        permission.
      </p>
    ),
  },
  {
    id: "liability",
    heading: "10. Limitation of liability",
    body: (
      <p>
        To the fullest extent permitted by UAE law, NutriChef&rsquo;s total
        liability for any claim arising from your use of our service is
        limited to the amount you paid for the order in question. We are
        not liable for indirect, incidental, or consequential damages,
        including any adverse health outcome arising from failure to
        disclose an allergy, medical condition, or dietary requirement, or
        from disregarding the guidance in Section 4.
      </p>
    ),
  },
  {
    id: "governing-law",
    heading: "11. Governing law",
    body: (
      <p>
        These Terms are governed by the laws of the United Arab Emirates.
        Any dispute arising from these Terms or your use of NutriChef will
        be subject to the exclusive jurisdiction of the courts of Dubai,
        UAE.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "12. Changes to these terms",
    body: (
      <p>
        We may update these Terms from time to time to reflect changes in
        our service or applicable law. Continued use of NutriChef after an
        update constitutes your acceptance of the revised Terms. Material
        changes will be reflected by an updated &ldquo;Last updated&rdquo;
        date on this page.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "13. Contact us",
    body: (
      <p>
        Questions about these Terms? Reach us at{" "}
        <a href={`mailto:${CONTACT.email}`} className="font-semibold text-primary underline-offset-4 hover:underline">
          {CONTACT.email}
        </a>
        , call{" "}
        <a href={`tel:${CONTACT.phoneTel}`} className="font-semibold text-primary underline-offset-4 hover:underline">
          {CONTACT.phone}
        </a>
        , message us on{" "}
        <a
          href={whatsappLink("Hi NutriChef, I have a question about your Terms & Conditions.")}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          WhatsApp
        </a>
        , or visit our{" "}
        <Link href="/contact-us" className="font-semibold text-primary underline-offset-4 hover:underline">
          Contact page
        </Link>
        .
      </p>
    ),
  },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="The ground rules for meal plans, payments, delivery, and everything in between — written in plain language."
      lastUpdated={LAST_UPDATED}
      sections={sections}
    />
  );
}
