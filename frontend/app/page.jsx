import Faq3 from "../components/mvpblocks/faq-3";
import FooterBlock from "../components/ui/footer";
import HeroSection from "../components/ui/hero";
import Features from "../components/ui/services";
import BlogSection from "../components/ui/blog";
import { HeroVideoDialogDemoTopInBottomOut } from "../components/ui/vidoe";



export default function Home() {
  return (
    <>
    
      <HeroSection />
      < HeroVideoDialogDemoTopInBottomOut />

      <Features />
      <BlogSection />
      <Faq3 />
      <FooterBlock />

    </>
  )}