import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router";

export function ServiceCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
      {/* Card 1 */}
      <div className="relative md:col-start-1 md:col-end-3 h-[24rem] md:h-[32rem] bg-[url('/img/pexels-cottonbro-5990271.jpg')] bg-cover bg-center">
        {/* Overlay gradient biru */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-800/70 via-blue-800/20 to-transparent" />
        <div className="relative h-full p-10 flex items-end">
          <h4 className="text-3xl font-semibold text-white">Tech Consulting</h4>
        </div>
      </div>

      {/* Card 2 */}
      <div className="relative h-[24rem] bg-[url('/img/pexels-luis-gomes-166706-546819.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-800/70 via-blue-800/20 to-transparent" />
        <div className="relative h-full p-10 flex items-end">
          <h4 className="text-3xl font-semibold text-white">Software Development</h4>
        </div>
      </div>

      {/* Card 3 */}
      <div className="relative h-[24rem] bg-[url('/img/pexels-cottonbro-6804086.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-800/70 via-blue-800/20 to-transparent" />
        <div className="relative h-full p-10 flex items-end">
          <h4 className="text-3xl font-semibold text-white">IT Support & Maintenance</h4>
        </div>
      </div>
    </div>
  );
}

type PortfolioCardProps = {
  title: string;
  image: string;
};

export function PortfolioCard({ title = "Insert Title here", image = "bg-slate-200" }: PortfolioCardProps) {
  return (
    <div className="grid grid-cols-1 w-full">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[400px_1fr] grid-rows-[20rem] bg-tertiary">
        <div className="overflow-hidden">
          <div className={`${image} bg-cover hover:scale-105 transition-all h-full bg-center`}></div>
        </div>
        <div className="flex flex-col justify-between gap-10 py-10 md:py-10 ps-10 pe-15 text-white">
          <div className="flex flex-col gap-3 md:gap-10">
            <h6 className="font-semibold">Client X</h6>
            <h3 className="text-2xl md:text-2xl lg:text-3xl">{title}</h3>
          </div>
          <Link to={"#"} className="flex items-center gap-2">
            Baca Selengkapnya
            <HiArrowRight className="hidden md:block" />
          </Link>
        </div>
      </div>
    </div>
  );
}
