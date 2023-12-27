const sectionPortfolio = document.getElementById("portfolio")
const divGallery = document.querySelector(".gallery")

const divFilters = document.createElement("div")
divFilters.classList.add("filters")

const filterTous = document.createElement("a")
filterTous.classList.add("filter-active", "filter")
filterTous.innerText = "Tous"
divFilters.appendChild(filterTous)

fetch("http://localhost:5678/api/categories").then(res => {
    return res.json()
})
.then(data => { const categories = data
    categories.forEach(category => {
        const filterElement = document.createElement("a")
        const categoryid = category.id
        filterElement.innerText = category.name
        filterElement.classList.add("filter")
        filterElement.setAttribute("data-id",categoryid)

        divFilters.appendChild(filterElement)
        sectionPortfolio.insertBefore(divFilters, divGallery)
    })

    const filtersElements = document.querySelectorAll(".filters a")
    filtersElements.forEach(filterElement => {
        filterElement.addEventListener("click", (event) => {
            document.querySelector(".filter-active")?.classList.remove("filter-active")
            filterElement.classList.add("filter-active")

            const works = document.querySelectorAll("#portfolio figure")
            works.forEach(work => {
                work.style.display = "block"
                if(event.target.hasAttribute("data-id") && work.dataset.id !== event.target.dataset.id) {
                    work.style.display = "none"
                }
            })

        })
    })
})
// async function fetchCategories() {
//     const reponse = await fetch("http://localhost:5678/api/categories");
//     let listcategory = await reponse.json();
  
//     console.log(listcategory);
  
//     return listcategory;
//   }
//   fetchCategories().then(listcategory => {
//     const sectionGallery = document.querySelector("portfolio");
//     for (let i=0; i < listcategory.length; i++) {
//         const category = listcategory[i];
//         const categoryname = category.name
//         const categoryid = category.id
//         const CategoryElement = document.createElement(categoryname);
        
//         // const 
//         console.log("listecategory=",listcategory );
//         console.log("id=",category.id );
//         console.log("name=",category.name );
       
//     }
//   })