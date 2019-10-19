export default class mealDBServices{


    findAllRecipes =(recipeName) =>{
        return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
            .then(function(response){
                return response.json();
            });
    };
    findPopularRecipes = () =>{
        return fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast')
            .then(function(response){
                             return response.json();
                         });
    }
    findRecipeByName =(recipeName) =>{
        return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+recipeName)
            .then(function(response){
                return response.json();
            });
    }
    findRecipeById =(recipeId) =>{
        return fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+recipeId)
            .then(function(response){
                return response.json();
            });
    }

    findRecipesByCategory =(category) =>{
        return fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c='+category)
            .then(function(response){
                return response.json();
            });
    }
    findRecipesByIngredient =(ingredient) =>{
        return fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i='+ingredient)
            .then(function(response){
                return response.json();
            });
    }

    findRecipesByCuisines =(cuisine) =>{
        return fetch('https://www.themealdb.com/api/json/v1/1/list.php?a='+cuisine)
            .then(function(response){
                return response.json();
            });
    }
    findAllCategories() {
        return fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=')
            .then(function(response){
                return response.json();
            });
    }
    findAllCuisines(){
        return fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=')
            .then(function(response){
                return response.json();
            });
    }
}


