import {FETCH_URL} from "../utils/constants";

export default class RegularUserServices {
    registerRegularUser = (regularUser) => {
        // console.log(regularUser);
        return fetch(FETCH_URL + 'registerUser', {
            method: 'post',
            body: JSON.stringify(regularUser),
            headers: {
                'content-type': 'application/json'
            },
            credentials: "same-origin"
        }).then(res => console.log(res));
    };

    findById = userID => fetch(FETCH_URL + 'regularUser/' + userID)
        .then(response => response.json());

    favoriteRecipe = (userId, recipeId) => {
        return fetch(FETCH_URL + 'regularUser/' + userId + '/recipes/' + recipeId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    };

    removeFavorite = (userId, recipeId) => {
        return fetch(FETCH_URL + 'regularUser/' + userId + '/recipes/' + recipeId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    };



    deleteOwnRecipe = (userId, recipeId) => {
        return fetch(FETCH_URL + 'user/' + userId + '/recipes/' + recipeId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    };

    findFavoriteRecipes = (userID) => {
        return fetch(FETCH_URL + 'regularUser/' + userID+'/recipes')
            .then(function(response){
                return response.json();
            });
    }

    findFavoriteRecipeId = (userID) => {
        return fetch(FETCH_URL + 'regularUser/' + userID+'/recipeId')
            .then(function(response){
                return response.json();
            });
    }

    findOwnRecipes = (userID) => {
        return fetch(FETCH_URL + 'users/' + userID+'/recipes')
            .then(function(response){
                return response.json();
            });
    }
    findOwnIngredients = (userID) => {
        return fetch(FETCH_URL + 'users/' + userID+'/ingredients')
            .then(function(response){
                return response.json();
            });
    }
}

