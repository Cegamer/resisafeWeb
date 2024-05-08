import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";
import "./Header.css";
import { AppContext } from "../../Context";
function Header() {
  const context = React.useContext(AppContext);

  const navRef = useRef();
  const showHeader = () => {
    context.setShowNavbarResponsive(!context.showNavbarResponsive);
  };


      
  return  (
    <div className="headerDiv">
      <div className="Container-Logo"></div>
      <h3 className="Nombre">ResiSafe</h3>
    </div>
  );
}
export default Header;
