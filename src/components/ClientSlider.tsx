import Marquee from "react-fast-marquee";

const ClientSlider = () => {
  const logos = [
    "https://dummyimage.com/120x40/000/fff&text=Logo1",
    "https://dummyimage.com/120x40/000/fff&text=Logo2",
    "https://dummyimage.com/120x40/000/fff&text=Logo3",
    "https://dummyimage.com/120x40/000/fff&text=Logo4",
    "https://dummyimage.com/120x40/000/fff&text=Logo5",
  ];

  return (
    <div className="bg-white py-6 px-8 md:px-6">
      <Marquee
        gradient={false}
        speed={50}
        pauseOnHover={true}
      >
        <div className="flex items-center gap-10">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`client-logo-${index}`}
              className="h-8"
            />
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default ClientSlider;
