// Récupération email,password,form //
let inputEmail = document.querySelector("#email");
let inputPassword = document.querySelector("#password");
let form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const userlogins = { // récup des login de l'utilisateur
    email: inputEmail.value,
    password: inputPassword.value,
  };
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(userlogins),
    })
    // Message d'erreurs //
    .then((response) => {
        if (!response.ok) {
          let AlreadyErrorContainer = document.querySelector(".error_container");
          if (AlreadyErrorContainer) {
            form.removeChild(AlreadyErrorContainer);
          }
          // Affichage Erreur //
          const errorContainer = document.createElement("div");
          errorContainer.setAttribute("style",
          "display:flex;justify-content: center;color:red;padding: 5px;margin:15px;border: 0px solid black;border-radius:15px;box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;")
          errorContainer.classList.add("error_container");
          const connexionInput = form.querySelector('input[type="submit"]');
          form.insertBefore(errorContainer, connexionInput);
 
          if (response.status === 404 || response.status ===  401) {
            errorContainer.innerText = "Erreur dans l’identifiant ou le mot de passe";
          }
        } else {
          return response.json();
        }
      })
      //Stockage  userId,token ET redirection //
      .then((data) => {
        localStorage.setItem("id", data.userId);
        localStorage.setItem("token", data.token);
        document.location.href = "index.html";
      })
      .catch((error) => {
        console.log(error);
      });
  });