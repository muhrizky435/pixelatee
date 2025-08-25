import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import {
  Monitor,
  MonitorCog,
  ShieldCheck,
  Code,
  Database,
  Smartphone,
} from "lucide-react";

const services = [
  {
    id: 1,
    icon: <Monitor className="w-10 h-10 text-white" />,
    title: "Tech Consulting",
    desc: "Solusi IT inovatif untuk mendukung transformasi digital bisnis Anda.",
    color: "bg-green-500",
  },
  {
    id: 2,
    icon: <MonitorCog className="w-10 h-10 text-white" />,
    title: "IT support & Maintenance",
    desc: "Layanan IT support, Maintenance, dan aman untuk kebutuhan modern.",
    color: "bg-blue-500",
  },
  {
    id: 3,
    icon: <ShieldCheck className="w-10 h-10 text-white" />,
    title: "Secure Link Technologies",
    desc: "Perlindungan data dan sistem dengan keamanan berlapis.",
    color: "bg-yellow-500",
  },
  {
    id: 4,
    icon: <Code className="w-10 h-10 text-white" />,
    title: "Custom Software Development",
    desc: "Pengembangan aplikasi sesuai kebutuhan spesifik bisnis Anda.",
    color: "bg-purple-500",
  },
  {
    id: 5,
    icon: <Database className="w-10 h-10 text-white" />,
    title: "Data Management",
    desc: "Pengelolaan data yang efisien, aman, dan mudah diakses.",
    color: "bg-red-500",
  },
  {
    id: 6,
    icon: <Smartphone className="w-10 h-10 text-white" />,
    title: "Mobile App Solutions",
    desc: "Aplikasi mobile modern untuk meningkatkan pengalaman pelanggan.",
    color: "bg-indigo-500",
  },
];



export const ServiceCard = () => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl px-2 md:px-10">
      {services.map((service) => (
        <div
          key={service.id}
          className="flex flex-col items-center p-6 rounded-2xl bg-white shadow-md hover:shadow-xl 
                     transition-transform transform hover:-translate-y-2 duration-300 border border-[#06B6D4]"
        >
          <div
            className={`${service.color} p-4 rounded-xl mb-4 flex items-center justify-center shadow-md`}
          >
            {service.icon}
          </div>
          <h4 className="text-lg font-semibold text-tertiary text-center">
            {service.title}
          </h4>
          <p className="text-gray-500 text-sm text-center mt-2 leading-relaxed">
            {service.desc}
          </p>
        </div>
      ))}
    </div>
  );
};

type PortfolioCardProps = {
  title: string;
  image: string;
};

export function PortfolioCard({
  title = "Insert Title here",
  image = "bg-slate-200",
}: PortfolioCardProps) {
  return (
    <div className="group relative bg-tertiary/5 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
      {/* Image */}
      <div
        className={`${image} h-64 md:h-72 bg-cover bg-center group-hover:scale-105 transition-transform duration-500`}
      ></div>

      {/* Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
        <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
          {title}
        </h3>
        <Link
          to={"#"}
          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
        >
          Baca Selengkapnya <HiArrowRight className="hidden md:block" />
        </Link>
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
    <div className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition duration-300">
      {/* Thumbnail */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 text-left">
        <p className="text-sm text-gray-500">
          <span className="font-medium">{client}</span>
        </p>
        <h3 className="text-blue-600 font-semibold text-lg">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>

        <Link
          to={`detail/${id}`}
          className="mt-2 text-sm text-blue-600 font-medium flex items-center gap-1 hover:underline"
        >
          Lihat Selengkapnya <HiArrowRight />
        </Link>
      </div>
    </div>
  );
}
