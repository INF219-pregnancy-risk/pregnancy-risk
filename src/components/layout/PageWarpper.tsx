import React from "react";

interface PageWarpperProps extends React.HTMLAttributes<HTMLDivElement> {}

const PageWarpper = ({ children }: PageWarpperProps) => {
  return (
    <main
      className={`grid-layout mt-[var(--nav-height)] min-h-nav transition-all`}
    >
      {children}
    </main>
  );
};

export default PageWarpper;
