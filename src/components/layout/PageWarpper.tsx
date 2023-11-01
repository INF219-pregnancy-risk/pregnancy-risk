
import React from "react";


const PageWarpper = ({ children }: PageWarpperProps) => {
  return (
    <main
      className={`grid-layout mt-[var(--nav-height)] min-h-nav transition-all`}
    >
      {children}
    </main>
  );
};


