import React from "react";
import Head from "next/head";

const RootLayout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* <header>Navigation or header content goes here</header> */}
      <main>{children}</main>
      <footer>
        <small>&copy; 2024 Bawbab Technologies</small>
      </footer>
    </>
  );
};

export default RootLayout;