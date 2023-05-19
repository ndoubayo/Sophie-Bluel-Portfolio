// Récuperation de l'Url des travaux

const urlTravaux = await fetch("http://localhost:5678/api/works");
const works = await urlTravaux.json();

// Création des elements du DOM et ajout des travaux à la galerie
function generationTravaux(works){

 for (let i = 0; i < works.length; i++){
    const travaux = works[i];
    // Les elements qui accueilleront les travaux
    const galerie = document.querySelector(".gallery");
    const figure = document.createElement("figure");

    const imageElement = document.createElement("img");
    imageElement.src = travaux.imageUrl;
    imageElement.alt = travaux.title;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText =travaux.title;

    //Rattachemment
    figure.appendChild(imageElement);
    figure.appendChild(titleElement)

    galerie.appendChild(figure)
 }
}

generationTravaux(works);

//Création de boutons de filtrages
const btnTous = document.querySelector('.tous');
btnTous.addEventListener("click", function(){
    const tous = works.filter(function(work){
        return work
    })
    document.querySelector(".gallery").innerHTML = "";
    generationTravaux(tous)
})
const btnObjet = document.querySelector('.objet');
btnObjet.addEventListener("click", function(){
    const objets = works.filter(function(work){
        return work.categoryId===1;
        
    });
    document.querySelector(".gallery").innerHTML = "";
    generationTravaux(objets)
})
const btnAppartement = document.querySelector('.appart');
btnAppartement.addEventListener("click", function(){
    const appartements = works.filter(function(work){
        return work.categoryId===2;
        
    });
    document.querySelector(".gallery").innerHTML = "";
    generationTravaux(appartements)
})
const btnHotelRestaurant = document.querySelector('.hotelres');
btnHotelRestaurant.addEventListener("click", function(){
    const hotelRestaurants = works.filter(function(work){
        return work.categoryId===3;
        
    });
    document.querySelector(".gallery").innerHTML = "";
    generationTravaux(hotelRestaurants)
})

//Gestion des donnés de login

const  dataExist = window.sessionStorage.getItem("token");
const hiddenBaner =document.querySelector("#baniere");
const hiddenModif1 =document.querySelector("#modif1");  
const hiddenModif2 =document.querySelector("#modif2");
const hiddenModif3 =document.querySelector("#modif3");
const hiddenBtn = document.querySelector(".btncontainer")

if(dataExist){
    hiddenBaner.classList.remove('hidden');
    hiddenBaner.classList.add('baniere-modification');
    hiddenModif1.classList.remove('hidden');
    hiddenModif1.classList.add('modifier');
    hiddenModif2.classList.remove('hidden');
    hiddenModif2.classList.add('modifier');
    hiddenModif3.classList.remove('hidden');
    hiddenModif3.classList.add('modifier');
    hiddenBtn.classList.remove('btncontainer');
    hiddenBtn.classList.add("hidden")
     

    const logout = document.querySelector('#login')
    logout.innerText = "logout";
    logout.addEventListener("click", function(){
        window.sessionStorage.removeItem("data");
        window.sessionStorage.removeItem('token')
        window.location = "./login.html"
    })
}

// Mise en forme et manipulation de la modale
const ouvrirModale = function(e){
    e.preventDefault()
    const modalStyle = document.querySelector('#modal1')
    modalStyle.classList.add('modal')
    modalStyle.addEventListener('click', closeMoadal)
}
document.querySelectorAll('.js_modal').forEach(a =>{
    a.addEventListener('click', ouvrirModale)
})

const closeMoadal = function(e){
    e.preventDefault()
    const modalStyle = document.querySelector('#modal1')
    modalStyle.classList.remove('modal')
}
document.querySelectorAll('.close').forEach(button => {
    button.addEventListener('click', closeMoadal)
})


const stope = document.querySelector('#myModal')
stope.addEventListener('click', function(e){
    e.stopPropagation()
})

window.addEventListener('keydown', function(e){
    if(e.key === 'Escape'|| e.key === 'Esc'){
        closeMoadal(e)
    }
})

const openAddphoto = function(e){
    e.preventDefault()
    const principelModal = document.querySelector('#myModal')
    principelModal.classList.add('hidden')
    const modalAddStyle = document.querySelector('#modalphoto')
    modalAddStyle.classList.remove('hidden')
   
}
document.querySelector('#add-photo').addEventListener('click', openAddphoto)

const backToprincipalModal = function(e){
    e.preventDefault()
    const principelModal = document.querySelector('#myModal')
    principelModal.classList.remove('hidden')
    const modalAddStyle = document.querySelector('#modalphoto')
    modalAddStyle.classList.add('hidden')
}
document.querySelector('#back').addEventListener('click', backToprincipalModal)
const stopAtAddphoto = document.querySelector('#modalphoto')
stopAtAddphoto.addEventListener('click', function(e){
    e.stopPropagation()
})


