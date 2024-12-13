import Support from "@/components/Home/Section/Support";
import FreeTools from "@/components/Home/Section/FreeTools";
import PopularTools from "@/components/Home/Section/PopularTools";
import Statictics from "@/components/Home/Section/Statictics";
import HeroSection from "@/components/common/HeroSection";
import FilterTool from "@/components/Home/Section/FilterTool";
import CardSlider from "@/components/Home/Section/CardSlider";
import HeaderBar from "@/components/common/HeaderBar";

export default function Home() {
  return (
    <>
        <HeaderBar
        title="Want NifaWow Updates? No Spam."
        showReadMore={false}
        showSubscribe={true}
      />
      <div className="padding-x py-4">
        <FilterTool />
      </div>
      <div className="padding-x lg:py-8 ">
        <HeroSection paragraph="We offer PDF, video, image and other online tools to make your life easier" ismainHeading={true} title="" />
      </div>
      <div className="lg:px-20">
        <CardSlider />
      </div>
      <section className="padding-x py-8">
        <Statictics />
      </section>
      <section className="padding-x padding-y bg-[#EFF7FD] dark:bg-[#1F2A33]">
        <PopularTools />
      </section>
      <FreeTools />
      <section className="w-full bg-[#329BE6] dark:bg-[#263642] py-4 lg:py-8 padding-x">
        <Support />
      </section>
    </>
  );
}
