class Algorithme {
    constructor(recipesSection, arrayRecipes, cardRecipes, arrayUstensilsTags){
        this.recipesSection = recipesSection
        //variables pour stocker les tableaux qu'on utilisera pour stocker les ingredinets, ustensiles et appareils
        this.arrayRecipes = arrayRecipes;
        //variable pour stocker tous les utensils dans un tableau
        this.arrayUstensilsTags = arrayUstensilsTags;
        //variables pour stocker les tags en cours
        this.searchingCriterias = [];
        this.searchingCriteria = null;
        //variables pour stocker les tags, selon l'ingredient outensil ou appareil choisi
        this.listIngredientsWithTag = []; 
        this.listappliancesWithTag = [];
        this.listustensilsWithTag = [];
        //variable pour stocker les titres des recettes
        this.arrayListAllTitles = [];
        //variable qui me stocke le resultat du fetch
        this.cardsRecipes = cardRecipes;
        //variables où je stocke les tags des utensiles
        this.arrayUstensilsTags = arrayUstensilsTags
        this.arrayListUsetensilsInArray = []
        this.arraySearchTagsWithUstensils = [];
        //variable qui stocke la liste de toutes les recettes, avec un tableau pour chaque recette où je trouve les ustensils (dans n array à part en index 0), les appareils en index 1 et le reste c'est les ingredients
        this.arraySearchTags = [];
        //variable où je stocke toutes mes recettes avec les tags choisi, donc le tableau d'en haut trié selon le tag choisi
        this.arrayListIngredientsUstensilsAppliances = [];
        //variable qui stocke la value du tag choisi (entre ingredients, appareils et ustensils)
        this.ePathId;
    }

   //METHODE POUR TRIER MES 3 MENU ELEMENTS, INGREDIENTS APPLIANCES ET USTENSILS, PAR RAPPORT A LA VALUE DE L'INPUT
   //cette function on l'utilisera dans celle juste en bas
   getSortElementsInput(ingredients, appliances, ustensils){
      let ingredient = ingredients.map((elt2) => {
        return elt2.ingredient;
      });
      let appliance = appliances;
      ingredient.unshift(appliance);
      this.arraySearchTags.push(ingredient); 
      let ustensil = ustensils.map((elt2) => {
        return elt2
      });
      ustensil.map(elt3 => {
        this.arraySearchTagsWithUstensils.push(elt3)
      })
      console.log(this.arraySearchTags);
   }

