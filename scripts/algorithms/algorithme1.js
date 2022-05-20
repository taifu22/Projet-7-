//liste de variables à utiliser tout au long du code
let check = null;
let criteria = null;
let arrayListUstensils2 = [];
let arrayListIngredients2 = [];
let arrayListAppliances2 = [];
let arrayListIngredientsUstensilsAppliances = [];
let arrayListAllTitles = [];
let listIngredientsWithTag = [];
let listappliancesWithTag = [];
let listustensilsWithTag = [];
let searchingCriterias = [];
let searchingCriteria = null;
let elementSearc;
let newelementSearc;
let foundIngredients;
let close1;
let arraySearchIngredient = [];
let arrayRecipes2 = [];
//liste de variables qui stockent les modales pour le choix des tags, à savoir que l'element2 c'est la modale fermé et element la modale ouverte
let containerElementsIngredient = document.querySelector(".container-elements-ingredient");
let containerElements2Ingredient = document.querySelector(".container-elements2-ingredient");
let containerElementsAppareils = document.querySelector(".container-elements-appareils");
let containerElements2Appareils = document.querySelector(".container-elements2-appareils");
let containerElementsUstensils = document.querySelector(".container-elements-ustensils");
let containerElements2Ustensils = document.querySelector(".container-elements2-ustensils");
//liste des variables stoquants les chevrons pour l'ouverture et fermeture des modales
const chevronIngredients = document.querySelectorAll(".chevron-ingredients");
const chevronAppareils = document.querySelectorAll(".chevron-appareils");
const chevronUstensils = document.querySelectorAll(".chevron-ustensils");
//liste des variables pour gerer l'ouverture des 3 modales, true modale fermé, false modale ouverte
let chevronClickIngredient = true;
let chevronClickAppareils = true;
let chevronClickUstensils = true;
let chevronClick = true;
//3 variables pour l'affichage de la liste de tags dans les 3 modales, ingredients, appareils, ustensils
const mapIngredients = document.querySelector(".map-ingredients");
const mapAppareils = document.querySelector(".map-appareils");
const mapUstensils = document.querySelector(".map-ustensils");

//FUNCTION POUR LA RECHERCHE DES RECETTES PAR TITRE DANS LA BARRE DE RECHERCHE PRINCIPALE
function getRecipesBarSearch(section, arrayRecipes) {
  //on recupere la value de notre input de la barre de recherche et on la stocke dans la variable check
  document.querySelector(".form-control").addEventListener("change", function () {
      check = this.value;
    });
  //on recupere l'élément form de mon input pour pouvoir envoyer la requete de mon formulaire, à savoir filtrer/afficher juste les recettes
  //dont le name est = à la value check de mon input
  const formulaire = document.querySelector(".formulaire");
  formulaire.addEventListener("submit", (e) => {
    e.preventDefault();
    section.innerHTML = "";
    //on filtre notre tableau pour afficher juste les cards qui nous interessent
    arrayRecipes.filter((el) => {
      //je fais une condition pour trouver mes cards par rapport à une lettre ou une chaine de caracthere présente dans le nom de la recette
      //que j'ai mis tout à l'heure dans le id de chaque recette
      if (el.id.toLowerCase().indexOf(check) !== -1) {
        section.appendChild(el);
      }
    });
  });
}

//FONCTION POUR L'AFFICHAGE DES LA LISTE DES TAGS, DANS LE MENU DES INGREDIENTS, USTENSILS, ET APPLIANCES
function getListTags( arrayListTags, arrayListTags2, containerElements, containerElements2, chevron, chevronClick, map, tag, checkInput) {
  let pIngredient = null;
  //on map notre array avec la liste de tous les ingredients, et on l'affiche dans la liste des ingredients
  arrayListTags.map((el) => {
    pIngredient = document.createElement("li");
    pIngredient.setAttribute("class","li-ingredient-ustensils-appliances list-group")
    pIngredient.setAttribute("id", tag);
    pIngredient.innerHTML = el;
    arrayListTags2.push(pIngredient);
    map.appendChild(pIngredient);
  });
  //j'affiche la modale dans l'input du choix pour la recherche selon les ingredients
  chevron.forEach((btn) =>
    btn.addEventListener("click", () => {
      if (chevronClick) {
        containerElements.style.display = "none";
        containerElements2.style.display = "block";
        chevronClick = false;
      } else {
        containerElements.style.display = "block";
        containerElements2.style.display = "none";
        chevronClick = true;
      }
    })
  );
  //on filtre notre menu ingredient selon la value de l'input
  document
    .querySelector(`.input-${tag}`)
    .addEventListener("input", function () {
      checkInput = this.value;
      map.innerHTML = "";
      arrayListTags2.filter((el) => {
        if (el.textContent.toLowerCase().indexOf(checkInput) !== -1) {
          map.appendChild(el);
        }
      });
    });
}

