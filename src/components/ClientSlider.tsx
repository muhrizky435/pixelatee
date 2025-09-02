import Marquee from "react-fast-marquee";

const ClientSlider = () => {
  const logos = [
    "/img/logoipsum-377.png",
    "/img/logoipsum-378.png",
    "/img/logoipsum-385.png",
    "/img/logoipsum-392.png",
    "/img/logoipsum-385.png",
  ];

  return (
    <div className="bg-white py-6 px-4 md:px-6">
      <Marquee
        gradient={false}
        speed={50}
        pauseOnHover={true}
      >
        <div className="flex items-center gap-8">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`client-logo-${index}`}
              className="h-8 mx-auto"
            />
          ))}
          {/* Spacer untuk memberi jarak antara akhir dan awal */}
          <div style={{ width: 8 }} />
        </div>
      </Marquee>
    </div>
  );
};

export default ClientSlider;