    //METHODE POUR LA RECHERCHE DES RECETTES PAR TITRE, INGREDIENT OU DESCRIPTION DANS LA BARRE DE RECHERCHE PRINCIPALE
    getRecipesBarSearch(mapIngredients, arrayTags2Ingredients, mapAppareils, arrayTags2Appliances, mapUstensils, arrayTags2Ustensils) {
        let check = null;
        //on recupere la value de notre input de la barre de recherche et on la stocke dans la variable check
        document.querySelector(".form-control").addEventListener("input", function () {
            check = this.value.toLowerCase();
        });
        //on recupere l'élément form de mon input pour pouvoir envoyer la requete de mon formulaire, à savoir filtrer/afficher juste les recettes
        //dont le name est = à la value check de mon input
        const formulaire = document.querySelector(".formulaire");
        formulaire.addEventListener("submit", (e) => {
            e.preventDefault();
            this.recipesSection.innerHTML = "";
            this.arraySearchTags = [];
            this.arraySearchTagsWithUstensils = [];
            //on filtre notre tableau pour afficher juste les cards qui nous interessent
            this.arrayRecipes.filter((el) => {
                //je fais une condition pour trouver mes cards par rapport à une lettre ou une chaine de caracthere présente dans le nom de la recette
                //(que j'ai mis tout à l'heure dans le id de chaque recette), ou selon la description ou un ingredient 
                this.cardsRecipes.filter(elt => {
                  elt.ingredients.filter(elt1 => { 
                    //dans el.id j'ai le name, donc ca c'est la condition pour afficher mes recettes selon le name
                  if (el.id.toLowerCase().indexOf(check) !== -1 && el.id === elt.name) {
                    this.recipesSection.appendChild(el);
                    this.getSortElementsInput(elt.ingredients, elt.appliance, elt.ustensils);
                  } 
                  //ici je fais la condition pour l'ffichage des recettes selon la description
                  else if(elt.description.toLowerCase().indexOf(check)!== -1 && el.id === elt.name) {
                    this.recipesSection.appendChild(el);
                    this.getSortElementsInput(elt.ingredients, elt.appliance, elt.ustensils);
                  }
                  //enfin si ma barre de recherche est vide, donc input vide, je charcge tout mon contenu des 3 menus
                  else if (check === "") {
                    this.recipesSection.appendChild(el);
                    this.getSortElementsInput(elt.ingredients, elt.appliance, elt.ustensils);
                  }
                  //enfin ici c'et la condition pour la recherche/affichage des recettes selon un ingredient
                  else if (elt1.ingredient.toLowerCase().indexOf(check)!== -1 && el.id === elt.name) {
                      this.recipesSection.appendChild(el);  
                      this.getSortElementsInput(elt.ingredients, elt.appliance, elt.ustensils);              
                    }
                  })
                }) 
            })
            /*je lance mes fonctions pour le tri et l'affichage des elements ingredients,appareils et ustensils, selon la value de 
            l'input, du coup les recettes triées*/
            this.getSortListTagsINgredients(this.arraySearchTags);
            this.getSortListTagsAppliances(this.arraySearchTags);
            this.getSortListTagsUstensils(this.arraySearchTagsWithUstensils)
            this.getNewShowListTags(mapIngredients, arrayTags2Ingredients, this.listIngredientsWithTag)
            this.getNewShowListTags(mapAppareils, arrayTags2Appliances, this.listappliancesWithTag)
            this.getNewShowListTags(mapUstensils, arrayTags2Ustensils, this.listustensilsWithTag)
        })
    }

    //METHODE POUR L'AFFICHAGE DES LA LISTE DES TAGS, DANS LE MENU DES INGREDIENTS, USTENSILS, ET APPLIANCES
    getListTags( arrayTags, arrayTags2, containerElements, containerElements2, chevron, chevronClick, mapelement, tag, checkInput) {
      let pIngredient = null;
      /*on map notre array avec la liste de tous les ingredients, et on l'affiche dans la liste des ingredients,ustensils, appliances
      a savoir que c'est une fonction qu'on utilisera 3 fois, une pour les ingredinets, une pour les ustensils, et une pour les appliances
      ces 3 fonctions sont appelé dans la class CardRecipes, et en argument on mettra les bonnes info pour ingredients, ustensils et appliance */
        arrayTags.map((el) => {
        pIngredient = document.createElement("li");
        pIngredient.setAttribute("class","li-ingredient-ustensils-appliances list-group")
        pIngredient.setAttribute("id", tag);
        pIngredient.innerHTML = el;
        arrayTags2.push(pIngredient);
        mapelement.appendChild(pIngredient);
      });
      //j'affiche la modale dans l'input du choix pour la recherche selon l'element 
      chevron.forEach((btn) =>
        btn.addEventListener("click", (e) => {
          if (chevronClick) {
            containerElements.style.display = "none";
            containerElements2.style.display = "block";
            chevronClick = false;
          } else {
            containerElements.style.display = "block";
            containerElements2.style.display = "none";
            chevronClick = true;
          }
          e.stopPropagation()
          //je lance la fonction pour filtrer nos 3 menus selon la value de l'input
          this.getFilterInput(checkInput, mapelement, arrayTags2, tag)
        })
      );
    }

