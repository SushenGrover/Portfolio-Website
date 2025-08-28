import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <>
    <div className="h-[3px] w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 opacity-70"></div>
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-6">
        <h1 className="text-2xl font-semibold tracking-wide mb-2 text-center">
          Contact Me
        </h1>
        <div className="text-white grid grid-cols-2 gap-x-12 gap-y-4 auto-cols-max">
          <div className="flex items-center gap-2 justify-center">
            <FontAwesomeIcon icon={faPhone} className="text-white" />
            <span>+91 70093 67016</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <FontAwesomeIcon icon={faEnvelope} className="text-white" />
            <a
              href="mailto:sushen@example.com"
              className="hover:underline text-white-300"
            >
              groversushen@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <FontAwesomeIcon icon={faGithub} className="text-white" />
            <a
              href="https://github.com/SushenGrover"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-gray-100"
              >
              GitHub
            </a>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <FontAwesomeIcon icon={faLinkedin} className="text-white" />
            <a
              href="https://www.linkedin.com/in/sushen-grover-2b3314290/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-white-400"
              >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="mt-6 text-gray-400 text-base text-center">
          <span className="inline-flex items-center gap-1">
            Made with
            <span className="text-red-500 text-lg font-semibold"><FontAwesomeIcon icon={faHeart} className="text-red-500" /></span>
            by <span className="font-bold text-grey-300">Sushen</span>
          </span>
        </div>
      </div>
    </footer>
    </>
  );
}
