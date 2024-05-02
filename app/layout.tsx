import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

const Layout: React.FC<LayoutProps> = ({ children, title = "Bawbab realtime communications" }) => {  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>{/* Navigation or header content goes here */}</header>
      <main>{children}</main>
      <footer>
        <small>&copy; 2024 Bawbab Technologies</small>
      </footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};


export default Layout;