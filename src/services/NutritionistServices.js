import {FETCH_URL} from "../utils/constants";

export default class NutritionistServices {
    registerNutritionist = (nutritionist) => {
        return fetch(FETCH_URL + 'registerNutritionist', {
            method: 'post',
            body: JSON.stringify(nutritionist),
            headers: {
                'content-type': 'application/json'
            },
            credentials: "same-origin"
        }).then(res => console.log(res));
    };

    findById = userID => fetch(FETCH_URL + 'nutritionist/' + userID)
        .then(response => response.json());

    endorseRecipe = (userId, recipeId) => {
        return fetch(FETCH_URL + 'nutritionist/' + userId + '/recipes/' + recipeId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    };

    removeEndorsed = (userId, recipeId) => {
        return fetch(FETCH_URL + 'nutritionist/' + userId + '/recipes/' + recipeId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    };

    updateProfile = (nutritionist,_id) =>
        fetch(FETCH_URL+"nutritionist/"+_id, {
            method : 'put',
            body : JSON.stringify(nutritionist),
            headers : {
                'content-type' : 'application/json'
            }

        }).then(response=> {
            return response.json()
        })


    findEndorsedRecipes = (userID) => {
        return fetch(FETCH_URL + 'nutritionist/' + userID+'/recipes')
            .then(function(response){
                return response.json();
            });

    }
    findEndorsedRecipeId = (userID) => {
        return fetch(FETCH_URL + 'nutritionist/' + userID+'/recipeId')
            .then(function(response){
                return response.json();
            });
    }
}
