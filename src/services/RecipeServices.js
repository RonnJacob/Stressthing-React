import {FETCH_URL} from "../utils/constants";

export default class RecipeServices {

    addRecipe = recipe => fetch(FETCH_URL + 'recipes', {
        method: 'post',
        body: JSON.stringify(recipe),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());

    deleteRecipe = recipeId => fetch(FETCH_URL + 'recipes/' + recipeId, {
        method: 'delete',
        headers: {
            'content-type': 'application/json'
        }
    })

    updateRecipe = (recipeId, recipe) => fetch(FETCH_URL + 'recipes/' + recipeId, {
        method: 'put',
        body: JSON.stringify(recipe),
        headers: {
            'content-type': 'application/json'
        }
    });



    findRecipeById = recipeId =>
        fetch(FETCH_URL + 'recipes/' + recipeId).then(response => response.json());

    searchRecipeByName = recipeName =>
        fetch(FETCH_URL + 'recipes/searchRecipe/' + recipeName).then(response => response.json());

    findAllRecipes = () =>
        fetch(FETCH_URL + 'recipes/').then(response => response.json());

    findRecipesByIngredients=(ingredient)=>
        fetch(FETCH_URL + 'ingredients/' + ingredient+'/recipes').then(response => response.json());
}
