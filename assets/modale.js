const body = document.querySelector("body");
const header = document.querySelector("header");
const divGallery = document.querySelector("gallery")
const portfolioTITLE = document.querySelector("#portfolio h2");
const APIpathWorks = "http://localhost:5678/api/works"

 
//Creation de la bannière et bouton édition//
let editingBanner;
let editingButton;

const createBannner = () => {
    editingBanner = document.createElement("div");
    editingBanner.classList.add("editingbanner");
    editingBanner.setAttribute("style","gap: 10px;display: flex;justify-content: center;height: 59px;align-items: center;background-color: black;color: white;")
    editingBanner.innerHTML = `<i class="fa-regular fa-pen-to-square modal_trigger"></i>
    <p>Mode édition</p>`;
};

const createEditingButton = (id) => {
    editingButton = document.createElement("button");
    editingButton.classList.add("edit_button","clickable");
    editingButton.setAttribute("id", id);
    editingButton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>
    <p>modifier</p>`;
};
//création modal galerie photo
const modalBox = document.createElement("dialog");
const modal = document.createElement("div");
modal.classList.add("modal-1");
const button_add = document.createElement("button");
button_add.classList.add("btn_add","clickable")
button_add.innerHTML = `<p>ajouter une photo</p>`
const line = document.createElement("hr");
line.classList.add("line")
const modalContent = document.createElement("div");
modalContent.classList.add("modal_content")  
modalContent.setAttribute("style", "display: grid;grid-template-columns: repeat(5, 1fr);grid-auto-flow: row;column-gap: 6px;row-gap: 29px;    grid-template-rows: repeat(3, 1fr);")
modalBox.classList.add("modaladding_active","modal","modaldelete");
const headerModal = document.createElement("header");
headerModal.classList.add("header_modal")
const h1Modal = document.createElement("h1");
h1Modal.innerHTML= "Galerie photo";

portfolioTITLE.appendChild(modalBox);
modalBox.appendChild(modal);
modal.appendChild(button_add);
modal.appendChild(line);

modal.appendChild(modalContent);
modal.appendChild(headerModal);
headerModal.appendChild(h1Modal);
headerModal.appendChild(h1Modal);

const close_icon = document.createElement("div");
close_icon.classList.add("xmark")
close_icon.innerHTML = `<i class="fa-solid fa-xmark clickable"></i>`
modal.appendChild(close_icon);
 



//Mise en place des éléments admin
if (localStorage.token) {
    createBannner();
    body.insertBefore(editingBanner, header);
    createEditingButton("Modifier_boutton");
    portfolioTITLE.append(editingButton);
}

// Déconnexion
function removeToken() {
    localStorage.removeItem("token");
};
window.addEventListener("unload", removeToken);


function openModal() {
    modalBox.classList.remove("modaldelete")
    // createModale();
    addingProjets();
    modalBox.showModal();
};
// Ouverture de la Modale
editingButton.addEventListener("click", () => {
    
    openModal();
    modalFormulaire.classList.add("modaldelete");
    
});

function ModalClose() {
    modalBox.classList.add("modaldelete")
    modalContent.innerHTML = "";
    modalBox.close();
};
// Fermeture de la Modale
modalBox.addEventListener("click",  (e) => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      ModalClose();
    }
})
close_icon.addEventListener("click", ModalClose );


modalBox.addEventListener("click", (event) => {
    if(event.target === modalBox) {
        ModalClose();
    };
});


// ajout des projets dans la modal
// modalContent
function addingProjets() {
    fetch(APIpathWorks)
    .then((reponse) => {
        if (reponse.ok) {
            return reponse.json();
        } else {
            throw new Error("echec lors de l'appel API.");
        };
    })
    .then((data) => {
        data.forEach((element) => {
            const Card = document.createElement("figure");
            const image = document.createElement("img");
            const description = document.createElement("figcaption");  

            Card.className = "Card";
            
            image.src = element.imageUrl;

            description.innerHTML = `<button <i class="fa-regular clickable fa-trash-can trash-can"></i></button`;
            description.setAttribute("id", "deleteBtn");

            // Suprimer un projet ciblé

            description.addEventListener('click', (e) => {
                fetch(`http://localhost:5678/api/works/${element.id}`, {
                  method: 'DELETE',
                  headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                  },
                })
                  .then(response => {
                    if (response.ok) {
                      Card.remove();
                      alert("Projet supprimé avec succès !");
                    }
                });
            });
            modalBox.appendChild(Card);
            modalContent.appendChild(Card);
            Card.appendChild(image);
            Card.appendChild(description);
        })
       
    })
}


// deuxieme partie formulaire 
const modalFormulaire = document.createElement("div")
modalFormulaire.classList.add("modalformulaire")

const modalFormulaireBox = document.createElement("div")
modalFormulaireBox.classList.add("modal-box")

const modalFormulaireHeader = document.createElement("div")
modalFormulaireHeader.classList.add("modal-header")
const crossFormulaire = document.createElement("i")

crossFormulaire.classList.add("fa-solid", "fa-xmark", "fa-xl", "clickable")
const retour = document.createElement("i")
retour.classList.add("fa-solid", "fa-arrow-left", "fa-xl", "clickable")
modalFormulaireHeader.appendChild(crossFormulaire)
modalFormulaireHeader.appendChild(retour)


