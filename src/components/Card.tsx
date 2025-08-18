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

type ProductCardProps = {
  id: string | number;
  client?: string;
  title: string;
  description?: string;
  image?: string;
};

export function ProductCard({
  id,
  client = "Client X",
  title = "Product X",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  image = "/img/placeholder.png",
}: ProductCardProps) {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden flex flex-col">
      {/* Thumbnail */}
      <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 text-left">
        <p className="text-sm text-black-500">
          <span className="font-medium">{client}</span>
        </p>
        <h3 className="text-blue-600 font-semibold text-lg">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
        
        <Link
          to={`detail/${id}`}
          className="mt-2 text-sm text-black-600 font-medium flex items-center gap-1 hover:underline"
        >
          Lihat Selengkapnya <HiArrowRight />
        </Link>
      </div>
    </div>
  );
}
