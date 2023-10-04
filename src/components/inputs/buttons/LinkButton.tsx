import React from "react";
import styles from "./Button.module.css";
import Link from "next/link";

interface LinkButtonProps extends React.HTMLAttributes<HTMLAnchorElement> {
  loading?: boolean;
  size?: sizes;
  disabled?: boolean;
  className?: string;
  href: string;
}

type sizes = "small" | "medium" | "large";

const BUTTON_STYLES = {
  small: {
    height: "30px",
    width: "100px",
    fontSize: "0.75rem",
    borderRadius: "5px",
  },
  medium: {
    height: "40px",
    width: "120px",
    fontSize: "1rem",
    borderRadius: "5px",
  },
  large: {
    height: "50px",
    width: "150px",
    fontSize: "1.25rem",
    borderRadius: "5px",
  },
};

const getButtonStyle = (size: sizes, disabled: boolean, className?: string) => {
  return {
    ...BUTTON_STYLES[size],
    color: "#fff",
    cursor: "pointer",
    ...(disabled && {
      opacity: 0.2,
      filter: "grayscale(1)",
      cursor: "default",
      PointerEvents: "none",
      color: "#000",
    }),
    ...(!className?.includes("bg-") && { backgroundColor: "#4b93e5" }),
  };
};

const LoadingIconScale = {
  small: {
    width: "15px",
    height: "15px",
  },
  medium: {
    width: "20px",
    height: "20px",
  },
  large: {
    width: "30px",
    height: "30px",
  },
};

const LinkButton = ({
  loading = false,
  size = "medium",
  disabled = false,
  className = "",
  children,
  onClick,
  ...props
}: LinkButtonProps) => {
  return (
    <Link
      style={getButtonStyle(size, disabled, className)}
      className={`${styles.button_item} ${className}`}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
        }
        onClick && onClick(e);
      }}
      {...props}
    >
      <div className="flex items-center justify-center h-full w-full relative select-none">
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            style={LoadingIconScale[size]}
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          children
        )}
      </div>
    </Link>
  );
};

export default LinkButton;
