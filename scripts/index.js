 //liste de variables à utiliser tout au long du code
let recipes = null;
let recipe = null;
let check = null;
let checkInputIngredients = null;
let checkInputAppareils = null;
let checkInputUstensils = null;
let arrayRecipes = [];
let arrayIngredients = []; arrayIngredients.push([]); arrayIngredients.push([]); arrayIngredients.push([]);
let arrayIngredients2 = []; arrayIngredients2.push([]); arrayIngredients2.push([]); arrayIngredients2.push([]); 
let element2 = [];
let element3 = [];
let element4ingredients = [];
let element4appliances = [];
let element4ustensils = [];
let arrayIngredientsTags = [];
let searchingCriterias = [];
let elementSearc;
let newelementSearc;
let foundIngredients;
let liIngredient;
let close1;
let arraySearchIngredient = [];

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

//MENU RECHERCHE INGREDIENTS - APPAREILS - UTENSILES
    //AfFFICHAGE INGREDIENTS
    //on récupere l'élément pour afficher la liste des ingredients avec le map
    const mapIngredients = document.querySelector('.map-ingredients');
    let pIngredient = null
    //on map notre array avec la liste de tous les ingredients, et on l'affiche dans la liste des ingredients
    arrayIngredients[0].map(el => {
        pIngredient = document.createElement('li');
        pIngredient.setAttribute('class', 'li-ingredient list-group')
        pIngredient.setAttribute('id', 'ingredients');
        pIngredient.innerHTML = el
        arrayIngredients2[0].push(pIngredient)
        mapIngredients.appendChild(pIngredient); 
    })
    //j'affiche la modale dans l'input du choix pour la recherche selon les ingredients
    const chevronIngredients = document.querySelectorAll('.chevron-ingredients');
    let containerElementsIngredient = document.querySelector('.container-elements-ingredient');
    let containerElements2Ingredient = document.querySelector('.container-elements2-ingredient');
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
        arrayIngredients2[0].filter(el => {
           if (el.textContent.toLowerCase().indexOf(checkInputIngredients) !== -1) {
            mapIngredients.appendChild(el)
           }
        })
    });

    //AfFFICHAGE APPAREILS
    //on récupere l'élément pour afficher la liste des ingredients avec le map
    const mapAppareils = document.querySelector('.map-appareils');
    let pAppareils = null
    //on map notre array avec la liste de tous les ingredients, et on l'affiche dans la liste des ingredients
    arrayIngredients[1].map(el => {
        pAppareils = document.createElement('li');
        pAppareils.setAttribute('class', 'li-ingredient list-group')
        pAppareils.setAttribute('id', 'appareils');
        pAppareils.innerHTML = el
        arrayIngredients2[1].push(pAppareils)
        mapAppareils.appendChild(pAppareils); 
    })
    //j'affiche la modale dans l'input du choix pour la recherche selon les ingredients
    const chevronAppareils = document.querySelectorAll('.chevron-appareils');
    let containerElementsAppareils = document.querySelector('.container-elements-appareils');
    let containerElements2Appareils = document.querySelector('.container-elements2-appareils');
    let chevronClickAppareils = true;
    chevronAppareils.forEach(btn => btn.addEventListener('click', () => {
        if (chevronClickAppareils) {
            containerElementsAppareils.style.display = 'none';
            containerElements2Appareils.style.display = 'block';
            chevronClickAppareils = false;   
        } else {
            containerElementsAppareils.style.display = 'block';
            containerElements2Appareils.style.display = 'none';
            chevronClickAppareils = true;
        }
    }))
    
    //on filtre notre menu ingredient selon la value de l'input
    document.querySelector('.input-appareils').addEventListener("input", function(){
        checkInputAppareils = this.value;
        mapAppareils.innerHTML = "";;
        arrayIngredients2[1].filter(el => {
           if (el.textContent.toLowerCase().indexOf(checkInputAppareils) !== -1) {
            mapAppareils.appendChild(el)
           }
        })
    });

    //AfFFICHAGE USTENSILS
    //on récupere l'élément pour afficher la liste des ingredients avec le map
    const mapUstensils = document.querySelector('.map-ustensils'); 
    let pUstensil = null
    //on map notre array avec la liste de tous les ingredients, et on l'affiche dans la liste des ingredients
    arrayIngredients[2].map(el => {
        pUstensil = document.createElement('li');
        pUstensil.setAttribute('class', 'li-ingredient list-group')
        pUstensil.setAttribute('id', 'ustensils');
        pUstensil.innerHTML = el
        arrayIngredients2[2].push(pUstensil)
        mapUstensils.appendChild(pUstensil); 
    })
    //j'affiche la modale dans l'input du choix pour la recherche selon les ingredients
    const chevronUstensils = document.querySelectorAll('.chevron-ustensils');
    let containerElementsUstensils = document.querySelector('.container-elements-ustensils');
    let containerElements2Ustensils = document.querySelector('.container-elements2-ustensils');
    let chevronClickUstensils = true;
    chevronUstensils.forEach(btn => btn.addEventListener('click', () => {
        if (chevronClickUstensils) {
            containerElementsUstensils.style.display = 'none';
            containerElements2Ustensils.style.display = 'block';
            chevronClickUstensils = false;   
        } else {
            containerElementsUstensils.style.display = 'block';
            containerElements2Ustensils.style.display = 'none';
            chevronClickUstensils = true;
        }
    }))
  
    //on filtre notre menu appareils selon la value de l'input
    document.querySelector('.input-ustensils').addEventListener("input", function(){
        checkInputUstensils = this.value;
        mapUstensils.innerHTML = "";;
        arrayIngredients2[2].filter(el => {
           if (el.textContent.toLowerCase().indexOf(checkInputUstensils) !== -1) {
            mapUstensils.appendChild(el)
           }
        })
    });

