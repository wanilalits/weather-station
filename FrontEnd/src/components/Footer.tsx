import {Mail,Phone, MapPin,} from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-0">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://img.icons8.com/color/48/partly-cloudy-day.png"
                alt="AtmosIQ"
                className="w-10 h-10"
              />
              <h2 className="text-xl font-bold text-white">
                AtmosIQ
              </h2>
            </div>

            <p className="text-sm leading-6 text-slate-400">
              Smart weather monitoring and environmental insights
              for businesses, agriculture, and IoT applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Analytics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Reports
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Settings
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-3 text-sm">

              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5" />
                <span>
                  201 Tech Park, Baner Road,
                  Pune, Maharashtra 411045
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>support@atmosiq.com</span>
              </div>

            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 mt-8 pt-6">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} AtmosIQ. All rights reserved.
            </p>

            <div className="flex items-center gap-5">

              <a
                href="#"
                className="hover:text-white transition"
              >
               <FaLinkedinIn size={20} />
              </a>

              <a
                href="#"
                className="hover:text-white transition"
              >
                 <FaFacebookF size={20} />
              </a>

              <a
                href="#"
                className="hover:text-white transition"
              >
               <FaWhatsapp size={20} />
              </a>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;