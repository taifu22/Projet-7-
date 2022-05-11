 //liste de variables à utiliser tout au long du code
 let recipes = null;
 let recipe = null;
 let check = null;
 let checkInputIngredients = null
 let arrayRecipes = [];
 let arrayIngredients = [];
 let element2 = [];
 let element3 = [];
 let element4 = [];
 let elementSearc;
 let newelementSearc;

//FONCTION PRINCIPALE POUR L'AFFICHAGE ET LES RECHERCHES DES RECETTES
async function getRecipes() {
    //on récupere notre section principale du DOM pour afficher les cards
    let section = document.querySelector('.section-articles');

    //on va faire un fetch pour la récuperation des informations des recettes dans le fichier JSON 
    await fetch('/data/recipes.json')
    .then(res => res.json())
    .then(res => recipes = res)
    .catch(err => console.log("an error occurs", err));    

//ON FAIT UN MAP POUR AFFICHER TOUTES LES CARDS DANS LA SECTION DES RECETTES
    recipes.recipes.map(el => {
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
       section.appendChild(recipe)

       //je stocke tous les ingredients dans un tableau, bien sur je fait attention de ne pas mettre des doublons
       el.ingredients.map(elt => {
        if (arrayIngredients.indexOf(elt.ingredient) === -1) {
            return arrayIngredients.push(elt.ingredient)
        }
       })
    })

//MENU RECHERCHE TITRE RECETTE
    //on recupere la value de notre input de la barre de recherche et on la stocke dans la variable check
    const formControl = document.querySelector('.form-control').addEventListener("change", function(){
        check = this.value;
    })

    //on recupere l'élément form de mon input pour pouvoir envoyer la requete de mon formulaire, à savoir filtrer/afficher juste les recettes
    //dont le name est = à la value check de mon input
    const formulaire = document.querySelector('.formulaire');
    formulaire.addEventListener('submit', (e) => {
        e.preventDefault()
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

//MENU RECHERCHE INGREDIENTS
    //on récupere l'élément pour afficher la liste des ingredients avec le map
    const mapIngredients = document.querySelector('.map-ingredients');
    let arrayIngredients2 = [];
    let pIngredient = null
    //on map notre array avec la liste de tous les ingredients, et on l'affiche dans la liste des ingredients
    arrayIngredients.map(el => {
        pIngredient = document.createElement('li');
        pIngredient.setAttribute('class', 'li-ingredient list-group')
        pIngredient.innerHTML = el
        arrayIngredients2.push(pIngredient)
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
    }))
    
    //on filtre notre menu ingredient selon la value de l'input
    document.querySelector('.input-ingredients').addEventListener("input", function(){
        checkInputIngredients = this.value;
        mapIngredients.innerHTML = "";;
        arrayIngredients2.filter(el => {
           if (el.textContent.toLowerCase().indexOf(checkInputIngredients) !== -1) {
            mapIngredients.appendChild(el)
           }
        })
    });

    //je stocke les ingredients et le name(dans un array) de chaque recette dans un array, donc j'aurais 50 arrays (recettes) dans un array
    let arraySearchIngredient = []
    
    recipes.recipes.map(el => {
        el.ingredients.push({name:el.name})
        let element = el.ingredients.map(el => {
            if (el.name) {
                return [el.name]
            } else {
                return el.ingredient
            }
        })
        arraySearchIngredient.push(element)
    })
    
    //j'affiche mon tag de li-ingredient choisi depuis la liste des ingredients
    const liIngredient = document.querySelectorAll('.li-ingredient');
    liIngredient.forEach(btn => btn.addEventListener('click', (e) => {
        elementSearc = document.querySelector('.elements-search');
        newelementSearc = document.createElement('div');
        newelementSearc.innerHTML = `<p style="margin:5px;">${e.currentTarget.textContent}</p><img id="close1" style="margin:5px; cursor:pointer;" src="/assets/close.svg" alt="close">`;
        newelementSearc.setAttribute('class', 'bg-primary d-flex m-3 rounded elem-tag');
        newelementSearc.setAttribute('id', `${e.currentTarget.textContent}`)
        newelementSearc.setAttribute('style', 'color:white;')
        elementSearc.appendChild(newelementSearc);
        //je vide ma section pour trier aprés selon l'ingrédient de mon tag
        section.innerHTML = ""
        //je trie mon tableau avec les ingredients et le nom de chaque recette , et je laisse juste les recettes avec l'ingrédient choisi
        if (Array.isArray(element2) && element2.length) {
            element2.map(el => {
                if (el.includes(e.currentTarget.textContent) == false) {
                    for(var i = el.length-1 ; i >=0 ; i--){
                        if (el[i] !== e.currentTarget.textContent) {
                            el.splice(i,1);
                        }
                    }
                }
            })
        } else {
            arraySearchIngredient.map(el => {
                if (el.indexOf(e.currentTarget.textContent) !== -1) {
                    return element2.push(el)
                }
            })
        }
        //je stocke dans un tableau juste les titres des recettes avec l'ingrédient selectionné,
        //bien sur à chaque tag choisi le tableau doit etre reinitialisé
        element3 = [];
        element2.map(el => {
            element3.push(el[el.length -1])
        })
        //je stcke dans un tableau juste les ingredients de toutes les recettes dont j'ai choisi un ingredient
        //bien sur je reinitialise le tableau d'avant
        element4 = []
        element2.map(el => {
            el.map(elt => element4.push(elt));
        })
        //j'affiche ma liste des ingredients avec ceux restants, en ayant choisi l'ingredinet d'avant
        mapIngredients.innerHTML = "";
        element4.map(el => {
            arrayIngredients2.map(elt => {
                if (elt.textContent === el) {
                    mapIngredients.appendChild(elt);
                }
            })
        })
        //j'affiche dans ma section du coup juste les recettes de l'ingrédient dont on a créé le tag
        arrayRecipes.map(el => {
            element3.map(elt => {
                if (elt !== undefined) {
                    if (elt.indexOf(el.id) !== -1) {
                        section.appendChild(el)
                    }   
                }
            })
        })
        //console.log(element2);
        //console.log(element3);
        //console.log(element4);
        //je fait disparaitre la liste des ingredients une fois le traitement de triage des recettes terminé
        containerElementsIngredient.style.display = 'block';
        containerElements2Ingredient.style.display = 'none';
        chevronClick = true;
        
//JE SUPPRIME UN TAG TOUT EN LAISSANT MA SECTION TRIEE SELON LES TAGS RESTANTS    
        function closeTags() {
            let elemtag = document.querySelector('.elem-tag');
            console.log(elemtag);
            elemtag.setAttribute('class','d-none');
        }
        let close1 = document.querySelectorAll('#close1');
        close1.forEach(btn => btn.addEventListener('click', closeTags)) 
    }))  
}

getRecipes()
