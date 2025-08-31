// frontend/src/components/Footer.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <>
      {/* Gradient Divider on Top */}
      <div className="h-[3px] w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 opacity-80"></div>

      <footer className="relative bg-gray-800 text-gray-300 py-10 shadow-inner">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-8">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Let’s Connect
          </h1>

          {/* Contact Buttons */}
          <div className="flex flex-wrap justify-center gap-4 text-white">
            {[
              {
                href: "tel:+917009367016",
                icon: faPhone,
                label: "+91 70093 67016",
              },
              {
                href: "mailto:groversushen@gmail.com",
                icon: faEnvelope,
                label: "groversushen@gmail.com",
              },
              {
                href: "https://github.com/SushenGrover",
                icon: faGithub,
                label: "GitHub",
              },
              {
                href: "https://www.linkedin.com/in/sushen-grover-2b3314290/",
                icon: faLinkedin,
                label: "LinkedIn",
              },
              {
                href: "https://www.instagram.com/sushen.grover/",
                icon: faInstagram,
                label: "Instagram",
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-700 hover:bg-blue-600 transition-all duration-300 shadow-sm hover:shadow-[0_0_12px_rgba(59,130,246,0.6)]"
                title={item.label}
              >
                <FontAwesomeIcon icon={item.icon} className="text-lg" />
                <span className="text-sm md:text-base">{item.label}</span>
              </a>
            ))}
          </div>

          {/* Divider Line */}
          <div className="w-24 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full opacity-70"></div>

          {/* Footer Note */}
          <div className="text-gray-400 text-base text-center">
            <span className="inline-flex items-center gap-2">
              Made with
              <FontAwesomeIcon icon={faHeart} className="text-red-500" />
              by <span className="font-bold text-gray-200">Sushen</span>
            </span>
          </div>
        </div>

        {/* Portfolio Repo Link - smaller & cornered */}
        <div className="absolute bottom-3 left-3">
          <a
            href="https://github.com/SushenGrover/Portfolio-Website"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors"
            title="View Portfolio Repo"
          >
            <FontAwesomeIcon icon={faGithub} className="text-2xl" />
          </a>
        </div>
      </footer>
    </>
  );
}