const formToSubmit = document.querySelector('#form-to-submit')
let titleToAdd = document.querySelector('#titre').value
let categoryToAdd = document.querySelector('#Categorie').value
let imageToSend = document.querySelector("#project-pic")
let inputFile = document.querySelector("#input-file")
inputFile.onchange = function () {
    imageToSend.src = URL.createObjectURL(inputFile.files[0])
}
formToSubmit.addEventListener('submit', async function (e) {
    e.preventDefault()
    let imageToSend = document.querySelector("#project-pic")
    let inputFile = document.querySelector("#input-file")

    inputFile.onchange = function () {
        imageToSend.src = URL.createObjectURL(inputFile.files[0])
    }
    // Création d'objets formData

    var formData = new FormData();
    let titleToAdd = document.querySelector('#titre').value
    let categoryToAdd = document.querySelector('#Categorie').value

    formData.append("image", inputFile.files[0]);
    formData.append("title", titleToAdd);
    formData.append("category", categoryToAdd);

    const getTokent = window.sessionStorage.getItem('token')
    const answer = await fetch('http://localhost:5678/api/works/', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getTokent}` },
        body: formData
    }).then((res) => res.json())
    .catch((error) => alert("Erreur lors de l\envoi du formulaire" + error))

})

const btnAddPhoto = document.querySelector("#btn-ajout-photo")
btnAddPhoto.addEventListener('click', function(e){
    const imageAdd = document.querySelector('#project-pic')
    imageAdd.classList.remove("hidden")

    if(titleToAdd.trim() != ""){
        document.querySelector(".btn-valider").style.backgroundColor = "green";
    }
})
console.log(titleToAdd)
console.log(categoryToAdd)
console.log(inputFile.value)

inputFile.addEventListener("change", (e) => {
    const nbrfile = e.target.value.length
    if (nbrfile > 5) {
        const inputTitle = document.querySelector('#titre');
        inputTitle.addEventListener('change', (event) => {
            const nbr = event.target.value.length
            if (nbr > 5) {
                const inpuCat = document.querySelector("#Categorie")
                inpuCat.addEventListener('change', (e) => {
                    const nbrCat = e.target.value.length
                    if (nbrCat != null) {
                        const btnValider = document.querySelector('.btn-valider')
                        btnValider.style.backgroundColor = "#1D6154"
                    } else {
                        alert("Renseignez la caregorie s'il vous plaît")
                    }
                })
            } else {
                alert("le text entré est invalide")
            }
        });
    }
})


//Genération des travaux dans la modale
function genererGallerieModal(works){

    for (let i = 0; i < works.length; i++){
       const travaux = works[i];
       // Les elements qui accueilleront les travaux
       const galerieModal = document.querySelector(".gallery-modal");
       const figure = document.createElement("figure");
       figure.setAttribute("id", travaux.id)
   
       const imageElement = document.createElement("img");
       imageElement.src = travaux.imageUrl;
       imageElement.alt = travaux.title;
       const titleElement = document.createElement("figcaption");
       titleElement.innerText = "éditer";
       const deleteIcone = document.createElement("i");
       deleteIcone.classList.add("fa-solid","fa-trash-can")
   
       //Rattachemment
       figure.appendChild(imageElement);
       figure.appendChild(titleElement);
       figure.appendChild(deleteIcone);

       galerieModal.appendChild(figure)
    }
}
   
genererGallerieModal(works);

// Suppression d'une image de la galerie modale et de la base de données
const galerieModal = document.querySelector(".gallery-modal");

galerieModal.addEventListener('click', function(e){
    // Verifier si l'element cliqué est une icone "Delete"
    if(e.target.classList.contains('fa-trash-can')){
        // Recuperation de l'element figure, parent correspondant
        const figure = e.target.closest('figure');
        // Récuperation de l'ID de l'element figure à supprimer
        const workId = figure.getAttribute('id');
        const getTokent = window.sessionStorage.getItem('token')
        // Envoie d'une requete DELETE pour supprimer l'element 
        fetch(`http://localhost:5678/api/works/${workId}`, {
            method: 'DELETE',
            headers: {"Authorization": `Bearer ${getTokent}`}
        }).then(function(res){
            if(res.ok){
                //Affiche les projets de la gallerie modale
                generationTravaux()
                //Affiche les projets de la gallerie modale de le page d'accueil
                genererGallerieModal()
            }else{
                console.error("Erreur survenue lors de la suppression de l\'element")
            }
        }).catch(function(error){
            console.error("Erreur survenue lors de la suppression de l\'element", error)
        })
    }
})
/*const getTokent = window.localStorage.getItem('token')
console.log(getTokent)*/



