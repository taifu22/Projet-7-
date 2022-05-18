class CardRecipes{
    constructor(){
        this.api = new RecipesApi('data/recipes.json');
        this.recipesSection = document.querySelector('.section-articles'); 
    }

    async displayData() {
        //variables pour stocker les tableaux qu'on utilisera pour stocker les ingredinets, ustensiles et appareils
        let arrayRecipes = [];
        let arrayIngredients = []; arrayIngredients.push([]); arrayIngredients.push([]); arrayIngredients.push([]);
        let arrayIngredients2 = []; arrayIngredients2.push([]); arrayIngredients2.push([]); arrayIngredients2.push([]);
        let arrayIngredientsTags = [];
        let recipe = null; 
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
               if (arrayIngredients[0].indexOf(elt.ingredient) === -1) {
                   return arrayIngredients[0].push(elt.ingredient)
               }
           })
           //je stocke tous les appareils dans un tableau, bien sur je fait attention de ne pas mettre des doublons
            if (arrayIngredients[1].indexOf(el.appliance) === -1) {
                return arrayIngredients[1].push(el.appliance)
            }
            //je stocke tous les utensiles dans un tableau, bien sur je fait attention de ne pas mettre des doublons
            el.ustensils.map(elt => {
                if (arrayIngredients[2].indexOf(elt) === -1) {
                    return arrayIngredients[2].push(elt)
                }
            })
           //je clone ce tableau car j'en aurait besoin pour la suppression des tags
           arrayIngredientsTags = [...arrayIngredients];
        })

        /*je lance la fonction qui gere toute la logique du premier algorithme, du coup avec les variables dont j'ai besoin 
        depuis cette class CardRecipes*/
        getRecipes(this.recipesSection, arrayRecipes, arrayIngredients[0], arrayIngredients[1], arrayIngredients[2], arrayIngredientsTags, cardsRecipes.recipes)
    }
}

const app = new CardRecipes
app.displayData()