//FONCTION POUR L'AFFICHAGE DU TAG CHOISI
function getShowTags( section, arrayRecipes, cardRecipes, arrayListIngredients2, arrayListAppliances2, arrayListUstensils2) {
  arrayRecipes2 = [...arrayRecipes];
  //je recupere ma liste des tags (ingredients, ustensils, appareils)
  let liIngredient = document.querySelectorAll(".li-ingredient-ustensils-appliances");
  //je donne un evenement click à chaque tag
  liIngredient.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      //je stocke mon tag dans un tableau pour l'utiliser aprés au nievau de la suppression du tag
      searchingCriteria = e.currentTarget.textContent;
      searchingCriterias.push(searchingCriteria);
      //on créé notre element tag
      elementSearc = document.querySelector(".elements-search");
      newelementSearc = document.createElement("div");
      newelementSearc.innerHTML = `<p style="margin:5px;">${e.currentTarget.textContent}</p><img class="close1" id="${e.currentTarget.textContent}" style="margin:5px; cursor:pointer;" src="/assets/close.svg" alt="close">`;
      //petite condition pour afficher la bonne coulaur selon le tag choisi (entre ingredients, appareils et ustensils)
      let ePathId = e.path[0].id;
      if (e.path[0].id === "appareils") {
        newelementSearc.setAttribute("class","bg-info d-flex m-3 rounded elem-tag");
      } else if (e.path[0].id === "ingredients") {
        newelementSearc.setAttribute("class","bg-primary d-flex m-3 rounded elem-tag");
      } else if (e.path[0].id === "ustensils") {
        newelementSearc.setAttribute("class","bg-danger d-flex m-3 rounded elem-tag");
      }
      newelementSearc.setAttribute("id", `${e.currentTarget.textContent}`);
      newelementSearc.setAttribute("style", "color:white;");
      elementSearc.appendChild(newelementSearc);
      //je vide ma section pour trier aprés selon l'ingrédient de mon tag
      section.innerHTML = "";
      //je lance la fonction (declaré en bas) pour le tri de ma section recettes selon le tag choisi
      getSortSectionRecipes( section, cardRecipes, arrayRecipes, ePathId, arrayListIngredients2, arrayListAppliances2, arrayListUstensils2);
      //je lance la fonction (declaré en bas) pour supprimer un tag existant et du coup trier selon cette suppression
      DeleteTags( section, cardRecipes, arrayRecipes, arrayListIngredients2, arrayListAppliances2, arrayListUstensils2);
      //console.log(chevronClickIngredient);
    })
  );
}

//FONCTION POUR STOCKER DANS UN TABLEAU JUSTE LE TAG CHOISI (INGREDIENT)
function getSortListTagsINgredients() {
  /*je stcke dans un tableau juste les ingredients de toutes les recettes dont j'ai choisi un ingredient ou apareil
    bien sur je reinitialise le tableau d'avant*/
  listIngredientsWithTag = [];
  arrayListIngredientsUstensilsAppliances.map((el) => {
    el.map((elt) => {
      if (elt !== el[0]) {
        listIngredientsWithTag.push(elt);
      }
    });
  });
}

//FONCTION POUR STOCKER DANS UN TABLEAU JUSTE LE TAG CHOISI (APPAREIL)
function getSortListTagsAppliances() {
  /*je stcke dans un tableau juste les ingredients de toutes les recettes dont j'ai choisi un ingredient ou apareil
    bien sur je reinitialise le tableau d'avant*/
  listappliancesWithTag = [];
  arrayListIngredientsUstensilsAppliances.map((el) => {
    el.map((elt) => {
      if (elt === el[1]) {
        listappliancesWithTag.push(elt);
      }
    });
  });
}

//FONCTION POUR STOCKER DANS UN TABLEAU JUSTE LE TAG CHOISI (USTENSIL)
function getSortListTagsUstensils() {
  /*je stcke dans un tableau juste les ingredients de toutes les recettes dont j'ai choisi un ingredient ou apareil
    bien sur je reinitialise le tableau d'avant*/
  listustensilsWithTag = [];
  arrayListIngredientsUstensilsAppliances.map((el) => {
    if (Array.isArray(el[0]) && el[0].length) {
      if (el[0] !== undefined) {
        el[0].map((elt) => {
          listustensilsWithTag.push(elt);
        });
      }
    }
  });
}

