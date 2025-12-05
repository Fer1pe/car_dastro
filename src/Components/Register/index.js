import React, { useState, useEffect } from "react";
import { db, auth } from "../../FirebaseConn";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../style.css";

const addDocWithTimeout = (colRef, data, timeoutMs = 15000) => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("Tempo limite de envio atingido. Verifique sua conexão e tente novamente."));
    }, timeoutMs);

    addDoc(colRef, data)
      .then((res) => {
        clearTimeout(timeoutId);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        reject(err);
      });
  });
};

const Register = () => {
  const [carData, setCarData] = useState({
    marca: "",
    modelo: "",
    ano: "",
    cor: "",
    tipoCombustivel: ""
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [submitting, setSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!carData.marca || !carData.modelo || !carData.ano || !carData.tipoCombustivel) {
      setMessage({ text: "Preencha todos os campos obrigatórios!", type: "error" });
      return;
    }

    if (!currentUser) {
      setMessage({ text: "Você precisa estar logado para cadastrar um carro.", type: "error" });
      return;
    }

    setSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      const anoNumber = Number(carData.ano);
      const dataToSave = {
        marca: carData.marca,
        modelo: carData.modelo,
        ano: isNaN(anoNumber) ? carData.ano : anoNumber,
        cor: carData.cor || "",
        tipoCombustivel: carData.tipoCombustivel,
        userId: currentUser.uid,
        createdAt: serverTimestamp()
      };

      console.log("Enviando documento para Firestore...", dataToSave);

      // Usa wrapper com timeout (15s por padrão)
      await addDocWithTimeout(collection(db, "cars"), dataToSave, 15000);

      console.log("Documento cadastrado com sucesso.");
      setMessage({ text: "Carro cadastrado com sucesso!", type: "success" });

      setCarData({
        marca: "",
        modelo: "",
        ano: "",
        cor: "",
        tipoCombustivel: ""
      });

      // redireciona opcionalmente após sucesso
      setTimeout(() => {
        setMessage({ text: "", type: "" });
        navigate("/admin");
      }, 1200);
    } catch (error) {
      console.error("Erro ao cadastrar carro:", error);
      const errMsg = error && error.message ? error.message : "Erro desconhecido ao cadastrar carro.";
      setMessage({ text: `Erro: ${errMsg}`, type: "error" });
      // mantém mensagem por mais tempo para o usuário ler
      setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 6000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Carros</h2>

      {message.text && (
        <div className={`message-box ${message.type}`}>
          {message.text}
        </div>
      )}

      {!currentUser && (
        <div style={{ marginBottom: "1rem", textAlign: "center" }}>
          <p>Você não está logado. Faça login para cadastrar um carro.</p>
          <button
            className="btn-primary"
            style={{ maxWidth: "200px", margin: "0 auto", backgroundColor: "#3498db" }}
            onClick={() => navigate("/login")}
          >
            Fazer Login
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Marca</label>
          <input
            type="text"
            name="marca"
            value={carData.marca}
            onChange={handleChange}
            placeholder="Digite a marca"
            required
            disabled={submitting || !currentUser}
          />
        </div>

        <div className="form-group">
          <label>Modelo</label>
          <input
            type="text"
            name="modelo"
            value={carData.modelo}
            onChange={handleChange}
            placeholder="Digite o modelo"
            required
            disabled={submitting || !currentUser}
          />
        </div>

        <div className="form-group">
          <label>Ano</label>
          <input
            type="number"
            name="ano"
            value={carData.ano}
            onChange={handleChange}
            placeholder="Digite o ano"
            required
            disabled={submitting || !currentUser}
          />
        </div>

        <div className="form-group">
          <label>Cor</label>
          <input
            type="text"
            name="cor"
            value={carData.cor}
            onChange={handleChange}
            placeholder="Digite a cor"
            disabled={submitting || !currentUser}
          />
        </div>

        <div className="form-group">
          <label>Tipo de Combustível</label>
          <select
            name="tipoCombustivel"
            value={carData.tipoCombustivel}
            onChange={handleChange}
            required
            disabled={submitting || !currentUser}
          >
            <option value="">Selecione</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Etanol">Etanol</option>
            <option value="Diesel">Diesel</option>
            <option value="Híbrido">Híbrido</option>
            <option value="Elétrico">Elétrico</option>
          </select>
        </div>

        <button type="submit" className="btn-primary" disabled={submitting || !currentUser}>
          {submitting ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
};

export default Register;