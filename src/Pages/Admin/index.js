//src/Pages/Admin/index.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoggedHeader from "../../Components/LoggedHeader";
import Footer from "../../Components/Footer";
import "../../Components/style.css";
import { db, auth } from "../../FirebaseConn";
import { collection, getDocs, query, where } from "firebase/firestore";

const Admin = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserCars = async () => {
      if (!auth.currentUser) return;

      const carsCollection = collection(db, "cars");
      const q = query(carsCollection, where("userId", "==", auth.currentUser.uid));
      const snapshot = await getDocs(q);

      const userCars = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCars(userCars);
    };

    fetchUserCars();
  }, []);

  const handleAddCar = () => {
    navigate("/register-car"); // Redireciona para a página de cadastro de carro
  };

  return (
    <>
      <LoggedHeader />
      <main style={{ padding: "60px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "800px", margin: "0 auto" }}>
          <h2>Meus Carros</h2>
          <button 
            onClick={handleAddCar} 
            style={{ 
              backgroundColor: "#27ae60", 
              color: "white", 
              border: "none", 
              borderRadius: "6px", 
              padding: "0.5rem 1rem", 
              cursor: "pointer", 
              fontWeight: "600" 
            }}
          >
            + Cadastrar Carro
          </button>
        </div>

        <div style={{ maxWidth: "800px", margin: "20px auto 0" }}>
          {cars.length === 0 ? (
            <p>Nenhum carro cadastrado.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Ano</th>
                  <th>Cor</th>
                  <th>Combustível</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car.id} style={{ textAlign: "center", borderBottom: "1px solid #ccc" }}>
                    <td>{car.marca}</td>
                    <td>{car.modelo}</td>
                    <td>{car.ano}</td>
                    <td>{car.cor}</td>
                    <td>{car.tipoCombustivel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Admin;
