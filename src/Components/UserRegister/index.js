//src\Components\UserRegister\index.js


import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FirebaseConn";
import "../style.css";


const UserRegister = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !senha) {
      setMessage({ text: "Preencha todos os campos", type: "error" });
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      setMessage({ text: "Usuário cadastrado com sucesso!", type: "success" });
      setEmail("");
      setSenha("");
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Usuário</h2>
      {message.text && <div className={`message-box ${message.type}`}>{message.text}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>
        <button type="submit" className="btn-primary">Cadastrar</button>
      </form>
    </div>
  );
};

export default UserRegister;
