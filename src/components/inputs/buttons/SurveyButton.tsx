import React from "react";
import styles from "./Button.module.css";
import { AnimatePresence, motion } from "framer-motion";

interface SurveyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  loading?: boolean;
  size?: sizes;
  disabled?: boolean;
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
    height: "50px",
    width: "200px",
    fontSize: "1rem",
    borderRadius: "5px",
  },
  large: {
    height: "50px",
    width: "300px",
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
      pointerEvents: "none",
      color: "#000",
    }),
    ...(!className?.includes("bg-") && { backgroundColor: "#4b93e5" }),
    ...(!className?.includes("hover:bg-") && {
      "&:hover": {
        backgroundColor: "red",
      },
    }),
  } as React.CSSProperties;
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

const CheckedIconScale = {
  small: {
    width: "8px",
    height: "8px",
  },
  medium: {
    width: "12px",
    height: "12px",
  },
  large: {
    width: "15px",
    height: "15px",
  },
};

const CheckedIcon = {
  small: {
    width: "14px",
    height: "14px",
    top: "-7px",
    right: "-7px",
  },
  medium: {
    width: "20px",
    height: "20px",
    top: "-10px",
    right: "-10px",
  },
  large: {
    width: "24px",
    height: "24px",
    top: "-12px",
    right: "-12px",
  },
};

const SurveyButton = ({
  checked = false,
  loading = false,
  disabled = false,
  size = "medium",
  className = "",
  children,
  ...props
}: SurveyButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`${styles.button_item} ${className}`}
      style={getButtonStyle(size, disabled, className)}
      {...props}
    >
      <div className="flex items-center justify-center h-full w-full relative">
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: "60deg" }}
              animate={{ opacity: 1, scale: 1, rotate: "0deg" }}
              exit={{ opacity: 0, scale: 0, rotate: "-60deg" }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className={`absolute rounded-full bg-green-400 justify-center items-center flex overflow-hidden`}
              style={CheckedIcon[size]}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="4"
                stroke="currentColor"
                style={CheckedIconScale[size]}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
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
    </button>
  );
};

export default SurveyButton;
