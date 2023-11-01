import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <main
      className={`grid-layout mt-[var(--nav-height)] min-h-full-nav transition-all`}
    >
      {children}
    </main>
  );
};

export default PageWrapper;