crossFormulaire.addEventListener("click", ModalClose )
retour.addEventListener("click", () => {
    modalFormulaire.style.display = "none"
    modal.style.display = "flex"
})

const modalFormulaireTitre = document.createElement("h3")
modalFormulaireTitre.innerText = "Ajout photo"

const form = document.createElement("form")

const photoUpload = document.createElement("input")
photoUpload.setAttribute("type", "file")
photoUpload.setAttribute("accept", "image/jpeg")
photoUpload.setAttribute("accept", "image/png")
photoUpload.style.display = "none"

const divPhoto = document.createElement("div")
divPhoto.classList.add("div-photo", "clickable")
const photoIcon = document.createElement("i")
photoIcon.classList.add("fa-regular", "fa-image", "fa-6x")
const photoButton = document.createElement("a")
photoButton.innerText = "+ Ajouter photo"
const photoInfo = document.createElement("p")
photoInfo.innerText = "jpg, png : 4mo max"
divPhoto.appendChild(photoIcon)
divPhoto.appendChild(photoButton)
divPhoto.appendChild(photoInfo)

const labelTitre = document.createElement("label")
labelTitre.setAttribute("for", "titre")
labelTitre.innerText = "Titre"
const titre = document.createElement("input")
titre.setAttribute("name", "titre")
titre.setAttribute("id", "titre")

const labelCat = document.createElement("label")
labelCat.setAttribute("for", "categorie")
labelCat.innerText = "Catégorie"
const cat = document.createElement("select")
cat.setAttribute("name", "categorie")
cat.setAttribute("id", "categorie")

const optionVide = document.createElement("option")
cat.appendChild(optionVide)
fetch("http://localhost:5678/api/categories").then(res => {
    return res.json()
})
.then(data => { const categories = data
    categories.forEach(category => {
        const optionCategory = document.createElement("option")
        optionCategory.innerText = category.name
        optionCategory.setAttribute("value", `${category.name}`)
        optionCategory.setAttribute("data-id", `${category.id}`)
        cat.appendChild(optionCategory)
    })
})

form.appendChild(divPhoto)
form.appendChild(photoUpload)
form.appendChild(labelTitre)
form.appendChild(titre)
form.appendChild(labelCat)
form.appendChild(cat)

const divFormulaireLine = document.createElement("hr")
divFormulaireLine.classList.add("line")

const boutonValider = document.createElement("a")
boutonValider.innerText = "Valider"
boutonValider.setAttribute("disabled", "disabled")
boutonValider.classList.add("modal-button", "disabled")

modalFormulaireBox.appendChild(modalFormulaireHeader)
modalFormulaireBox.appendChild(modalFormulaireTitre)
modalFormulaireBox.appendChild(form)
modalFormulaireBox.appendChild(divFormulaireLine)
modalFormulaireBox.appendChild(boutonValider)
modalFormulaire.appendChild(modalFormulaireBox)
modalBox.appendChild(modalFormulaire)

divPhoto.addEventListener("click", () => {
    photoUpload.click()
})

const preview = document.createElement("img")

photoUpload.addEventListener("change", () => {
    let source = ""
    source = window.URL.createObjectURL(photoUpload.files[0])
    preview.src = source
    preview.classList.add("preview")

    photoIcon.style.display = "none"
    photoButton.style.display = "none"
    photoInfo.style.display = "none"
    divPhoto.appendChild(preview)

})

button_add.addEventListener("click", () => {
    modalFormulaire.style.display = "block"
    modal.style.display = "none"
   
})
//partie 3 
form.addEventListener("change", () => { 
    const photoValue = window.URL.createObjectURL(photoUpload.files[0])
    const titreValue = titre.value
    const catValue = cat.value
     if(photoValue !== "" && titreValue !== "" && catValue !== "") { 
    boutonValider.removeAttribute("disabled", "disabled")
    boutonValider.classList.replace("disabled","eneable") }
 })
 function addNewWork(event) {
  
    const token = localStorage.getItem("token")
    let data = new FormData()
    data.append("image", photoUpload.files[0])
    data.append("title", titre.value)
    data.append("category", parseInt(cat.selectedOptions[0].getAttribute("data-id")))
  
    fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {"Authorization":`Bearer ${token}`},
                body: data,
            })
            .then(res => {
                if(res.status === 201) {
                    const divImage = document.createElement("div")
                    divImage.classList.add("div-image")

                    const img = document.createElement("img")
                    img.src = window.URL.createObjectURL(photoUpload.files[0])
                    
                    const iconPoubelle = document.createElement("i")
                    iconPoubelle.classList.add("fa-solid", "fa-trash-can", "clickable")

                    divImage.appendChild(img)
                    divGalleryMod.appendChild(divImage)
                    divImage.appendChild(iconPoubelle)

                    const figure = document.createElement("figure")
                    const imgGallery = document.createElement("img")
                    imgGallery.src = window.URL.createObjectURL(photoUpload.files[0])
                    const caption = document.createElement("figcaption")
                    caption.innerText = titre.value

                    figure.appendChild(imgGallery)
                    figure.appendChild(caption)

                    divGallery.appendChild(figure)
                    alert('Le nouvel travail a été ajouté avec succès.');
                    modalFormulaire.style.display = "none"
                    modalBox.style.display = "block"
                }
            })
 }
boutonValider.addEventListener("click", () => { 
    addNewWork()
    console.log(data)
 })