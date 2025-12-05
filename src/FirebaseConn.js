// src/FirebaseConn.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";       // Para login/cadastro
import { getFirestore } from "firebase/firestore"; // Para banco de dados

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD_V8FImAhkudIIhbLcW7iYR1EVls0l74o",
  authDomain: "cardastro.firebaseapp.com",
  projectId: "cardastro",
  storageBucket: "cardastro.firebasestorage.app",
  messagingSenderId: "1024797991914",
  appId: "1:1024797991914:web:19d6c587a878d3afdb8893"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa serviços
const auth = getAuth(app);
const db = getFirestore(app);

// Exporta auth e db para usar em outros arquivos
export { auth, db };
