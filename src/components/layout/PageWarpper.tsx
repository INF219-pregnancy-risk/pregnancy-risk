import React from "react";
import styles from "@/components/layout/PageWrapper.module.css";

interface PageWarpperProps extends React.HTMLAttributes<HTMLDivElement> {}

const PageWarpper = ({ children }: PageWarpperProps) => {
  return <main className={styles.main_wrapper}>{children}</main>;
};

export default PageWarpper;
