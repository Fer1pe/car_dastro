import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../FirebaseConn";
import "../style.css";


const LoggedHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-logo">
        {/* Imagem em public/cardastro_logo.png */}
        <img src="/cardastro_logo.png" alt="Cardastro Logo" className="header-logo-img" />
        <a href="/">Cardastro</a>
      </div>
      <ul className="nav-menu">
        <li>
          <button
            onClick={() => navigate("/")}
            style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}
          >
            Home
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/admin")}
            style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}
          >
            Meu Perfil
          </button>
        </li>
        <li>
          <button
            onClick={handleLogout}
            style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}
          >
            Sair da conta
          </button>
        </li>
      </ul>
    </header>
  );
};

export default LoggedHeader;


