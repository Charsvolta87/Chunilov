import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// 🔥 Pegá acá TU config de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAsMFXe1_SRmw4VAiixnJYwK8omxOx580A",
  authDomain: "chunilov.firebaseapp.com",
  projectId: "chunilov",
  storageBucket: "chunilov.firebasestorage.app",
  messagingSenderId: "35446950920",
  appId: "1:35446950920:web:29f4208ce220d99e0a55bd",
  measurementId: "G-KGB6B6CPHR"
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

