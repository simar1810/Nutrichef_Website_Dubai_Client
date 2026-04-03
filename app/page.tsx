import { HeroSection } from "@/components/home/HeroSection";
import { MenuPreview } from "@/components/home/MenuPreview";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CommunitySection } from "@/components/home/CommunitySection";
import { MealPlansSection } from "@/components/home/MealPlansSection";
import { FAQSection } from "@/components/home/FAQSection";
import { InstagramFeed } from "@/components/home/InstagramFeed";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <MenuPreview />
      <FeaturesSection />
      <HowItWorks />
      <CommunitySection />
      <MealPlansSection />
      <FAQSection />
      <InstagramFeed />
    </div>
  );
}
