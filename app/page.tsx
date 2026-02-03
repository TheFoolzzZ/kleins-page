import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RecommendationSection from "@/components/RecommendationSection";
import ProjectSection from "@/components/ProjectSection";
import ArticleSection from "@/components/ArticleSection";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <RecommendationSection />
      <ProjectSection />
      <ArticleSection />
      <AboutSection />
    </div>
  );
}
