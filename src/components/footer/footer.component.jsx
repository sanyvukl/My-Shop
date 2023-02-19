import React from "react";
import "./footer.styles.scss";


const Footer = () => {
  const data = new Date();
  const year = data.getFullYear();

  return <footer className="footer">
    &copy; {year} All Rights Reserved
  </footer>;
};

export default Footer;
