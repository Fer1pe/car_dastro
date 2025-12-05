import React from "react";
import "../style.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        {/* imagem deve estar em public/cardastro_logo.png */}
        <img src="/cardastro_logo.png" alt="Cardastro Logo" className="header-logo-img" />
        <a href="/">Cardastro</a>
      </div>
      <ul className="nav-menu">
        <li><a href="/" className="active">Login</a></li>
        <li><a href="/register">Cadastrar</a></li>
      </ul>
    </header>
  );
};

export default Header;