// Récuperation de l'Url des travaux

const urlTravaux = await fetch("http://localhost:5678/api/works");
const works = await urlTravaux.json();
console.log(works);

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
    console.log(tous)
    document.querySelector(".gallery").innerHTML = "";
    generationTravaux(tous)
})
const btnObjet = document.querySelector('.objet');
btnObjet.addEventListener("click", function(){
    const objets = works.filter(function(work){
        return work.categoryId===1;
        
    });
    console.log(objets);
    document.querySelector(".gallery").innerHTML = "";
    generationTravaux(objets)
})
const btnAppartement = document.querySelector('.appart');
btnAppartement.addEventListener("click", function(){
    const appartements = works.filter(function(work){
        return work.categoryId===2;
        
    });
    console.log(appartements);
    document.querySelector(".gallery").innerHTML = "";
    generationTravaux(appartements)
})
const btnHotelRestaurant = document.querySelector('.hotelres');
btnHotelRestaurant.addEventListener("click", function(){
    const hotelRestaurants = works.filter(function(work){
        return work.categoryId===3;
        
    });
    console.log(hotelRestaurants);
    document.querySelector(".gallery").innerHTML = "";
    generationTravaux(hotelRestaurants)
})

//Gestion des donnés de login

const  dataExist = window.sessionStorage.getItem("data");
const hiddenBaner =document.querySelector("#baniere");
const hiddenModif1 =document.querySelector("#modif1");  
const hiddenModif2 =document.querySelector("#modif2");
const hiddenBtn = document.querySelector(".btncontainer")

if(dataExist){
    hiddenBaner.classList.remove('hidden');
    hiddenBaner.classList.add('baniere-modification');
    hiddenModif1.classList.remove('hidden');
    hiddenModif1.classList.add('modifier');
    hiddenModif2.classList.remove('hidden');
    hiddenModif2.classList.add('modifier');
    hiddenBtn.classList.remove('btncontainer');
    hiddenBtn.classList.add("hidden")
     

    const logout = document.querySelector('#login')
    logout.innerText = "logout";
    logout.addEventListener("click", function(){
        window.sessionStorage.removeItem("data");
        window.location = "./login.html"
    })
}

// Mise en forme et manipulation de la modale
 let modal = null;
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
const btnFermerModal = document.querySelector('#close')
btnFermerModal.addEventListener('click', closeMoadal)

const stope = document.querySelector('#myModal')
stope.addEventListener('click', function(e){
    e.stopPropagation()
})

window.addEventListener('keydown', function(e){
    if(e.key === 'Escape'|| e.key === 'Esc'){
        closeMoadal(e)
    }
})




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

/*const btnModifier = document.querySelector("#modif2");
const modalContainer =document.querySelector("#modal-container");
const closeBtn = document.querySelector('#close')
btnModifier.addEventListener("mousedown", function (){
    modalContainer.classList.add("modal-container")
})
closeBtn.addEventListener("click", function (){
    modalContainer.classList.remove("modal-container")
})*/




// Suppression d'une image de la galerie modale et de la base de données
const galerieModal = document.querySelector(".gallery-modal");

galerieModal.addEventListener('click', function(e){
    // Verifier si l'element cliqué est une icone "Delete"
    if(e.target.classList.contains('fa-trash-can')){
        // Recupereation de l'element figure, parent correspondant
        const figure = e.target.closest('figure');
        // Récuperation de l'ID de l'element figure à supprimer
        const workId = figure.getAttribute('id');
        console.log(workId)
        const getTokent = window.localStorage.getItem('token')
        // Envie d'une requete DELETE pour supprimer l'element 
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



