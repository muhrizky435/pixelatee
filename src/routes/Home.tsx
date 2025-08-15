import { NavBar } from "../components/NavBar";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router";
import { PortfolioCard, ServiceCard } from "../components/Card";
import { ClientSlider } from "../components/ClientSlider";
import { HiArrowRight } from "react-icons/hi";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <>
      <NavBar backgroundColor="bg-primary" textColor="text-secondary" />
      <header className="font-default">
        <div className="grid grid-cols-1 md:grid-cols-2 h-[41.5rem] md:h-[37rem] bg-primary">
          <div className="flex justify-center items-start flex-col gap-5 pe-8 ps-8">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl text-secondary font-semibold">
                <TypeAnimation sequence={["Lorem Ipsum Dolor Sit Amet"]} wrapper="span" speed={10}></TypeAnimation>
              </h1>
              <h2 className="text-xl text-secondary">Lorem ipsum dolor sit amet, como esta.</h2>
            </div>
            <Link to={"#"} className="px-7 py-2 bg-secondary text-white hover:bg-tertiary font-semibold transition-colors">
              Mulai
            </Link>
          </div>
          <div className="relative">
            <img className="absolute bottom-0 right-0 select-none w-[50rem]" src="/Logomark.svg" alt="Pixelatee Logomark" />
          </div>
        </div>
        <ClientSlider />
      </header>
      <main className="font-default py-14">
        {/* About */}
        <div className="flex flex-col justify-center items-center py-10 gap-10 px-8">
          <h3 className="text-center text-2xl font-semibold text-tertiary">Tentang Kami</h3>
          <hr className="w-10 text-quaternary" />
          <h6 className="text-center text-quaternary leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet condimentum luctus. Etiam bibendum nisi sit amet convallis porta. Suspendisse potenti. Praesent nec dignissim neque, in sodales nulla. Phasellus a diam eget
            diam porta efficitur eu id mauris. Fusce nulla purus, volutpat aliquet semper et, congue ut nibh. Nam ac orci ut nibh bibendum efficitur id sit amet ipsum. Ut et urna auctor, placerat nisi sit amet, dignissim sapien. Sed tortor
            erat, consectetur in libero vel, condimentum malesuada purus. Fusce nulla purus, volutpat aliquet semper et, congue ut nibh. Nam ac orci ut nibh bibendum efficitur id sit amet ipsum.
          </h6>
        </div>
        {/* Services */}
        <div className="flex flex-col justify-center items-center py-10 gap-10 px-8">
          <h3 className="text-center text-2xl font-semibold text-tertiary">Layanan Terbaik Kami</h3>
          <hr className="w-10 text-quaternary" />
          <h6 className="text-center text-quaternary leading-7">
            Ut et urna auctor, placerat nisi sit amet, dignissim sapien. Sed tortor erat, consectetur in libero vel, condimentum malesuada purus. Fusce nulla purus, volutpat aliquet semper et, congue ut nibh. Nam ac orci ut nibh bibendum
            efficitur id sit amet ipsum.
          </h6>
          <ServiceCard />
        </div>
        {/* Portfolios */}
        <div className="flex flex-col justify-center items-center py-10 gap-10 px-8">
          <h3 className="text-center text-2xl font-semibold text-tertiary">Portofolio</h3>
          <hr className="w-10 text-quaternary" />
          <h6 className="text-center text-quaternary leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet condimentum luctus. Etiam bibendum nisi sit amet convallis porta. Suspendisse potenti. Praesent nec dignissim neque, in sodales nulla. Phasellus a diam eget
            diam porta efficitur eu id mauris. Fusce nulla purus, volutpat aliquet semper et, congue ut nibh. Nam ac orci ut nibh bibendum efficitur id sit amet ipsum. Ut et urna auctor, placerat nisi sit amet, dignissim sapien. Sed tortor
            erat, consectetur in libero vel, condimentum malesuada purus. Fusce nulla purus, volutpat aliquet semper et, congue ut nibh. Nam ac orci ut nibh bibendum efficitur id sit amet ipsum.
          </h6>
          <div className="w-full md:px-8 flex flex-col gap-5">
            <PortfolioCard title="Lorem Ipsum Dolor Sit Amet" image="bg-[url(/img/pexels-rabbit-wang-25128698-11768811.jpg)]" />
            <PortfolioCard title="Lorem Ipsum Dolor Sit Amet" image="bg-[url(/img/pexels-pixabay-264636.jpg)]" />
            <PortfolioCard title="Lorem Ipsum Dolor Sit Amet" image="bg-[url(/img/pexels-chanaka-906494.jpg)]" />
          </div>
          <Link to={"#"} className="flex justify-center items-center gap-2 text-quaternary hover:text-tertiary transition-colors">
            Lihat Selengkapnya <HiArrowRight />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
