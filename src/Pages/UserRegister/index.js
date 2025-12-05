//src/Pages/UserRegister/index.js

import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import UserRegister from "../../Components/UserRegister";
import "../../Components/style.css";

const RegisterPage = () => {
  return (
    <>
      <Header />
      <main>
        <UserRegister />
      </main>
      <Footer />
    </>
  );
};

export default RegisterPage;
