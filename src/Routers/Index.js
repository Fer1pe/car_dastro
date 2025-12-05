//src\Routers\Index.js




import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../FirebaseConn";

// Pages
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Admin from "../Pages/Admin";
import UserRegisterPage from "../Pages/UserRegister"; // cadastro de usuário
import Register from "../Pages/Register";             // cadastro de carro

// Private Route
import Private from "./Private";

const AppRoutes = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const isAuthenticated = !!user;

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<UserRegisterPage />} />  {/* cadastro de usuário */}

        {/* Private Routes */}
        <Route
          path="/"
          element={
            <Private isAuthenticated={isAuthenticated}>
              <Home />
            </Private>
          }
        />
        <Route
          path="/admin"
          element={
            <Private isAuthenticated={isAuthenticated}>
              <Admin />
            </Private>
          }
        />
        <Route
          path="/register-car"
          element={
            <Private isAuthenticated={isAuthenticated}>
              <Register />  {/* cadastro de carro */}
            </Private>
          }
        />

        {/* Rota fallback */}
        <Route
          path="*"
          element={<h2 style={{ textAlign: "center", marginTop: "50px" }}>Página não encontrada</h2>}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