    //METHODE POUR FILTRER NOTRE MENU INGREDIENT, OU USTENSIL, OU APPAREIL SELON LA VALUE DE L'INPUT
    getFilterInput(checkInput, mapelement, arrayTags2, tag){
      /*je recupere l'element input correspondant a mon tag (ingredient, ustensils ou appareil) et j'affiche mes tags selon l'input  
      Cette fonction aussi est utilisé 3 fois pour chaque menu (ingredient, ustensils ou appareils)*/
      document
        .querySelector(`.input-${tag}`)
        .addEventListener("input", function () {
          checkInput = this.value;
          map.innerHTML = "";
          arrayTags2.filter((el) => {
            if (el.textContent.toLowerCase().indexOf(checkInput) !== -1) {
              mapelement.appendChild(el);
            }
          });
        });
    }

    //METHODE POUR L'AFFICHAGE DU TAG CHOISI
    getShowTags(arrayTags2Ingredients, arrayTags2Appliances, arrayTags2Ustensils, mapIngredients, mapAppareils, mapUstensils) {
      let elementSearc;
      let newelementSearc;
      //je recupere ma liste des tags (ingredients, ustensils, appareils)
      let liIngredient = document.querySelectorAll(".li-ingredient-ustensils-appliances");
      //je donne un evenement click à chaque tag
      liIngredient.forEach((btn) =>
        btn.addEventListener("click", (e) => {
          //je stocke mon tag dans un tableau pour l'utiliser aprés au nievau de la suppression du tag
          this.searchingCriteria = e.currentTarget.textContent;
          this.searchingCriterias.push(this.searchingCriteria);
          //on créé notre element tag
          elementSearc = document.querySelector(".elements-search");
          newelementSearc = document.createElement("div");
          newelementSearc.innerHTML = `<p style="margin:5px;">${e.currentTarget.textContent}</p><img class="close1" id="${e.currentTarget.textContent}" style="margin:5px; cursor:pointer;" src="/assets/close.svg" alt="close">`;
          //petite condition pour afficher la bonne couleur selon le tag choisi (entre ingredients, appareils et ustensils)
          this.ePathId = e.path[0].id;
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
          this.recipesSection.innerHTML = "";
          //je lance la fonction (declaré en bas) pour le tri de ma section recettes selon le tag choisi
          this.getSortSectionRecipes(arrayTags2Ingredients, arrayTags2Appliances, arrayTags2Ustensils, mapIngredients, mapAppareils, mapUstensils);
          //je lance la fonction (declaré en bas) pour supprimer un tag existant et du coup trier selon cette suppression
          this.DeleteTags(arrayTags2Ingredients, arrayTags2Appliances, arrayTags2Ustensils, mapIngredients, mapAppareils, mapUstensils)
        })
      );
    }

  //METHODE POUR STOCKER DANS UN TABLEAU JUSTE LE TAG CHOISI (INGREDIENT)
     getSortListTagsINgredients(array) {
      /*je stcke dans un tableau juste les ingredients de toutes les recettes dont j'ai choisi un ingredient ou apareil, ou ustensil
        bien sur je reinitialise le tableau d'avant*/
      this.listIngredientsWithTag = [];
      array.map((el) => {
        el.map((elt) => {
          if (elt !== el[0]) {
            if ( this.listIngredientsWithTag.indexOf(elt) === -1) {
              this.listIngredientsWithTag.push(elt); 
            }
          }
        });
      });
    }

  //METHODE POUR STOCKER DANS UN TABLEAU JUSTE LE TAG CHOISI (APPAREIL)
    getSortListTagsAppliances(array) {
      /*je stcke dans un tableau juste les appareils de toutes les recettes dont j'ai choisi un ingredient ou apareil ou ustensil
        bien sur je reinitialise le tableau d'avant*/
      this.listappliancesWithTag = [];
      array.map((el) => {
        el.map((elt) => {
          if (elt === el[0]) {
            if ( this.listappliancesWithTag.indexOf(elt) === -1) {
              this.listappliancesWithTag.push(elt); 
            }
          }
        });
      });
    }
  
