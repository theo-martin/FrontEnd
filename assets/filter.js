
const sectionPortfolio = document.getElementById("portfolio") //selection id portfolio
const divGallery = document.querySelector(".gallery") // selectionne la class gallery

const divFilters = document.createElement("div")//crée la balise div
divFilters.classList.add("filters")//ajoute la classe "filters" à divFilters

const filterTous = document.createElement("a") //crée la balise "a" avec nom de constante filtertous
filterTous.classList.add("filter-active", "filter")//ajoute la classe "filter" "filter-active"
filterTous.innerText = "Tous" //inscrit le texte "tous" dans filtertous
divFilters.appendChild(filterTous)//associe filtertous à divfilter

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
