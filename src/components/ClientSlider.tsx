import Marquee from "react-fast-marquee";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router";

export function ClientSlider() {
  return (
    <div>
      <div className="bg-tertiary py-6">
        <h3 className="text-center md:text-xl font-semibold text-white">Dipercaya lebih dari x Mitra Kami</h3>
      </div>
      <div>
        <Marquee className="bg-white h-25 md:h-40">
          <div>A</div>
          <div>B</div>
          <div>C</div>
        </Marquee>
      </div>
      <Link to={"#"} className="text-quaternary bg-white flex justify-center items-center gap-2 hover:text-tertiary transition-colors">
        Lihat Lebih Banyak
        <HiArrowRight />
      </Link>
    </div>
  );
}
