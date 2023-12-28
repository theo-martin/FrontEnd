

async function fetchWorks() {
  const reponse = await fetch("http://localhost:5678/api/works");
  let list = await reponse.json();

  console.log(list);

  return list;
}
fetchWorks().then(list => {
    const sectionGallery = document.querySelector(".gallery");
    for (let i=0; i < list.length; i++) {
        const work = list[i];
        // Crée les elements
        const workElement = document.createElement("figure");
        workElement.dataset.category = work.category.name; //ajoute la categorie 
        workElement.dataset.id = work.id; //ajoute l'id correspondant 
        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = work.title;
        // 
        workElement.appendChild(imageElement);
        workElement.appendChild(captionElement);
        sectionGallery.appendChild(workElement);
    }
})
