
const form = document.querySelector('form')

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const baliseEmail = document.getElementById(email);
    const valeurEmail = baliseEmail.value;
    const baliseMdp = document.getElementById(password);
    const valeurMdp = baliseMdp.value;
      // Vérification que les champs ne sont pas vides
      if (valeurEmail.trim() === "" || valeurMdp.trim() === "") {
        alert("Veuillez remplir tous les champs.");
        return false;
    } 
      const userBodyValue = {
        email: "sophie.bluel@test.tld",
        password: "S0phie"
      };
      const response = await fetch("http://localhost:5678/api/users/login", {
      
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: userBodyValue
      });
      
      if (response.status === 200) {
        // La connexion a réussi
      } else {
        throw new Error("la connexion à échoué veuillez verifier l'identifiant ou le mots de passe");
        // La connexion a échoué
      }
   
}).then(data => {
    console.log(data.token)
    localStorage.setItem("token", data.token)
    location.href="../../index.html"
})
.catch(error => {
    messageErreur(Error.message)
})
function messageErreur(message){
    const divError = document.createElement("div")
    divError.classList.add("erreur")
    const messageErrorElement = document.createElement("p")

   
}


