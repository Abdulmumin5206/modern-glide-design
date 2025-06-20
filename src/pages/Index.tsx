import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServiceCategories from "@/components/ServiceCategories";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollImageSlider from "@/components/ScrollImageSlider";
import ImageFabLabTour from "@/components/ImageFabLabTour";
import AboutUsSection from "@/components/AboutUsSection";
import MembershipSection from "@/components/MembershipSection";
import TrainingSection from "@/components/TrainingSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <ServiceCategories />
        <AboutUsSection />
        <ScrollImageSlider />
        <MembershipSection />
        <TrainingSection />
        <ImageFabLabTour />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
