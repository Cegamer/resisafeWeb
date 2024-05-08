import React from "react";
import { AppContext } from "../../Context";
import { FaTimes } from "react-icons/fa";
import "../Header/Header.css"
const NavbarResponsive= ()=> {
    const context= React.useContext(AppContext)
    if(context.showNavbarResponsive){
        return(
            <nav>
                <a href='/#'>Home</a>
                <button className="nav-btn nav-close-btn" onClick={()=>{ 
                    context.setShowNavbarResponsive(false)
                }}>
                    <FaTimes/>
                </button>
            </nav>
            
        );
    }
}
export {NavbarResponsive};