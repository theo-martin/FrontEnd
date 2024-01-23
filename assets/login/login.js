
const form = document.querySelector('#login form')
const sectionLogin = document.querySelector("#login")

form.addEventListener("submit", async (event)=>{
    event.preventDefault()
    
        const useremail = event.target.querySelector("[name=email]").value.trim
        const userpassword =  event.target.querySelector("[name=password]").value.trim
        
    // const userLogin = {userpassword, useremail}
  //   const userLogin = {
  //     email: event.target.querySelector("[name=email]").value.trim,
  //     password: event.target.querySelector("[name=password]").value.trim,
  // }
    const userBodyValue = JSON.stringify(useremail, userpassword)
    
    fetch("http://localhost:5678/api/users/login",{
        method: "POST",
        headers: { "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type' },
        // body: JSON.stringify(useremail, userpassword),
        body: userBodyValue,
      })
    // fetch('http://localhost:5678/api/users/login', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
    //   body: JSON.stringify(useremail, userpassword),
		// 	// body: JSON.stringify(userLogin),
		// }) 
    
      .then(res => {
      if (res.status === 200) {
        console.log(useremail, userpassword)
          return res.json()
          
      }
        // La connexion a réussi
       else {
        
        throw new Error("la connexion à échoué veuillez verifier l'identifiant ou le mots de passe")
        // La connexion a échoué
      }
    })
   .then(data => {
    console.log(data.token)
    localStorage.setItem(`token`, data.token)
    location.href="../../index.html"
    })
    .catch(error => {
    messageErreur(error.message)
   })
   
})

function messageErreur(message){
   
    const divErreur = document.createElement("div")
    divErreur.classList.add("erreur")
    const messageErreurElement = document.createElement("p")
    messageErreurElement.innerText = message
   
    divErreur.appendChild(messageErreurElement)
    sectionLogin.insertBefore(divErreur, form)
}


