import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="grid grid-cols-1 lg:grid-cols-[1fr_275px_350px] py-11 border px-8 bg-senary font-default">
      <div className="flex flex-col gap-10 pe-16 border items-start">
        <Link to={"/"} className="border">
          <img className="w-40" src="/Logotype.svg" alt="Pixelatee Logomark" />
        </Link>
        <p className="text-white leading-7">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, atque, eveniet nulla ducimus earum architecto asperiores vero expedita dicta laboriosam, minima corporis quae dolore quisquam quia consequuntur ea accusamus.
          Nulla!
        </p>
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-xl font-semibold text-white">Follow Kami</h3>
          <div className="flex gap-4 text-white">
            <FaInstagram size={22} />
            <FaFacebook size={22} />
            <FaXTwitter size={22} />
          </div>
        </div>
      </div>
      <div className="border">A</div>
      <div className="border">c</div>
    </footer>
  );
}
