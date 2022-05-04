//on va faire un fetch pour la récuperation des informations des recettes dans le fichier JSON
 let recipes = null
 let recipe = null;
 
 async function getRecipes() {
     const section = document.querySelector('.section-articles');
    await fetch('/data/recipes.json')
    .then(res => res.json())
    .then(res => recipes = res)
    .catch(err => console.log("an error occurs", err));
    
    recipes.recipes.map(el => {
        let ingredients = el.ingredients.map(elt => {
            return `<p class="m-0"><b>${elt.ingredient}</b> ${elt.quantity ? ": "+elt.quantity : ''} ${elt.unit ? elt.unit : ''}</p>`
        }).join('')
        recipe = document.createElement('article');
        recipe.setAttribute('class', 'me-5 mb-5')
        recipe.innerHTML = `
       <img src="/assets/images/brownie.jpg" alt="">
       <div class="text">
           <div class="text-1">
             <p>${el.name}</p>
             <div>
                 <i class="fa-solid fa-timer"></i>
                 <p class="timer">${el.time} min</p>
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