/*EVENEMENT POUR CHOISIR UN TAG, ET L'AFFICHER DANS MA LISTE DES TAGS CHOISI
DANS CET EVENEMTN DU COUP IL Y AURA AUSSI LE FILTRAGE DES TABLEAUX POUR AFFICHER LES BONS INGREDIENTS, USTENSILS, ET APPAREILS, EN SUIVANT LE TAG CHOISI*/       
    //j'affiche mon tag de li-ingredient choisi depuis la liste des ingredients
    liIngredient = document.querySelectorAll('.li-ingredient');
    liIngredient.forEach(btn => btn.addEventListener('click', (e) => {
        //je stocke mon tag dans un tableau pour l'utiliser aprés au nievau de la suppression du tag
        const searchingCriteria = e.currentTarget.textContent;
        searchingCriterias.push(searchingCriteria);
        //on créé notre element tag
        elementSearc = document.querySelector('.elements-search');
        newelementSearc = document.createElement('div');
        newelementSearc.innerHTML = `<p style="margin:5px;">${e.currentTarget.textContent}</p><img class="close1" id="${e.currentTarget.textContent}" style="margin:5px; cursor:pointer;" src="/assets/close.svg" alt="close">`;
        //petite condition pour afficher la bonne coulaur selon le tag choisi (entre ingredients, appareils et ustensils)
        if (e.path[0].id === 'appareils') {
            newelementSearc.setAttribute('class', 'bg-info d-flex m-3 rounded elem-tag');   
        } else if (e.path[0].id === 'ingredients') {
            newelementSearc.setAttribute('class', 'bg-primary d-flex m-3 rounded elem-tag');   
        } else if (e.path[0].id === 'ustensils') {
            newelementSearc.setAttribute('class', 'bg-danger d-flex m-3 rounded elem-tag');   
        }
        newelementSearc.setAttribute('id', `${e.currentTarget.textContent}`)
        newelementSearc.setAttribute('style', 'color:white;')
        elementSearc.appendChild(newelementSearc);
        //je vide ma section pour trier aprés selon l'ingrédient de mon tag
        section.innerHTML = ""
        /*si j'ai deja choisi un tag, donc mon element2 n'est pas vide, je trie mon tableau avec les ingredients et le nom de chaque recette , et je 
        laisse juste les recettes avec l'ingrédient choisi*/
        if (Array.isArray(element2) && element2.length) {
            //console.log(element2);
            element2.filter(el => {
                if (el.indexOf(e.currentTarget.textContent) === -1 ) {
                    for(var i = el.length-1 ; i >=0 ; i--){
                        if (el[i] !== e.currentTarget.textContent) {
                            el.splice(i,1);
                        }
                    }
                }
            })
        } else {
            /*je stocke les ingredients et le name(dans un array) de chaque recette dans un array, donc j'aurais 50 arrays (recettes) dans un array,
            mais avant je pense bien à reinitialiser ce tableau car sinon à chaque fois que le else se lance, mon tableau ajoute des doublons*/
            arraySearchIngredient =[];
            recipes.recipes.map(el => {
                el.ingredients.push({name:el.name})
                let ingredient = el.ingredients.map(el => {
                    if (el.name) {
                        return [el.name]
                    } else {
                        return el.ingredient
                    }
                })
                let appliance = el.appliance
                let ustensils = el.ustensils.map(el => {
                    return el
                })
                ingredient.unshift(appliance)
                ingredient.unshift(ustensils)
                arraySearchIngredient.push(ingredient)
            })

            /*donc ici je push dans mon element2 juste les recettes lié au tag, que ce soit ingredient, appareil ou stensil*/ 
            arraySearchIngredient.map(el => {
                if (el.indexOf(e.currentTarget.textContent) !== -1) {
                    return element2.push(el)
                } else if (el[0].indexOf(e.currentTarget.textContent) !== -1) {
                    return element2.push(el)
                }
            })
        }
        //console.log(element2);
        //je stocke dans un tableau juste les titres des recettes avec l'ingrédient selectionné,
        //bien sur à chaque tag choisi le tableau doit etre reinitialisé
            element3 = [];
            element2.map(el => {
                element3.push(el[el.length -1])
            })   

        /*je stcke dans un tableau juste les ingredients de toutes les recettes dont j'ai choisi un ingredient ou apareil
        bien sur je reinitialise le tableau d'avant*/
        element4ingredients = []
        element2.map(el => {
            el.map(elt => {
                if (elt !== el[0]) {
                    element4ingredients.push(elt)   
                }
            });   
        })
        /*je stcke dans un tableau juste les appareils de toutes les recettes dont j'ai choisi un appareil ou ingredient
        bien sur je reinitialise le tableau d'avant*/
        element4appliances = [];
        element2.map(el => {
            el.map(elt => {
                if (elt === el[0]) {
                    element4appliances.push(elt)
                }
            })
        })
        console.log(element2);
        /*je stcke dans un tableau juste les ustensils de toutes les recettes dont j'ai choisi un appareil ou ingredient
        bien sur je reinitialise le tableau d'avant*/
        element4ustensils = [];
        element2.map(el => {
            if (el[0] !== undefined) {
                el[0].map(elt => {
                    element4ustensils.push(elt)
                })   
            }
        })
        //j'affiche ma liste des ingredients avec ceux restants, en ayant choisi l'ingredinet d'avant
        mapIngredients.innerHTML = "";
        element4ingredients.map(el => {
            arrayIngredients2[0].map(elt => {
                if (elt.textContent === el) {
                    mapIngredients.appendChild(elt);
                }
            })
        })
        //j'affiche ma liste des appareils avec ceux restants, en ayant choisi l'ingredinet d'avant
        mapAppareils.innerHTML = "";
        element4appliances.map(el => {
            arrayIngredients2[1].map(elt => {
                if (elt.textContent === el) {
                    mapAppareils.appendChild(elt);
                }
            })
        })
        //j'affiche ma liste des ustensils avec ceux restants, en ayant choisi l'ingredinet d'avant
        mapUstensils.innerHTML = "";
        element4ustensils.map(el => {
            arrayIngredients2[2].map(elt => {
                if (elt.textContent === el) {
                    mapUstensils.appendChild(elt);
                }
            })
        })
        console.log(arrayIngredients2[2]);
        console.log(element4ustensils);
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
        //je fait disparaitre la liste des ingredients et des appareils une fois le traitement de triage des recettes terminé
        //containerElementsIngredient.style.display = 'block';
        //containerElements2Ingredient.style.display = 'none';
        if (e.path[0].id === 'ingredients') {
            containerElementsIngredient.style.display = 'block';
            containerElements2Ingredient.style.display = 'none';
        } else if (e.path[0].id === 'appareils') {
            containerElementsAppareils.style.display = 'block';
            containerElements2Appareils.style.display = 'none';
        } else if (e.path[0].id === 'ustensils') {
            containerElementsUstensils.style.display = 'block';
            containerElements2Ustensils.style.display = 'none';
        }
        chevronClick = true;
        chevronClickAppareils = true;
        chevronClickUstensils = true;

    //JE SUPPRIME UN TAG TOUT EN LAISSANT MA SECTION TRIEE SELON LES TAGS RESTANTS    
        /*je recupere l'element close pour fermer un tag, du coup je recupere tous les close que je stocke dans un array, et je donne à chaque element de l'array
        un event click, puis je dit si lid de lelement close est === au textContent de mon elemtag alors tu me supprime le tag et tu me filtre ma section de
        recettes sans le tag*/
            close1 = Array.from(document.getElementsByClassName('close1'));
            close1.forEach(elt => {
                elt.addEventListener('click', ()=> {
                    let Arrayelemtag = Array.from(document.getElementsByClassName('elem-tag'));
                    Arrayelemtag.forEach(el => {
                        if (el.firstElementChild.textContent ===  elt.id) {
                            el.setAttribute('class', 'd-none');
                            const ingredient = el.firstElementChild.textContent;
                            const index = searchingCriterias.indexOf(ingredient);
                            if (index > -1) {
                                searchingCriterias.splice(index, 1);
                            }
                            let value = searchingCriterias.join(' ')
                            /*on récupere les recettes donc avec tous les autres ingredients par rapport au tag supprimé, par exemple si je supprime le tag
                            'lait de coco', alors j'aurais tous les ingredients qui n'ont pas 'lait de coco', et bien sur les recettes avec 'lait de coco' aussi 
                            seront affichés*/
                            /*je stocke les ingredients et le name(dans un array) de chaque recette dans un array, donc j'aurais 50 arrays (recettes) dans un array,
                            mais avant je pense bien à reinitialiser ce tableau car sinon à chaque fois que le else se lance, mon tableau ajoute des doublons*/
                            arraySearchIngredient =[];
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
                            /*donc ici je push dans mon element2 juste les recettes lié au tag*/ 
                            arraySearchIngredient.map(el => {
                                if (el.indexOf(value) !== -1) {
                                    return element2.push(el)
                                }
                            })
                            /*je stocke dans un tableau juste les titres des recettes avec l'ingrédient selectionné,
                            bien sur à chaque tag choisi le tableau doit etre reinitialisé*/
                            element3 = [];
                            element2.map(el => {
                                element3.push(el[el.length -1])
                            })
                            /*je stcke dans un tableau juste les ingredients de toutes les recettes dont j'ai choisi un ingredient ou apareil ou ustensil
                            bien sur je reinitialise le tableau d'avant*/
                            element4ingredients = []
                            element2.map(el => {
                                el.map(elt => {
                                    if (elt !== el[0]) {
                                        element4ingredients.push(elt)   
                                    }
                                });   
                            })
                            /*je stcke dans un tableau juste les appareils de toutes les recettes dont j'ai choisi un appareil ou ingredient ou ustensil
                            bien sur je reinitialise le tableau d'avant*/
                            element4appliances = [];
                            element2.map(el => {
                                el.map(elt => {
                                    if (elt === el[0]) {
                                        element4appliances.push(elt)
                                    }
                                })
                            })
                            /*je stcke dans un tableau juste les ustensils de toutes les recettes dont j'ai choisi un appareil ou ingredient ou ustensil
                            bien sur je reinitialise le tableau d'avant*/
                            element4ustensils = [];
                            element2.map(el => {
                                if (el[0] !== undefined) {
                                    el[0].map(elt => {
                                            element4ustensils.push(elt)
                                    })
                                }
                            })
                            //j'affiche ma liste des ingredients avec ceux restants, en ayant choisi l'ingredinet d'avant
                            mapIngredients.innerHTML = "";
                            element4ingredients.map(el => {
                                arrayIngredients2[0].map(elt => {
                                    if (elt.textContent === el) {
                                        mapIngredients.appendChild(elt);
                                    }
                                })
                            })
                            //j'affiche ma liste des appareils avec ceux restants, en ayant choisi l'ingredinet d'avant
                            mapAppareils.innerHTML = "";
                            element4appliances.map(el => {
                                arrayIngredients2[1].map(elt => {
                                    if (elt.textContent === el) {
                                        mapAppareils.appendChild(elt);
                                    }
                                })
                            })
                            //j'affiche ma liste des appareils avec ceux restants, en ayant choisi l'ingredinet d'avant
                            mapUstensils.innerHTML = "";
                            element4ustensils.map(el => {
                                arrayIngredients2[2].map(elt => {
                                    if (elt.textContent === el) {
                                        mapUstensils.appendChild(elt);
                                    }
                                })
                            })
                            //j'affiche dans ma section du coup juste les recettes de l'ingrédient dont on a créé le tag
                            section.innerHTML = "";
                            arrayRecipes.map(el => {
                                element3.map(elt => {
                                    if (elt !== undefined) {
                                        if (elt.indexOf(el.id) !== -1) {
                                            section.appendChild(el)
                                        }   
                                    }
                                })
                            })
                        }
                    })
                    if (searchingCriterias.length <= 0) {
                        mapIngredients.innerHTML = "";
                        mapAppareils.innerHTML = "";
                        mapUstensils.innerHTML = "";
                        section.innerHTML = "";
                        arrayRecipes.map(el => {
                            section.appendChild(el)
                        })
                        arrayIngredients2[0].map(elt => {
                            mapIngredients.appendChild(elt);
                        })
                        arrayIngredients2[1].map(elt => {
                            mapAppareils.appendChild(elt);
                        })
                        arrayIngredients2[2].map(elt => {
                            mapUstensils.appendChild(elt);
                        })
                        element2 = [];
                        element3 = [];
                        element4ingredients = [];
                        element4appliances = [];
                        element4ustensils = [];
                    }
                }) 
            })
    }))  
}

getRecipes()
