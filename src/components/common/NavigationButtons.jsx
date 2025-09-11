import Link from "next/link";

const NavigationButtons = ({ type }) => {
  const navigationLinks = [
    { href: "/brand-in-frame", label: "Brand In Frame" },
    { href: "/taste-meet-frames", label: "Taste Meet Frames" },
    { href: "/self-initiated", label: "Self Initiated Stories" },
    { href: "/together-forever", label: "Together Forever" },
    { href: "/revel-rhythm", label: "Revel & Rhythm" },
    { href: "/frame-worthy", label: "Frame Worthy" },
  ];

  const navigationVideoLinks = [
    { href: "/cinematography/brand-in-frame", label: "Brand In Frame" },
    { href: "/cinematography/taste-meet-frames", label: "Taste Meet Frames" },
    { href: "/cinematography/self-initiated", label: "Self Initiated Stories" },
    { href: "/cinematography/together-forever", label: "Together Forever" },
    { href: "/cinematography/revel-rhythm", label: "Revel & Rhythm" },
    { href: "/cinematography/frame-worthy", label: "Frame Worthy" },
  ];

  return (
    <div
      className="flex flex-col items-center mb-12"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {(type ? navigationVideoLinks.slice(0, 4) : navigationLinks.slice(0, 4)).map(
          (link, index) => (
            <Link key={index} href={link.href}>
              <button
                className="group inline-flex items-center gap-3 rounded-full px-6 py-3 text-white font-medium tracking-wide transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-white/10"
                style={{ boxShadow: "4px 4px 17.4px 0px #FFFFFF47 inset" }}
              >
                {link.label}
              </button>
            </Link>
          )
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {(type ? navigationVideoLinks.slice(4) : navigationLinks.slice(4)).map((link, index) => (
            <Link key={index + 4} href={link.href}>
              <button
                className="group inline-flex items-center gap-3 rounded-full px-6 py-3 text-white font-medium tracking-wide transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-white/10"
                style={{ boxShadow: "4px 4px 17.4px 0px #FFFFFF47 inset" }}
              >
                {link.label}
              </button>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default NavigationButtons;