  //METHODE POUR STOCKER DANS UN TABLEAU JUSTE LE TAG CHOISI (USTENSIL)
    getSortListTagsUstensils(array) {
      /*je stocke dans un tableau juste les utensils de toutes les recettes dont j'ai choisi un ingredient ou apareil ou ustensil
      bien sur je reinitialise le tableau d'avant*/
      this.listustensilsWithTag = [];
      array.map(el => {
        return this.listustensilsWithTag.push(el)
      })
    }
  
  //METHODE POUR L'AFFICHAGE DE LA LISTE DE TAGS RESTANTS APRES EN AVOIR CHOISI UN
  /*du coup cette fonction sera appelé 3 fois, pour chaque menu (ingredients, appareils ou ustensils)*/
    getNewShowListTags(mapelement, arrayTags2, listTagssWithTag) {
      mapelement.innerHTML = "";
      listTagssWithTag.map((el) => {
        arrayTags2.map((elt) => {
          if (elt.textContent === el) {
            mapelement.appendChild(elt);
          }
        });
      });
    }
    
  //METHODE POUR L'AFFICHAGE DES RECETTES TRIES DANS LA SECTION RECIPES
    getShowSectionRecipes() {
      this.recipesSection.innerHTML = "";
      this.arrayRecipes.map((el) => {
        this.arrayListAllTitles.map((elt) => {
          if (elt !== undefined) {
            if (elt.indexOf(el.id) !== -1) {
              this.recipesSection.appendChild(el);
            }
          }
        });
      });
    }

  //METHODE POUR REINITIALISER LA SECTION DES RECIPES SI AUCUN TAG N'EST SELECTIONNE
    resetSectionRecipes(arrayTags2Ingredients, arrayTags2Appliances, arrayTags2Ustensils, mapIngredients, mapAppareils, mapUstensils ) {
      if (this.searchingCriterias.length <= 0) {
        mapIngredients.innerHTML = "";
        mapAppareils.innerHTML = "";
        mapUstensils.innerHTML = "";
        this.recipesSection.innerHTML = "";
        this.arrayRecipes.map((el) => {
          this.recipesSection.appendChild(el);
        });
        arrayTags2Ingredients.map((elt) => {
          mapIngredients.appendChild(elt);
        });
        arrayTags2Appliances.map((elt) => {
          mapAppareils.appendChild(elt);
        });
        arrayTags2Ustensils.map((elt) => {
          mapUstensils.appendChild(elt);
        });
        this.arrayListIngredientsUstensilsAppliances = [];
        this.arrayListAllTitles = [];
        arrayTags2Ingredients = [];
        arrayTags2Appliances = [];
        arrayTags2Ustensils = [];
      }
    }

