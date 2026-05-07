import type { Metadata } from "next";
import { HeroScrollTrigger } from "@/components/animations/HeroScrollTrigger";
import { TrustMarquee } from "@/components/animations/Marquee";
import { CircularSlider } from "@/components/animations/CircularSlider";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { MOCK_PRODUCTS, TESTIMONIALS, BLOG_POSTS } from "@/lib/mock-data";
import { HomeSections } from "@/components/home/HomeSections";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Fuel Your Ambition. Conquer Every Goal.`,
  description:
    "India's most trusted premium sports nutrition brand. Whey protein, pre-workouts, creatine, amino acids — all lab-tested and FSSAI certified.",
};

function HomeSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
        sameAs: ["https://instagram.com/lakshyanutrition", "https://youtube.com/@lakshyanutrition"],
        contactPoint: { "@type": "ContactPoint", contactType: "customer service", telephone: "+91-98765-43210", availableLanguage: ["English", "Hindi"] },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/products?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function HomePage() {
  return (
    <>
      <HomeSchema />
      <HeroScrollTrigger />
      <TrustMarquee />
      <CircularSlider />
      <HomeSections
        products={MOCK_PRODUCTS}
        testimonials={TESTIMONIALS}
        blogPosts={BLOG_POSTS}
      />
    </>
  );
}
