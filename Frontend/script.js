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
const hiddenModif1 =document.querySelector("#modif1")
const hiddenModif2 =document.querySelector("#modif2")

if(dataExist){
    hiddenBaner.classList.remove('hidden');
    hiddenBaner.classList.add('baniere-modification')
    hiddenModif1.classList.remove('hidden')
    hiddenModif1.classList.add('modifier')
    hiddenModif2.classList.remove('hidden')
    hiddenModif2.classList.add('modifier')
}