  //METHODE POUR REMPLIR MON TABLEAUX QUI M'AFFICHERA ENSUITE LES RECETTES DONT J'AI LES TAGS EN COURS
    getSortArrayTags(value) {
      /*je stocke les appareils/ingredients et le name(dans un array) de chaque recette dans notre 'arrayListIngredientsUstensilsAppliances'
        mais avant je pense bien à reinitialiser ce tableau car sinon à chaque fois, mon tableau ajoute des doublons
        Ce tableau du coup contient les recettes dont on a choisi un ingredients ustensils ou appareil*/
      this.arraySearchTags = [];
      this.cardsRecipes.map((el) => {
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
        this.arraySearchTags.push(ingredient);
      });
      //je créé un autre tableau où cette fois je melange les ustensils avec les ingredients et appareils
      this.arraySearchTagsWithUstensils = [];
      this.cardsRecipes.map(el => {
        let name = [el.name];
        let ingredient = el.ingredients.map((el) => {
          return el.ingredient;
        });
        let appliance = el.appliance;
        let ustensils = el.ustensils.map((el) => {
          return el;
        });
        ingredient.unshift(appliance)
        ustensils.map(el => {
          return ingredient.unshift(el)
        })
        ingredient.push(name);
        this.arraySearchTagsWithUstensils.push(ingredient)
      })
      /*je crée une fonction pour pouvoir verifier si les elements de SearchingCriterias (les tags en cours), sont bien presents, dans un index
        des recettes en cours d'affichage (arraySearchTags)*/
      function isSubsetOf(set, subset) {
        for (let i = 0; i < set.length; i++) {
          if (subset.indexOf(set[i]) == -1) {
            return false;
          }
        }
        return true;
      }
      /*donc ici je push dans mon arrayListIngredientsUstensilsAppliances juste les recettes lié au tag, que ce soit ingredient, appareil ou ustensil*/
      this.arrayListIngredientsUstensilsAppliances = [];
      this.arraySearchTagsWithUstensils.map(el => {
        const result = isSubsetOf(this.searchingCriterias, el);
        if (result !== false || (result !== false && el[0].includes(value)!== false)) {
          return this.arrayListIngredientsUstensilsAppliances.push(el);
        }
      });
      //maintenant je sépare les ustensils de mes ingredients et appareils, puis je les metes dans un tableau independent
      this.arrayListUsetensilsInArray = []
      this.arrayUstensilsTags.map(el => {
        if (el !== undefined) {
          this.arrayListIngredientsUstensilsAppliances.map(elt => {
            if (elt.indexOf(el) !== -1) {
              this.arrayListUsetensilsInArray.push(el)
            }
          }) 
        }
      })
      //maintenant je supprime les ustensils de mon 'arrayListIngredientsUstensilsAppliances'
      this.arrayListUsetensilsInArray.map(elt => {
        this.arrayListIngredientsUstensilsAppliances.filter(el => {
          if (el.indexOf(elt) !== -1 ) {
              for(var i = el.length-1 ; i >=0 ; i--){
                  if (el[i] === elt) {
                      el.splice(i,1);
                  }
              }
          }
      })
      })
      /*donc en fin de fonction, j'ai un tableau avec en index 1 les appareils, puis les autres index c'est des ingredients, et en dernier 
      index un tableau avec le name de la recette.
      Puis un deuxieme tableau où je melange les ustensils avec les appareils et ingredients*/
    }
  
  //JE FAIS UNE METHODE AVEC UNE CONDITION POUR TRIER MA SECTION DE RECETTES SI J'AI UN SEARCHINGCRITERIA ACTIVE, C'EST A DIRE SI J'AI CHOISI UN TAG
    getSortSectionRecipes(arrayTags2Ingredients, arrayaTgs2Appliances, arrayaTgs2Ustensils, mapIngredients, mapAppareils, mapUstensils ) {
      if (this.searchingCriteria !== null) {
        //je lance ma fonction pour creer et trier le tableau qui contient mes tags en cours
        this.getSortArrayTags(this.searchingCriteria);
        /*je stocke dans un tableau juste les titres des recettes avec l'ingrédient, appliances ou ustensils selectionné,
        bien sur à chaque tag choisi le tableau doit etre reinitialisé (a savoir que dans le dernier index de arrayListIngredientsUstensilsAppliances
        j'ai stocké le title de chaque recette)*/
        this.arrayListAllTitles = [];
        this.arrayListIngredientsUstensilsAppliances.map((el) => {
          this.arrayListAllTitles.push(el[el.length - 1]);
        });
    
        /*je lance les 3 fonction pour stocker dans 3 tableau chacun juste les ingredients, appareils, ustensils de toutes les recettes dont j'ai 
        choisi un ingredient, apareil, ou utensile*/
        this.getSortListTagsINgredients(this.arrayListIngredientsUstensilsAppliances);
        this.getSortListTagsAppliances(this.arrayListIngredientsUstensilsAppliances);
        this.getSortListTagsUstensils(this.arrayListUsetensilsInArray);
        //je lance la fonction pour afficher ma liste des ingredients avec ceux restants, en ayant choisi le tag d'avant
        this.getNewShowListTags( mapIngredients, arrayTags2Ingredients, this.listIngredientsWithTag);
        //je lance la fonction pour afficher ma liste des appareils avec ceux restants, en ayant choisi le tag d'avant
        this.getNewShowListTags( mapAppareils, arrayaTgs2Appliances, this.listappliancesWithTag);
        //je lance la fonction pour afficher ma liste des ustensils avec ceux restants, en ayant choisi le tag d'avant
        this.getNewShowListTags(mapUstensils, arrayaTgs2Ustensils, this.listustensilsWithTag);
        //je lance la fonction pour afficher ma section du coup juste les recettes de l'element (tag) dont on a créé le tag
        this.getShowSectionRecipes();
      }
    }
  
