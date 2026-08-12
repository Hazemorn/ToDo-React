import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import s from "./Header.module.scss";

import burgerImg from "../../assets/icons/burger.svg";
import closeImg from "../../assets/icons/close.svg";

const Header = () => {
 
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header>
      <div className={s.header} id={"#header"}>
        <NavLink to={"/"}>
          <h3>To Do App</h3>
        </NavLink>
        <div className={`${s.header__links} ${s.header__desktop}`}>
          <NavLink to={"/"} end>
            Home
          </NavLink>
          <NavLink to={"/contact"}>Contact Us</NavLink>
          <NavLink to={"/about"}>About project</NavLink>
        </div>
        <div className={`${s.header__burger} pointer`}>
          <img
            src={burgerImg}
            alt="burgerIcon"
            loading="lazy"
            style={{width: '24px'}}
            onClick={() => setIsMenuOpen(true)}
          />
        </div>
      </div>

      {isMenuOpen && (
        <div className={s.mobile_popup_menu}>
          <img
            src={closeImg}
            alt="close"
            loading="lazy"
            className={`${s.close} pointer`}
            onClick={() => setIsMenuOpen(false)}
          />
          <div className={s.mobile__links}>
            <NavLink to={"/"} end>
              Home
            </NavLink>
            <NavLink to={"/contact"}>Contact Us</NavLink>
            <NavLink to={"/about"}>About project</NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
