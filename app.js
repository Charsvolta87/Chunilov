import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// 🔥 Pegá acá TU config de Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  databaseURL: "TU_DATABASE_URL",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const form = document.getElementById("form");
const usernameInput = document.getElementById("username");
const userList = document.getElementById("userList");

const usersRef = ref(database, "juntada_8_marzo");

// Agregar usuario
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();

  if (username !== "") {
    push(usersRef, {
      username: username
    });

    usernameInput.value = "";
  }
});

// Escuchar cambios en tiempo real
onValue(usersRef, (snapshot) => {
  userList.innerHTML = "";

  snapshot.forEach((childSnapshot) => {
    const data = childSnapshot.val();

    const li = document.createElement("li");
    li.textContent = data.username;

    userList.appendChild(li);
  });
});