//FONCTION POUR L'AFFICHAGE DE LA LISTE DE TAGS RESTANTS APRES EN AVOIR CHOISI UN
function getNewShowListTags(map, arrayListTags2, listTagssWithTag) {
  map.innerHTML = "";
  listTagssWithTag.map((el) => {
    arrayListTags2.map((elt) => {
      if (elt.textContent === el) {
        map.appendChild(elt);
      }
    });
  });
}

//FONCTION POUR L'AFFICHAGE DES RECETTES TRIES DANS LA SECTION RECIPES
function getShowSectionRecipes(arrayRecipes, section) {
  section.innerHTML = "";
  arrayRecipes.map((el) => {
    arrayListAllTitles.map((elt) => {
      if (elt !== undefined) {
        if (elt.indexOf(el.id) !== -1) {
          section.appendChild(el);
        }
      }
    });
  });
}

//FONCTION POUR REINITIALISER LA SECTION DES RECIPES SI AUCUN TAG N'EST SELECTIONNE
function resetSectionRecipes( section, arrayRecipes, arrayListIngredients2, arrayListAppliances2, arrayListUstensils2 ) {
  if (searchingCriterias.length <= 0) {
    mapIngredients.innerHTML = "";
    mapAppareils.innerHTML = "";
    mapUstensils.innerHTML = "";
    section.innerHTML = "";
    arrayRecipes.map((el) => {
      section.appendChild(el);
    });
    arrayListIngredients2.map((elt) => {
      mapIngredients.appendChild(elt);
    });
    arrayListAppliances2.map((elt) => {
      mapAppareils.appendChild(elt);
    });
    arrayListUstensils2.map((elt) => {
      mapUstensils.appendChild(elt);
    });
    arrayListIngredientsUstensilsAppliances = [];
    arrayListAllTitles = [];
    listIngredientsWithTag = [];
    listappliancesWithTag = [];
    listustensilsWithTag = [];
  }
}

//FONCTION POUR REMPLIR MON TABLEAUX QUI M'AFFICHERA ENSUITE LES RECETTES DONT J'AI LES TAGS EN COURS
function getSortArrayTags(cardRecipes) {
  /*je stocke les ingredients et le name(dans un array) de chaque recette dans un array, donc j'aurais 50 arrays (recettes) dans un array,
    mais avant je pense bien à reinitialiser ce tableau car sinon à chaque fois que le else se lance, mon tableau ajoute des doublons*/
  arraySearchIngredient = [];
  arrayListIngredientsUstensilsAppliances = [];
  cardRecipes.map((el) => {
    let name = [el.name];
    let ingredient = el.ingredients.map((el) => {
      return el.ingredient;
    });
    let appliance = el.appliance;
    let ustensils = el.ustensils.map((el) => {
      return el;
    });
    ingredient.unshift(appliance);
    ingredient.unshift(ustensils);
    ingredient.push(name);
    arraySearchIngredient.push(ingredient);
  });
  /*je créé une fonction pour pouvoir verifier si les elements de SearchingCriterias (les tags en cours), sont bien presents, dans un index
    des 50 recettes (arraySearchIngredient)*/
  function isSubsetOf(set, subset) {
    for (let i = 0; i < set.length; i++) {
      if (subset.indexOf(set[i]) == -1 ) {
        return false;
      }
    }
    return true;
  }
  /*donc ici je push dans mon arrayListIngredientsUstensilsAppliances juste les recettes lié au tag, que ce soit ingredient, appareil ou ustensil*/
  arraySearchIngredient.map((el) => {
    const result = isSubsetOf(searchingCriterias, el);
    if (result !== false) {
      return arrayListIngredientsUstensilsAppliances.push(el);
    }
  });
}

