import React from "react";
import Head from "next/head";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Real-time</title>
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