  //METHODE POUR SUPPRIMER UN TAG TOUT EN LAISSANT MA SECTION TRIEE SELON LES TAGS RESTANTS
    DeleteTags(arrayListIngredients2, arrayListAppliances2, arrayListUstensils2, mapIngredients, mapAppareils, mapUstensils) {
      /*je recupere l'element close pour fermer un tag, du coup je recupere tous les close que je stocke dans un array, et je donne à chaque element de l'array
      un event click, puis je dit si lid de lelement close est === au textContent de mon elemtag alors tu me supprime le tag et tu me filtre ma section de
      recettes sans le tag*/
      let close1 = Array.from(document.getElementsByClassName("close1"));
      close1.forEach((elt) => {
        elt.addEventListener("click", () => {
          let Arrayelemtag = Array.from(document.getElementsByClassName("elem-tag"));
          Arrayelemtag.forEach((el) => {
            if (el.firstElementChild.textContent === elt.id) {
              el.setAttribute("class", "d-none");
              const ingredient = el.firstElementChild.textContent;
              const index = this.searchingCriterias.indexOf(ingredient);
              if (index > -1) {
                this.searchingCriterias.splice(index, 1);
              }
              //je lance ma fonction pour creer et trier le tableau qui contient mes tags en cours
              this.getSortArrayTags(this.searchingCriteria);
              /*je stocke dans un tableau juste les titres des recettes avec l'ingrédient selectionné,
                            bien sur à chaque tag choisi le tableau doit etre reinitialisé*/
              this.arrayListAllTitles = [];
              this.arrayListIngredientsUstensilsAppliances.map((el) => {
                this.arrayListAllTitles.push(el[el.length - 1]);
              });
              /*je lance les 3 fonction pour stocker dans 3 tableau chacun juste les ingredients, appareils, ustensils de toutes les recettes dont j'ai 
              choisi un ingredient, apareil, ou utensile*/
              this.getSortListTagsINgredients(this.arrayListIngredientsUstensilsAppliances);
              this.getSortListTagsAppliances(this.arrayListIngredientsUstensilsAppliances);
              this.getSortListTagsUstensils(this.arrayListUsetensilsInArray);
              //j'affiche ma liste des ingredients avec ceux restants, en ayant choisi l'ingredinet d'avant
              this.getNewShowListTags( mapIngredients, arrayListIngredients2, this.listIngredientsWithTag);
              //j'affiche ma liste des appareils avec ceux restants, en ayant choisi l'ingredinet d'avant
              this.getNewShowListTags( mapAppareils, arrayListAppliances2, this.listappliancesWithTag);
              //j'affiche ma liste des ustensils avec ceux restants, en ayant choisi l'ingredinet d'avant
              this.getNewShowListTags( mapUstensils, arrayListUstensils2, this.listustensilsWithTag);
              //je lance la fonction pour afficher ma section du coup juste les recettes de l'ingrédient dont on a créé le tag
              this.getShowSectionRecipes();
            }
            //je lance la fonction pour reinitialiser ma section de recettes si aucun tag n'est selectionné
            this.resetSectionRecipes(arrayListIngredients2, arrayListAppliances2, arrayListUstensils2, mapIngredients, mapAppareils, mapUstensils);
          });
        });
      });
    }

}