class CardRecipes{
    constructor(){ 
        this.api = new RecipesApi('data/recipes.json');
        this.recipesSection = document.querySelector('.section-articles');
        //variables pour stocker les tableaux qu'on utilisera pour stocker les ingredinets, ustensiles et appareils
        this.arrayRecipes = [];
        //voici le tableau où je vais stcker en index 0 les ingredients, en index 1 les appareils, et en 2 les ustensiles
        this.arrayTags = []; 
        //voici le deuxieme tableau où je vais stcker en index 0 les ingredients, en index 1 les appareils, et en 2 les ustensiles
        this.arrayTags2 = [];
        this.arrayUstensilsTags = [];
        this.recipe = null; 
        //liste de variables qui stockent les modales pour le choix des tags, à savoir que l'element2 c'est la modale fermé et element la modale ouverte
        this.containerElementsIngredient = document.querySelector(".container-elements-ingredient");
        this.containerElements2Ingredient = document.querySelector(".container-elements2-ingredient");
        this.containerElementsAppareils = document.querySelector(".container-elements-appareils");
        this.containerElements2Appareils = document.querySelector(".container-elements2-appareils");
        this.containerElementsUstensils = document.querySelector(".container-elements-ustensils");
        this.containerElements2Ustensils = document.querySelector(".container-elements2-ustensils");
        //liste des variables stoquants les chevrons pour l'ouverture et fermeture des modales
        this.chevronIngredients = document.querySelectorAll(".chevron-ingredients");
        this.chevronAppareils = document.querySelectorAll(".chevron-appareils");
        this.chevronUstensils = document.querySelectorAll(".chevron-ustensils");
        //liste des variables pour gerer l'ouverture des 3 modales, true modale fermé, false modale ouverte
        this.chevronClickIngredient = true;
        this.chevronClickAppareils = true;
        this.chevronClickUstensils = true;
        this.chevronClick = true;
        //3 variables pour l'affichage de la liste de tags dans les 3 modales, ingredients, appareils, ustensils
        this.mapIngredients = document.querySelector(".map-ingredients");
        this.mapAppareils = document.querySelector(".map-appareils");
        this.mapUstensils = document.querySelector(".map-ustensils");
        this.checkInputIngredients;
        this.checkInputAppareils;
        this.checkInputUstensils;
    }

    async displayData() {
        //recuperation des données du fichier json
        const cardsRecipes = await this.api.getRecipes();
        //on map nos données récuperés pour afficher les cards avec les recettes
        cardsRecipes.recipes.map(el => { 
            let ingredients = el.ingredients.map(elt => {
                return `<p class="m-0"><b>${elt.ingredient}</b> ${elt.quantity ? ": "+elt.quantity : ''} ${elt.unit ? elt.unit : ''}</p>`
            }).join('')
            
            //je créé un article qui sera la card pour chaque recette
            this.recipe = document.createElement('article');
            this.recipe.setAttribute('class', 'col-lg-6 col-xl-4 mb-5')
    
            //je donne l'attribut id = le nom de la recette pour pouvoir apres faire le filtre via le nom de la recette
            this.recipe.setAttribute('id', `${el.name}`)
            this.recipe.innerHTML = `
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
           this.arrayRecipes.push(this.recipe)
           
           //j'affiche les cards avec les recette dans le DOM
           this.recipesSection.appendChild(this.recipe)
    
           //je créé 3 tableau vides pour aprés stocker ingredients ustensils et apparails, dans mes 2 tableaux
           this.arrayTags.push([]); this.arrayTags.push([]); this.arrayTags.push([]);
           this.arrayTags2.push([]); this.arrayTags2.push([]); this.arrayTags2.push([]);

           //je stocke tous les ingredients dans un tableau, bien sur je fait attention de ne pas mettre des doublons
           el.ingredients.map(elt => {
               if (this.arrayTags[0].indexOf(elt.ingredient) === -1) {
                   return this.arrayTags[0].push(elt.ingredient)
               }
           })
           //je stocke tous les appareils dans un tableau, bien sur je fait attention de ne pas mettre des doublons
            if (this.arrayTags[1].indexOf(el.appliance) === -1) {
                return this.arrayTags[1].push(el.appliance)
            }
            //je stocke tous les utensiles dans un tableau, bien sur je fait attention de ne pas mettre des doublons
            el.ustensils.map(elt => {
                if (this.arrayTags[2].indexOf(elt) === -1) {
                    return this.arrayTags[2].push(elt)
                }
            })
           //je clone ce tableau car j'en aurait besoin pour la suppression des tags
           this.arrayUstensilsTags = [...this.arrayTags[2]];
        })
        
        //je declare un nouveau objet algorithme-1
        const algo1 = new Algorithme(this.recipesSection, this.arrayRecipes, cardsRecipes.recipes, this.arrayUstensilsTags)
        //je lance la fonciton pour la recherche des recettes par titre depuis la barre de recherhce principale
        algo1.getRecipesBarSearch(this.mapIngredients, this.arrayTags2[0], this.mapAppareils, this.arrayTags2[1]);
        //je lance les 3 fonctions pour l'affichage des listes contenants les tags à utiliser pour les ingredients, les ustesils et les appareils
        algo1.getListTags(this.arrayTags[0], this.arrayTags2[0], this.containerElementsIngredient, this.containerElements2Ingredient, this.chevronIngredients, this.chevronClickIngredient, this.mapIngredients, 'ingredients', this.checkInputIngredients);
        algo1.getListTags(this.arrayTags[1], this.arrayTags2[1], this.containerElementsAppareils, this.containerElements2Appareils, this.chevronAppareils, this.chevronClickAppareils, this.mapAppareils,'appareils', this.checkInputAppareils);
        algo1.getListTags(this.arrayTags[2], this.arrayTags2[2], this.containerElementsUstensils, this.containerElements2Ustensils, this.chevronUstensils, this.chevronClickUstensils, this.mapUstensils, 'ustensils', this.checkInputUstensils);
        //je lance la fonction pour l'affichage des tags ( a savoir que dans cette methode, j'ai aussi la fonction pour le tri et pour la suppression des tags)
        algo1.getShowTags(this.arrayTags2[0], this.arrayTags2[1], this.arrayTags2[2], this.mapIngredients, this.mapAppareils, this.mapUstensils);        
    }
}

//JE CREE UN OBJET CARDRECIPES POUR AFFICHER MES CARDS, QUI CONTIENT AUSSI LA GESTION DE L'ALGORITHME DE RECHERHCE
const app = new CardRecipes
app.displayData()