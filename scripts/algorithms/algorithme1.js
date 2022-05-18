 //liste de variables à utiliser tout au long du code
let check = null;
let checkInputIngredients = null;
let checkInputAppareils = null;
let checkInputUstensils = null;
let criteria = null;
let arrayListUstensils2 = []; let arrayListIngredients2 = []; let arrayListAppliances2 = [];
let arrayListIngredientsUstensilsAppliances = [];
let arrayListAllTitles = [];
let listIngredientsWithTag = [];
let listappliancesWithTag = [];
let listustensilsWithTag = [];
let element5 = [];
let searchingCriterias = [];
let elementSearc;
let newelementSearc;
let foundIngredients;
let liIngredient;
let close1;
let arraySearchIngredient = [];

//FONCTION PRINCIPALE POUR L'AFFICHAGE ET LES RECHERCHES DES RECETTES
function getRecipes(section, arrayRecipes, arrayListIngredients, arrayListAppliances, arrayListUstensils, arrayIngredientsTags, cardRecipes) {
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
    arrayListIngredients.map(el => {
        pIngredient = document.createElement('li');
        pIngredient.setAttribute('class', 'li-ingredient-ustensils-appliances list-group')
        pIngredient.setAttribute('id', 'ingredients');
        pIngredient.innerHTML = el
        arrayListIngredients2.push(pIngredient)
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
        arrayListIngredients2.filter(el => {
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
    arrayListAppliances.map(el => {
        pAppareils = document.createElement('li');
        pAppareils.setAttribute('class', 'li-ingredient-ustensils-appliances list-group')
        pAppareils.setAttribute('id', 'appareils');
        pAppareils.innerHTML = el
        arrayListAppliances2.push(pAppareils)
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
        arrayListAppliances2.filter(el => {
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
    arrayListUstensils.map(el => {
        pUstensil = document.createElement('li');
        pUstensil.setAttribute('class', 'li-ingredient-ustensils-appliances list-group')
        pUstensil.setAttribute('id', 'ustensils');
        pUstensil.innerHTML = el
        arrayListUstensils2.push(pUstensil)
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
        arrayListUstensils2.filter(el => {
           if (el.textContent.toLowerCase().indexOf(checkInputUstensils) !== -1) {
            mapUstensils.appendChild(el)
           }
        })
    });

/*EVENEMENT POUR CHOISIR UN TAG, ET L'AFFICHER DANS MA LISTE DES TAGS CHOISI
DANS CET EVENEMTN DU COUP IL Y AURA AUSSI LE FILTRAGE DES TABLEAUX POUR AFFICHER LES BONS INGREDIENTS, USTENSILS, ET APPAREILS, EN SUIVANT LE TAG CHOISI*/       
    //j'affiche mon tag de li-ingredient choisi depuis la liste des ingredients
    liIngredient = document.querySelectorAll('.li-ingredient-ustensils-appliances');
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
        
         /*si j'ai deja choisi un tag, donc mon arrayListIngredientsUstensilsAppliances n'est pas vide, je trie mon tableau avec les ingredients et le nom de chaque recette , et je 
        laisse juste les recettes avec l'ingrédient choisi*/
        if (Array.isArray(arrayListIngredientsUstensilsAppliances) && arrayListIngredientsUstensilsAppliances.length) {
            console.log(arrayListIngredientsUstensilsAppliances);
            arrayListIngredientsUstensilsAppliances.filter(el => {
                if (el !== undefined && el[0] !== undefined) {
                    if (el.indexOf(e.currentTarget.textContent) === -1 && el[0].indexOf(e.currentTarget.textContent) === -1) {
                        for(var i = el.length-1 ; i >=0 ; i--){
                            if (el[i] !== e.currentTarget.textContent) {
                                el.splice(i,1);
                            }
                        }
                    }   
                }
            })
        } else {
            /*je stocke les ingredients et le name(dans un array) de chaque recette dans un array, donc j'aurais 50 arrays (recettes) dans un array,
            mais avant je pense bien à reinitialiser ce tableau car sinon à chaque fois que le else se lance, mon tableau ajoute des doublons*/
            arraySearchIngredient =[];
            arrayListIngredientsUstensilsAppliances = [];
            cardRecipes.map(el => {
                let name = [el.name]
                let ingredient = el.ingredients.map(el => {
                        return el.ingredient
                })
                let appliance = el.appliance
                let ustensils = el.ustensils.map(el => {
                    return el
                })
                ingredient.unshift(appliance)
                ingredient.unshift(ustensils)
                ingredient.push(name)
                arraySearchIngredient.push(ingredient)
            })
            /*donc ici je push dans mon arrayListIngredientsUstensilsAppliances juste les recettes lié au tag, que ce soit ingredient, appareil ou ustensil*/ 
            arraySearchIngredient.map(el => {
                if (el.indexOf(e.currentTarget.textContent) !== -1 || el[0].indexOf(e.currentTarget.textContent) !== -1) {
                    return arrayListIngredientsUstensilsAppliances.push(el)
                }
            })
        }  
        //je stocke dans un tableau juste les titres des recettes avec l'ingrédient selectionné,
        //bien sur à chaque tag choisi le tableau doit etre reinitialisé
            arrayListAllTitles = [];
            arrayListIngredientsUstensilsAppliances.map(el => {
                    arrayListAllTitles.push(el[el.length -1])   
            })   

        /*je stcke dans un tableau juste les ingredients de toutes les recettes dont j'ai choisi un ingredient ou apareil
        bien sur je reinitialise le tableau d'avant*/
        listIngredientsWithTag = []
        arrayListIngredientsUstensilsAppliances.map(el => {
            el.map(elt => {
                if (elt !== el[0]) {
                    listIngredientsWithTag.push(elt)   
                }
            });   
        })
        /*je stcke dans un tableau juste les appareils de toutes les recettes dont j'ai choisi un appareil ou ingredient
        bien sur je reinitialise le tableau d'avant*/
        listappliancesWithTag = [];
        arrayListIngredientsUstensilsAppliances.map(el => {
            el.map(elt => {
                if (elt === el[1]) {
                    listappliancesWithTag.push(elt)
                }
            })
        })
       // console.log(listappliancesWithTag);
        /*je stcke dans un tableau juste les ustensils de toutes les recettes dont j'ai choisi un appareil ou ingredient
        bien sur je reinitialise le tableau d'avant*/
        listustensilsWithTag = [];
        arrayListIngredientsUstensilsAppliances.map(el => {
            if (Array.isArray(el[0]) && el[0].length) {
                if (el[0] !== undefined) {
                    el[0].map(elt => {
                        listustensilsWithTag.push(elt)
                    })   
                }
            }
        })
        //j'affiche ma liste des ingredients avec ceux restants, en ayant choisi l'ingredinet d'avant
        mapIngredients.innerHTML = "";
        listIngredientsWithTag.map(el => {
            arrayListIngredients2.map(elt => {
                if (elt.textContent === el) {
                    mapIngredients.appendChild(elt);
                }
            })
        })
        //j'affiche ma liste des appareils avec ceux restants, en ayant choisi l'ingredinet d'avant
        mapAppareils.innerHTML = "";
        listappliancesWithTag.map(el => {
            arrayListAppliances2.map(elt => {
                if (elt.textContent === el) {
                    mapAppareils.appendChild(elt);
                }
            })
        })
        //j'affiche ma liste des ustensils avec ceux restants, en ayant choisi l'ingredinet d'avant
        mapUstensils.innerHTML = "";
        listustensilsWithTag.map(el => {
            arrayListUstensils2.map(elt => {
                if (elt.textContent === el) {
                    mapUstensils.appendChild(elt);
                }
            })
        })
        //j'affiche dans ma section du coup juste les recettes de l'ingrédient dont on a créé le tag
        arrayRecipes.map(el => {
            arrayListAllTitles.map(elt => {
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
                            //let value = searchingCriterias.join(' ')
                            console.log(searchingCriterias);
                            /*on récupere les recettes donc avec tous les autres ingredients par rapport au tag supprimé, par exemple si je supprime le tag
                            'lait de coco', alors j'aurais tous les ingredients qui n'ont pas 'lait de coco', et bien sur les recettes avec 'lait de coco' aussi 
                            seront affichés*/
                            arrayListIngredientsUstensilsAppliances = [];
                            arraySearchIngredient =[];
                            cardRecipes.map(el => {
                                let name = [el.name]
                                let ingredient = el.ingredients.map(el => {
                                        return el.ingredient
                                })
                                let appliance = el.appliance
                                let ustensils = el.ustensils.map(el => {
                                    return el
                                })
                                ingredient.unshift(appliance)
                                ingredient.unshift(ustensils)
                                ingredient.push(name)
                                arraySearchIngredient.push(ingredient)
                            })
                            /*donc ici je push dans mon arrayListIngredientsUstensilsAppliances juste les recettes lié au tag, que ce soit ingredient, appareil ou ustensil*/ 
                            arraySearchIngredient.map(el => {
                                searchingCriterias.map(elt => {
                                    if (el.indexOf(elt) !==-1 || el[0].indexOf(elt) !==-1) {
                                        return arrayListIngredientsUstensilsAppliances.push(el)
                                    }
                                })
                            })
                            console.log(arrayListIngredientsUstensilsAppliances);
                            /*je stocke dans un tableau juste les titres des recettes avec l'ingrédient selectionné,
                            bien sur à chaque tag choisi le tableau doit etre reinitialisé*/
                            arrayListAllTitles = [];
                            arrayListIngredientsUstensilsAppliances.map(el => {
                                arrayListAllTitles.push(el[el.length -1])
                            })
                            /*je stcke dans un tableau juste les ingredients de toutes les recettes dont j'ai choisi un ingredient ou apareil ou ustensil
                            bien sur je reinitialise le tableau d'avant*/
                            listIngredientsWithTag = []
                            arrayListIngredientsUstensilsAppliances.map(el => {
                                el.map(elt => {
                                    if (elt !== el[0]) {
                                        listIngredientsWithTag.push(elt)   
                                    }
                                });   
                            })
                            /*je stcke dans un tableau juste les appareils de toutes les recettes dont j'ai choisi un appareil ou ingredient ou ustensil
                            bien sur je reinitialise le tableau d'avant*/
                            listappliancesWithTag = [];
                            arrayListIngredientsUstensilsAppliances.map(el => {
                                el.map(elt => {
                                    if (elt === el[1]) {
                                        listappliancesWithTag.push(elt)
                                    }
                                })
                            })
                            /*je stcke dans un tableau juste les ustensils de toutes les recettes dont j'ai choisi un appareil ou ingredient ou ustensil
                            bien sur je reinitialise le tableau d'avant*/   
                            listustensilsWithTag = [];
                            arrayListIngredientsUstensilsAppliances.map(el => {
                                if (Array.isArray(el[0]) && el[0].length) {
                                    if (el[0] !== undefined) {
                                        el[0].map(elt => {
                                                listustensilsWithTag.push(elt)
                                        })
                                    }
                                } 
                            })
                            //j'affiche ma liste des ingredients avec ceux restants, en ayant choisi l'ingredinet d'avant
                            mapIngredients.innerHTML = "";
                            listIngredientsWithTag.map(el => {
                                arrayListIngredients2.map(elt => {
                                    if (elt.textContent === el) {
                                        mapIngredients.appendChild(elt);
                                    }
                                })
                            })
                            //j'affiche ma liste des appareils avec ceux restants, en ayant choisi l'ingredinet d'avant
                            mapAppareils.innerHTML = "";
                            listappliancesWithTag.map(el => {
                                arrayListAppliances2.map(elt => {
                                    if (elt.textContent === el) {
                                        mapAppareils.appendChild(elt);
                                    }
                                })
                            })
                            //j'affiche ma liste des appareils avec ceux restants, en ayant choisi l'ingredinet d'avant
                            mapUstensils.innerHTML = "";
                            listustensilsWithTag.map(el => {
                                arrayListUstensils2.map(elt => {
                                    if (elt.textContent === el) {
                                        mapUstensils.appendChild(elt);
                                    }
                                })
                            })
                            //j'affiche dans ma section du coup juste les recettes de l'ingrédient dont on a créé le tag
                            section.innerHTML = "";
                            arrayRecipes.map(el => {
                                arrayListAllTitles.map(elt => {
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
                        arrayListIngredients2.map(elt => {
                            mapIngredients.appendChild(elt);
                        })
                        arrayListAppliances2.map(elt => {
                            mapAppareils.appendChild(elt);
                        })
                        arrayListUstensils2.map(elt => {
                            mapUstensils.appendChild(elt);
                        })
                        arrayListIngredientsUstensilsAppliances = [];
                        arrayListAllTitles = [];
                        listIngredientsWithTag = [];
                        listappliancesWithTag = [];
                        listustensilsWithTag = [];
                    }
                }) 
            })
    }))  
}

