// src/Pages/Login/index.js


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FirebaseConn";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import "../../Components/style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Faz login no Firebase Auth
      await signInWithEmailAndPassword(auth, email, senha);
      setMessage({ text: "Login realizado com sucesso!", type: "success" });

      // Redireciona para a Home
      navigate("/");
    } catch (error) {
      setMessage({ text: `Erro: ${error.message}`, type: "error" });
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register"); // Cadastro de usuário
  };

  return (
    <>
      <Header />
      <main style={{ padding: "60px 20px" }}>
        <div className="form-container">
          <h2>Login</h2>

          {message.text && (
            <div className={`message-box ${message.type}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Senha</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary">Entrar</button>
          </form>

          {/* Botão de cadastro */}
          <button
            type="button"
            className="btn-primary"
            style={{ marginTop: "1rem", backgroundColor: "#27ae60" }}
            onClick={handleRegisterRedirect}
          >
            Cadastrar
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
