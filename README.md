# Cardastro 

![Cardastro](https://img.shields.io/badge/CarCadastro-Project-blue?style=for-the-badge)

Uma aplicação simples e prática para cadastrar e gerenciar carros. Ideal para controlar frotas pequenas ou testar funcionalidades de autenticação e banco de dados com Firebase.

---

🎯 Principais funcionalidades
- Cadastro de usuários (Firebase Auth)
- Login / Logout
- Cadastro de carros com meta-dados (marca, modelo, ano, cor, combustível)
- Visualização em tempo real dos carros cadastrados (Firestore onSnapshot)
- Página de perfil / dashboard com os carros do usuário
- Layout responsivo simples e clean

---

Tecnologias
- ![React](https://img.shields.io/badge/React-17.x-61DAFB?style=flat&logo=react&logoColor=white) React
- ![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=flat&logo=firebase&logoColor=black) Firebase (Auth & Firestore)
- ![React Router](https://img.shields.io/badge/React%20Router-v6-CA4245?style=flat&logo=react-router&logoColor=white) React Router v6
- ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=flat&logo=javascript&logoColor=black) JavaScript (ES6+)
- ![CSS](https://img.shields.io/badge/CSS3-Design-1572B6?style=flat&logo=css3&logoColor=white) CSS (component styles)
- ![Node.js](https://img.shields.io/badge/Node.js-Environment-339933?style=flat&logo=node.js&logoColor=white) Node.js (dev tooling)

---

Preview
- Tela inicial com lista de carros
- Login / Cadastro de usuário
- Dashboard (Meus Carros) com botão para cadastrar novo carro
- Formulários com validação básica e mensagens de feedback

---

Instalação e execução (desenvolvimento)

1. Clone o repositório
```bash
git clone https://github.com/SEU-USER/SEU-REPO.git
cd SEU-REPO
```

2. Instale as dependências
```bash
# npm
npm install

# ou yarn
yarn
```

3. Configure o Firebase
- Crie um projeto no Firebase Console (https://console.firebase.google.com/).
- Ative Authentication (Email/Password).
- Crie uma Firestore Database em modo de produção ou modo de teste temporário.
- Copie as credenciais do seu projeto (apiKey, authDomain, projectId, etc.) e atualize `src/FirebaseConn.js`:
```js
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};
```

4. Inicie a aplicação
```bash
# npm
npm start

# ou yarn
yarn start
```

Acesse http://localhost:3000

---

Estrutura do projeto (resumida)
```
src/
├─ Components/
│  ├─ Header/
│  ├─ LoggedHeader/
│  ├─ Register/            # formulário de cadastro de carros
│  ├─ UserRegister/        # cadastro de usuários
│  └─ Footer/
├─ Pages/
│  ├─ Home/
│  ├─ Login/
│  ├─ Admin/
│  ├─ Register/            # página que utiliza Components/Register
│  └─ UserRegister/
├─ Routers/
│  ├─ Index.js             # rotas principais
│  └─ Private.js           # proteção de rotas privadas
├─ FirebaseConn.js         # inicialização do Firebase (auth + firestore)
└─ App.js
```

---

Boas práticas & observações
- Segurança Firestore: durante desenvolvimento muitas pessoas usam regras permissivas. Antes de ir para produção, ajuste as regras do Firestore para restringir gravação/leituras conforme uid do usuário.
- Limites do Firestore: use batch writes (500 ops por batch) para importações em massa.
- Tratamento de erros: o projeto já exibe mensagens de sucesso/erro no formulário — confira o console do navegador para logs detalhados.
- Offline / rede: onSnapshot mantém a UI atualizada, mas verifique comportamento em rede instável e trate timeouts se necessário.

---

Como popular o banco com muitos dados (importação em massa)
- Use o Firebase Admin SDK (Node.js) com uma chave de conta de serviço para scripts de importação.
- Opção rápida: use `scripts/import_sample_data.js` (veja seção de scripts no repo) que cria usuários e carros em batches.

---

Contribuição
Contribuições são bem-vindas! Siga estes passos:
1. Fork o projeto
2. Crie uma branch feature/bugfix: git checkout -b feature/nova-funcionalidade
3. Faça commits claros e pequenos
4. Abra um Pull Request descrevendo a mudança


---

Contato
- Desenvolvedor: Felipe Souza
- GitHub: https://github.com/Fer1pe
- Email: felipe.souza217@outlook.com

---

Made with ❤️ using React & Firebase  
![React](https://img.shields.io/badge/React-17.x-61DAFB?style=for-the-badge&logo=react) ![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase)
