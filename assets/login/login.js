
import { displayLoginError, displayLoginOk, removeLoginOk } from "./userMessage.js";
const form = document.querySelector('#login form')
const sectionLogin = document.querySelector("#login")
async function postUser(userBodyValue) {
  try {        
      const response = await fetch("http://localhost:5678/api/users/login", {
          method: "POST", 
          body: JSON.stringify(userBodyValue),
          headers: {"Content-Type": "application/json"}
      })
      return response
  } catch (error) {
      console.error("user not found:", error)
  }
}

form.addEventListener("submit", async (event)=>{
    event.preventDefault()
    checkUser()
    })
    async function checkUser() {
      const useremail = document.querySelector("[name=email]").value.trim
        const userpassword =  document.querySelector("[name=password]").value.trim
      const userBodyValue = {email: useremail, password: userpassword} 
      
      function emailValidation(email) {
        const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
        if (!emailRegExp.test(email)) {
            throw new Error("Le format de l'email n'est pas valide")
        }
        
    }
    
    // Check password 
    function passwordValidation(password) {
        if (password.trim() === "") {
            throw new Error("Vous devez indiquer un mot de passe")
        }
    }
    
      try {
          emailValidation(useremail)
          passwordValidation(userpassword)
      } catch (error) {
          displayLoginError(error.message)
          return 
      }
  
      const response = await postUser(userBodyValue)
      if (response.ok) {
          const result = await response.json()
          let token = result.token
          window.sessionStorage.setItem("token", token)

          displayLoginOk("Vous êtes connectés")
          removeLoginOk()
          
          location.href="../../index.html"
      } else {
          displayLoginError("Erreur dans l’identifiant ou le mot de passe")
      }
  }