import { HeroSection } from "@/components/home/HeroSection";
import { MenuPreview } from "@/components/home/MenuPreview";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CommunitySection } from "@/components/home/CommunitySection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <MenuPreview />
      <FeaturesSection />
      <CommunitySection />
      <FAQSection />
    </div>
  );
}
