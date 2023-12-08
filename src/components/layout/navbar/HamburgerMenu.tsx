/**
 * HamburgerMenu component.
 *
 * @component
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Indicates whether the menu is open or closed.
 * @param {function} props.toggle - Function to toggle the menu.
 * @param {string} [props.variant="ghost"] - The button variant.
 * @param {string} [props.size="icon"] - The button size.
 * @returns {JSX.Element} The rendered HamburgerMenu component.
 */
import { Button, ButtonProps } from "@/components/ui/button";

// components/HamburgerMenu.tsx
interface HamburgerMenuProps extends ButtonProps {
  isOpen: boolean;
  toggle: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  toggle,
  variant = "ghost",
  size = "icon",
  ...props
}) => {
  const _className =
    "h-0.5 bg-current transition-all duration-500 ease-in-out absolute rounded-full";
  return (
    <Button
      onClick={toggle}
      {...props}
      variant={variant}
      size={size}
      className="p-1"
    >
      <span
        className={`min-h-[1rem] h-full aspect-square relative focus:outline-none md:hidden flex justify-center items-center flex-col`}
      >
        {/* Animated SVG for the hamburger icon */}
        <div
          className={`${_className} w-full ${
            isOpen ? "rotate-[135deg] top-1/2 -translate-y-1/2" : "top-[20%]"
          }`}
        />
        <div className={`${_className} ${isOpen ? "w-0 h-0" : "w-full"}`} />
        <div
          className={`${_className} w-full ${
            isOpen
              ? "rotate-[-135deg] bottom-1/2 translate-y-1/2"
              : "bottom-[20%]"
          }`}
        />
      </span>
    </Button>
  );
};

export default HamburgerMenu;
