class CardRecipes{
    constructor(){
        this.api = new RecipesApi('data/recipes.json');
        this.recipesSection = document.querySelector('.section-articles'); 
    }

    async displayData() {
        //variables pour stocker les tableaux qu'on utilisera pour stocker les ingredinets, ustensiles et appareils
        let arrayRecipes = [];
        //voici le tableau où je vais stcker en index 0 les ingredients, en index 1 les appareils, et en 2 les ustensiles
        let arrayTags = []; arrayTags.push([]); arrayTags.push([]); arrayTags.push([]);
        //voici le deuxieme tableau où je vais stcker en index 0 les ingredients, en index 1 les appareils, et en 2 les ustensiles
        let arrayTags2 = []; arrayTags2.push([]); arrayTags2.push([]); arrayTags2.push([]);
        let arrayIngredientsTags = [];
        let recipe = null; 
        // //liste de variables qui stockent les modales pour le choix des tags, à savoir que l'element2 c'est la modale fermé et element la modale ouverte
        let containerElementsIngredient = document.querySelector('.container-elements-ingredient');
        let containerElements2Ingredient = document.querySelector('.container-elements2-ingredient');
        let containerElementsAppareils = document.querySelector('.container-elements-appareils');
        let containerElements2Appareils = document.querySelector('.container-elements2-appareils');
        let containerElementsUstensils = document.querySelector('.container-elements-ustensils');
        let containerElements2Ustensils = document.querySelector('.container-elements2-ustensils');
        //liste des variables stoquants les chevrons pour l'ouverture et fermeture des modales
        const chevronIngredients = document.querySelectorAll('.chevron-ingredients');
        const chevronAppareils = document.querySelectorAll('.chevron-appareils');
        const chevronUstensils = document.querySelectorAll('.chevron-ustensils');
        //liste des variables pour gerer l'ouverture des 3 modales, true modale fermé, false modale ouverte
        let chevronClickIngredient = true;
        let chevronClickAppareils = true;
        let chevronClickUstensils = true;
        //liste des variables pour trouver l'input dans les mune ingredients appareils et ustensiles
        let checkInputIngredients = null;
        let checkInputAppareils = null;
        let checkInputUstensils = null;
        //3 variables pour l'affichage de la liste de tags dans les 3 modales, ingredients, appareils, ustensils
        const mapIngredients = document.querySelector('.map-ingredients');
        const mapAppareils = document.querySelector('.map-appareils');
        const mapUstensils = document.querySelector('.map-ustensils');
        //recuperation des données du fichier json
        const cardsRecipes = await this.api.getRecipes();
        //on map nos données récuperés pour afficher les cards avec les recettes
        cardsRecipes.recipes.map(el => { 
            let ingredients = el.ingredients.map(elt => {
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
           this.recipesSection.appendChild(recipe)
    
           //je stocke tous les ingredients dans un tableau, bien sur je fait attention de ne pas mettre des doublons
           el.ingredients.map(elt => {
               if (arrayTags[0].indexOf(elt.ingredient) === -1) {
                   return arrayTags[0].push(elt.ingredient)
               }
           })
           //je stocke tous les appareils dans un tableau, bien sur je fait attention de ne pas mettre des doublons
            if (arrayTags[1].indexOf(el.appliance) === -1) {
                return arrayTags[1].push(el.appliance)
            }
            //je stocke tous les utensiles dans un tableau, bien sur je fait attention de ne pas mettre des doublons
            el.ustensils.map(elt => {
                if (arrayTags[2].indexOf(elt) === -1) {
                    return arrayTags[2].push(elt)
                }
            })
           //je clone ce tableau car j'en aurait besoin pour la suppression des tags
           arrayIngredientsTags = [...arrayTags];
        })

        //je lance la fonciton pour la recherche des recettes par titre depuis la barre de recherhce principale
        getRecipesBarSearch(this.recipesSection, arrayRecipes);
        //je lance les 3 fonctions pour l'affichage des listes contenants les tags à utiliser pour les ingredients, les ustesils et les appareils
        getListTags(arrayTags[0], arrayTags2[0], containerElementsIngredient, containerElements2Ingredient, chevronIngredients, chevronClickIngredient, mapIngredients, 'ingredients', checkInputIngredients);
        getListTags(arrayTags[1], arrayTags2[1], containerElementsAppareils, containerElements2Appareils, chevronAppareils, chevronClickAppareils, mapAppareils,'appareils', checkInputAppareils);
        getListTags(arrayTags[2], arrayTags2[2], containerElementsUstensils, containerElements2Ustensils, chevronUstensils, chevronClickUstensils, mapUstensils, 'ustensils', checkInputUstensils);
        //je lance la fonction pour l'affichage des tags
        getShowTags(this.recipesSection, arrayRecipes, cardsRecipes.recipes, arrayTags2[0], arrayTags2[1], arrayTags2[2]);
        //je lance la fonction pour supprimer un tag et du coup filtrer ma section de recettes selon cette suppression
        
    }
}

const app = new CardRecipes
app.displayData()