//JE FAIS UNE FONCTION AVEC UNE CONDITION POUR TRIER MA SECTION DE RECETTES SI J'AI UN SEARCHINGCRITERIA ACTIVE, C'EST A DIRE SI J'AI CHOISI UN TAG
function getSortSectionRecipes( section, cardRecipes, arrayRecipes, ePathId, arrayListIngredients2, arrayListAppliances2, arrayListUstensils2) {
  if (searchingCriteria !== null) {
    //je lance ma fonction pour creer et trier le tableau qui contient mes tags en cours
    getSortArrayTags(cardRecipes);
    //je stocke dans un tableau juste les titres des recettes avec l'ingrédient selectionné,
    //bien sur à chaque tag choisi le tableau doit etre reinitialisé
    arrayListAllTitles = [];
    arrayListIngredientsUstensilsAppliances.map((el) => {
      arrayListAllTitles.push(el[el.length - 1]);
    });

    /*je lance les 3 fonction pour stocker dans 3 tableau chacun juste les ingredients, appareils, ustensils de toutes les recettes dont j'ai 
    choisi un ingredient, apareil, ou utensile*/
    getSortListTagsINgredients();
    getSortListTagsAppliances();
    getSortListTagsUstensils();
    //je lance la fonction pour afficher ma liste des ingredients avec ceux restants, en ayant choisi l'ingredinet d'avant
    getNewShowListTags( mapIngredients, arrayListIngredients2, listIngredientsWithTag);
    //je lance la fonction pour afficher ma liste des appareils avec ceux restants, en ayant choisi l'ingredinet d'avant
    getNewShowListTags( mapAppareils, arrayListAppliances2, listappliancesWithTag);
    //je lance la fonction pour afficher ma liste des ustensils avec ceux restants, en ayant choisi l'ingredinet d'avant
    getNewShowListTags(mapUstensils, arrayListUstensils2, listustensilsWithTag);
    //je lance la fonction pour afficher ma section du coup juste les recettes de l'ingrédient dont on a créé le tag
    getShowSectionRecipes(arrayRecipes, section);
    //je fait disparaitre la liste des ingredients et des appareils une fois le traitement de triage des recettes terminé
    //containerElementsIngredient.style.display = 'block';
    //containerElements2Ingredient.style.display = 'none';
    if (ePathId === "ingredients") {
      chevronClickIngredient = true;
      containerElementsIngredient.style.display = "block";
      containerElements2Ingredient.style.display = "none";
    } else if (ePathId === "appareils") {
      containerElementsAppareils.style.display = "block";
      containerElements2Appareils.style.display = "none";
      chevronClickAppareils = true;
    } else if (ePathId === "ustensils") {
      containerElementsUstensils.style.display = "block";
      containerElements2Ustensils.style.display = "none";
      chevronClickUstensils = true;
    }
  }
}

//FONCTION POUR SUPPRIMER UN TAG TOUT EN LAISSANT MA SECTION TRIEE SELON LES TAGS RESTANTS
function DeleteTags(section, cardRecipes, arrayRecipes, arrayListIngredients2, arrayListAppliances2, arrayListUstensils2) {
  /*je recupere l'element close pour fermer un tag, du coup je recupere tous les close que je stocke dans un array, et je donne à chaque element de l'array
  un event click, puis je dit si lid de lelement close est === au textContent de mon elemtag alors tu me supprime le tag et tu me filtre ma section de
  recettes sans le tag*/
  close1 = Array.from(document.getElementsByClassName("close1"));
  close1.forEach((elt) => {
    elt.addEventListener("click", () => {
      let Arrayelemtag = Array.from(document.getElementsByClassName("elem-tag"));
      Arrayelemtag.forEach((el) => {
        if (el.firstElementChild.textContent === elt.id) {
          el.setAttribute("class", "d-none");
          const ingredient = el.firstElementChild.textContent;
          const index = searchingCriterias.indexOf(ingredient);
          if (index > -1) {
            searchingCriterias.splice(index, 1);
          }
          //je lance ma fonction pour creer et trier le tableau qui contient mes tags en cours
          getSortArrayTags(cardRecipes);
          /*je stocke dans un tableau juste les titres des recettes avec l'ingrédient selectionné,
                        bien sur à chaque tag choisi le tableau doit etre reinitialisé*/
          arrayListAllTitles = [];
          arrayListIngredientsUstensilsAppliances.map((el) => {
            arrayListAllTitles.push(el[el.length - 1]);
          });
          /*je lance les 3 fonction pour stocker dans 3 tableau chacun juste les ingredients, appareils, ustensils de toutes les recettes dont j'ai 
                        choisi un ingredient, apareil, ou utensile*/
          getSortListTagsINgredients();
          getSortListTagsAppliances();
          getSortListTagsUstensils();
          //j'affiche ma liste des ingredients avec ceux restants, en ayant choisi l'ingredinet d'avant
          getNewShowListTags( mapIngredients, arrayListIngredients2, listIngredientsWithTag);
          //j'affiche ma liste des appareils avec ceux restants, en ayant choisi l'ingredinet d'avant
          getNewShowListTags( mapAppareils, arrayListAppliances2, listappliancesWithTag);
          //j'affiche ma liste des ustensils avec ceux restants, en ayant choisi l'ingredinet d'avant
          getNewShowListTags( mapUstensils, arrayListUstensils2, listustensilsWithTag);
          //je lance la fonction pour afficher ma section du coup juste les recettes de l'ingrédient dont on a créé le tag
          getShowSectionRecipes(arrayRecipes, section);
        }
        //je lance la fonction pour reinitialiser ma section de recettes si aucun tag n'est selectionné
        resetSectionRecipes( section, arrayRecipes, arrayListIngredients2, arrayListAppliances2, arrayListUstensils2);
      });
    });
  });
}
