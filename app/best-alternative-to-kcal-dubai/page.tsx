import type { Metadata } from "next";
import { BlogArticleBody } from "@/components/blog/BlogArticleBody";
import { BlogArticleSchema } from "@/components/blog/BlogArticleSchema";
import { BlogCtaSection } from "@/components/blog/BlogCtaSection";
import { BlogPostHero } from "@/components/blog/BlogPostHero";
import { BlogPostLayout } from "@/components/blog/BlogPostLayout";
import { bestAlternativeToKcalDubai } from "@/content/blogs/best-alternative-to-kcal-dubai";
import { extractTableOfContents } from "@/lib/blog/utils";
import { buildPageMetadata } from "@/lib/metadata";

const PATH = "/best-alternative-to-kcal-dubai";
const post = bestAlternativeToKcalDubai;

export const metadata: Metadata = buildPageMetadata({
  title: post.metaTitle ?? post.title,
  description: post.description,
  path: PATH,
  absoluteTitle: post.metaTitle != null,
  keywords: [
    "alternative to Kcal Dubai",
    "best alternative to Kcal",
    "Kcal vs NutriChef",
    "healthy meal plan Dubai",
    "NutriChef Dubai",
  ],
});

export default function BestAlternativeToKcalDubaiPage() {
  const toc = extractTableOfContents(post.blocks);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BlogArticleSchema post={post} path={PATH} />
      <BlogPostHero post={post} showBlogCrumb={false} />
      <BlogPostLayout post={post} toc={toc}>
        <BlogArticleBody blocks={post.blocks} linkAnchors={post.linkAnchors} />
      </BlogPostLayout>
      <BlogCtaSection cta={post.cta} />
    </div>
  );
}
