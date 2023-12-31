// components/Navbar.tsx
"use client";

import HamburgerMenu from "./HamburgerMenu";
import LinkButton from "@/components/inputs/buttons/LinkButton";
import StartSurveyButton from "@/components/inputs/buttons/StartSurveyButton";
import { ModeToggle } from "@/components/inputs/buttons/ThemeToggler";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    });
  }, []);

  return (
    <nav className="fixed w-full text-primary-foreground h-full z-50 pointer-events-none overflow-hidden select-none">
      <div className="relative w-full h-full flex flex-col">
        <div className="grid-layout backdrop-blur-lg border-b bg-background/75 shadow-md text-foreground h-nav p-2 transition-[height] w-full pointer-events-auto">
          <div className="flex justify-between items-center">
            <LinkButton
              href={"/"}
              variant={"none"}
              className="text-xl font-bold pointer-events-auto"
            >
              Pregnacy Risk
            </LinkButton>
            <div className="only-desktop gap-4 items-center justify-center flex">
              {navItems.map(({ href, name }) => (
                <LinkButton key={href} href={href}>
                  {name}
                </LinkButton>
              ))}
              <StartSurveyButton />
              <ModeToggle />
            </div>
            <div className="only-mobile h-8 flex items-center justify-center pointer-events-auto">
              <HamburgerMenu isOpen={isOpen} toggle={toggleMenu} />
            </div>
          </div>
        </div>
        {/* The mobile menu */}
        <div
          className={`only-mobile flex flex-1 justify-end transition-[backdrop-filter] duration-500 ${
            isOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
          onClick={toggleMenu}
          style={{
            backdropFilter: isOpen ? "brightness(0.5)" : "brightness(1)",
          }}
        >
          <div
            className={`flex flex-col justify-between py-8 overflow-hidden pointer-events-auto h-full bg-popover text-popover-foreground transition-[width_height] duration-500 ${
              isOpen ? "w-[300px]" : "w-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center gap-8 w-full pr-4">
              {navItems.map(({ href, name }) => (
                <LinkButton
                  key={href}
                  icon={false}
                  href={href}
                  className="text-end text-lg"
                  onClick={toggleMenu}
                >
                  {name}
                </LinkButton>
              ))}
              <StartSurveyButton onClick={toggleMenu} />
            </div>
            <div className="flex justify-end items-center pr-8 gap-4 w-full">
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
