import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

const footerLinks = {
  shop: [
    "Traditional Bags",
    "Wall Art & Decor",
    "Jewelry Collection",
    "New Arrivals",
    "Special Offers",
  ],
  help: [
    "Track Order",
    "Shipping Policy",
    "Returns & Exchanges",
    "FAQ",
    "Contact Us",
  ],
  company: [
    "Our Story",
    "LankaCraft Partners",
    "Sustainability",
    "Careers",
    "Blog",
  ],
};

const paymentMethods = [
  "https://cdn-icons-png.flaticon.com/512/349/349221.png",
  "https://cdn-icons-png.flaticon.com/512/349/349228.png",
  "https://cdn-icons-png.flaticon.com/512/349/349230.png",
  "https://cdn-icons-png.flaticon.com/512/349/349225.png",
];

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-serif text-amber-100 mb-4">
              Join Our LankaCrafts Family
            </h3>
            <p className="text-stone-300 mb-8">
              Subscribe to receive exclusive offers, LankaCrafts stories, and
              traditional craft inspiration
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 rounded-l-full text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button className="bg-amber-700 px-8 py-4 rounded-r-full hover:bg-amber-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-3xl font-serif text-amber-100 mb-6">
              LankaCrafts
            </h2>
            <p className="text-stone-400 mb-6">
              Celebrating traditional craftsmanship and cultural heritage
              through carefully curated LankaCrafts pieces.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-stone-400">
                <Clock className="h-5 w-5 text-amber-700" />
                <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center gap-3 text-stone-400">
                <Phone className="h-5 w-5 text-amber-700" />
                <span>+94 75 212 0365</span>
              </div>
              <div className="flex items-center gap-3 text-stone-400">
                <Mail className="h-5 w-5 text-amber-700" />
                <span>tdimith10@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-stone-400">
                <MapPin className="h-5 w-5 text-amber-700" />
                <span>Galle,Srilanka</span>
                <MapPin className="h-5 w-5 text-amber-700" />

                <span>Crawley,UK</span>
              </div>
            </div>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="md:col-span-2">
              <h3 className="text-lg font-semibold text-amber-100 mb-6">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-stone-400 hover:text-amber-100 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-amber-100 mb-6">
              Follow Us
            </h3>
            <div className="flex space-x-4 mb-8">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="https://www.instagram.com/dr.notorio.us"
                  className="text-stone-400 hover:text-amber-100 transition-colors"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            <h3 className="text-lg font-semibold text-amber-100 mb-4">
              Secure Payments
            </h3>
            <div className="flex space-x-3">
              {paymentMethods.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt="Payment method"
                  className="h-8 w-auto"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-stone-500 text-sm">
              &copy; 2025 LankaCrafts. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-stone-500">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (policy, index) => (
                  <a key={index} href="#" className="hover:text-amber-100">
                    {policy}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
