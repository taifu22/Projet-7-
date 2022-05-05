 let recipes = null
 let recipe = null;
 //fonction pour l'affichage de nos cards avec les recettes
 async function getRecipes() {
     const section = document.querySelector('.section-articles');
    //on va faire un fetch pour la récuperation des informations des recettes dans le fichier JSON 
    await fetch('/data/recipes.json')
    .then(res => res.json())
    .then(res => recipes = res)
    .catch(err => console.log("an error occurs", err));    

    //on fait un map pour afficher toutes les cards 
    recipes.recipes.map(el => {
        let ingredients = el.ingredients.map(elt => {
            return `<p class="m-0"><b>${elt.ingredient}</b> ${elt.quantity ? ": "+elt.quantity : ''} ${elt.unit ? elt.unit : ''}</p>`
        }).join('')
        recipe = document.createElement('article');
        recipe.setAttribute('class', 'col-lg-6 col-xl-4 mb-5')
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
       section.appendChild(recipe)
    })
 }

 
getRecipes()