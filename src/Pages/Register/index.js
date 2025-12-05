//src/Pages/Register/index.js

import React from "react";
import LoggedHeader from "../../Components/LoggedHeader";
import Footer from "../../Components/Footer";
import RegisterComponent from "../../Components/Register";
import "../../Components/style.css";

const Register = () => {
  return (
    <>
      <LoggedHeader />
      <main style={{ padding: "60px 20px" }}>
        <RegisterComponent />
      </main>
      <Footer />
    </>
  );
};

export default Register;
