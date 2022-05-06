 //liste de variables à utiliser tout au long du code
 let recipes = null;
 let recipe = null;
 let check = null;
 let arrayRecipes = [];
 let arrayIngredients = [];

 //fonction pour l'affichage de nos cards avec les recettes
 async function getRecipes() {

    //on récupere notre section principale du DOM pour afficher les cards
     let section = document.querySelector('.section-articles');

    //on va faire un fetch pour la récuperation des informations des recettes dans le fichier JSON 
    await fetch('/data/recipes.json')
    .then(res => res.json())
    .then(res => recipes = res)
    .catch(err => console.log("an error occurs", err));    

    //on fait un map pour afficher toutes les cards 
    recipes.recipes.map(el => {
        let ingredients = el.ingredients.map(elt => {
            //je stocke tous les ingredients dans un tableau, bien sur je fait attention de ne pas mettre des doublons
            if (arrayIngredients.indexOf(elt.ingredient) === -1) {
               return arrayIngredients.push(elt.ingredient)
            }
            return `<p class="m-0"><b>${elt.ingredient}</b> ${elt.quantity ? ": "+elt.quantity : ''} ${elt.unit ? elt.unit : ''}</p>`
        }).join('')
        
        //je créé un article qui sera la card pour chaque recette
        recipe = document.createElement('article');
        recipe.setAttribute('class', 'col-lg-6 col-xl-4 mb-5')
        //je donne l'attribut id = le nom de la recette pour pouvoir apres faire le filtre via le nom de la recette
        recipe.setAttribute('id', `${el.name}`)
        recipe.innerHTML = `
       <img src="/assets/images/${el.name}.jpg" alt="">
       <div class="text">
           <div class="text-1">
             <p>${el.name}</p>
             <div class="timer d-flex">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-clock" viewBox="0 0 16 16">
             <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
             <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
           </svg>
                 <p>${el.time} min</p>
             </div>
           </div>
           <div class="text-2">
                 <div class="ingredients">
                     <div>${ingredients}</div>
                 </div>
                 <div class="infos">
                     <p>${el.description}</p>
                 </div>
           </div>
       </div>`
       
       //je stocke toutes les recettes dans un tableau pour pouvoir l'utiliser aprés dans le filter de la barre de recherche
       arrayRecipes.push(recipe)
       
       //j'affiche les cards avec les recette dans le DOM
       section.appendChild(recipe)
    })

    //on recupere la value de notre input de la barre de recherche et on la stocke dans la variable check
    const formControl = document.querySelector('.form-control').addEventListener("change", function(){
        check = this.value;
    })

    //on recupere l'élément form de mon input pour pouvoir envoyer la requete de mon formulaire, à savoir filtrer afficher juste les recettes
    //dont le name est = à la value check de mon input
    const formulaire = document.querySelector('.formulaire');
    formulaire.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log('envoie');
        section.innerHTML = "";
       //on filtre notre tableau pour afficher juste les cards qui nous interessent
        arrayRecipes.filter(el => {
            //je fais une condition pour trouver mes cards par rapport à une lettre ou une chaine de caracthere présente dans le nom de la recette
            //que j'ai mis tout à l'heure dans le id de chaque recette
            if (el.id.toLowerCase().indexOf(check) !== -1 ) {
                section.appendChild(el)
            }
        })
    })

    const mapIngredients = document.querySelector('.map-ingredients');
    arrayIngredients.map(el => {
        const pIngredient = document.createElement('li');
        pIngredient.setAttribute('class', 'list-group text-light')
        pIngredient.innerHTML = el
        mapIngredients.appendChild(pIngredient);
    })

    //j'affiche la modale dans l'input du choix pour la recherche selon les ingredients
    const chevronIngredients = document.querySelectorAll('.chevron-ingredients');
    const containerElementsIngredient = document.querySelector('.container-elements-ingredient');
    const containerElements2Ingredient = document.querySelector('.container-elements2-ingredient');
    let chevronClick = true;
    chevronIngredients.forEach(btn => btn.addEventListener('click', () => {
        if (chevronClick) {
            containerElementsIngredient.style.display = 'none';
            containerElements2Ingredient.style.display = 'block';
            chevronClick = false;   
        } else {
            containerElementsIngredient.style.display = 'block';
            containerElements2Ingredient.style.display = 'none';
            chevronClick = true;
        }
    }) )
 }

getRecipes()
