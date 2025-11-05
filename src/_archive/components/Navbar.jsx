import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";

const navItems = [
  { id: "about", label: "About" },

  { id: "projects", label: "Projects" },
  { id: "topics-learning", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
];

const Navbar = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (id) => {
    setIsMenuOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 64; // Adjust this value based on your navbar height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY; // Get the absolute position
      const offsetPosition = elementPosition - navbarHeight; // Adjust for navbar height

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white bg-opacity-90 backdrop-blur-md shadow-md">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <a href="#" onClick={() => handleNavClick("about")} className="text-xl font-bold text-indigo-600">KM</a>
            {/* <div className="text-black-800 px-2 py-1 rounded-md text-xs font-medium flex items-center border border-green-300">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
              Open to work
            </div> */}

            <AnimatedGradientText>
        🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
        <span
          className={cn(
            `text-xs font-bold inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}
        >
          Open to work
        </span>
      </AnimatedGradientText>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                  activeSection === item.id
                    ? "bg-indigo-100 text-indigo-800"
                    : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "block w-full text-left px-3 py-2 rounded-md text-base font-medium",
                  activeSection === item.id
                    ? "bg-indigo-100 text-indigo-800"
                    : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
