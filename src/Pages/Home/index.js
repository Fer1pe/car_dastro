import React, { useEffect, useState } from "react";
import LoggedHeader from "../../Components/LoggedHeader";
import Footer from "../../Components/Footer";
import "../../Components/style.css";
import { db, auth } from "../../FirebaseConn";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);
  const [error, setError] = useState(null);

  // Observa estado de autenticação para obter UID (se houver)
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUid(user ? user.uid : null);
    });
    return () => unsubscribeAuth();
  }, []);

  // Assina a coleção "cars" e atualiza em tempo real
  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      const q = query(collection(db, "cars"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const allCars = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          // Se houver UID, opcionalmente excluímos carros do usuário atual (ajuste conforme desejar)
          const visibleCars = uid ? allCars.filter((c) => c.userId !== uid) : allCars;
          setCars(visibleCars);
          setLoading(false);
        },
        (err) => {
          console.error("Erro ao observar carros:", err);
          setError("Erro ao carregar carros.");
          setCars([]);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Erro ao configurar observador de carros:", err);
      setError("Erro ao carregar carros.");
      setCars([]);
      setLoading(false);
    }
  }, [uid]);

  return (
    <>
      <LoggedHeader />
      <main style={{ padding: "60px 20px", textAlign: "center" }}>
        <h1>Bem-vindo ao Cardastro</h1>
        <p>Cadastre e gerencie os carros da sua frota com facilidade.</p>

        <h2>Carros disponíveis</h2>

        {loading ? (
          <p>Carregando carros...</p>
        ) : error ? (
          <p>{error}</p>
        ) : cars.length === 0 ? (
          <p>Nenhum carro cadastrado por outros usuários ainda.</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
            {cars.map((car) => (
              <div key={car.id} className="card-container" style={{ maxWidth: "250px" }}>
                <h3>
                  {car.marca} {car.modelo}
                </h3>
                <p>Ano: {car.ano}</p>
                <p>Cor: {car.cor}</p>
                <p>Combustível: {car.tipoCombustivel}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Home;