import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
}

/**
 * Wrapper component for a page layout.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the wrapper.
 * @returns {JSX.Element} - The rendered page wrapper.
 */

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <main className={`grid-layout mt-[var(--nav-height)] min-h-full`}>
      {children}
    </main>
  );
};

export default PageWrapper;
