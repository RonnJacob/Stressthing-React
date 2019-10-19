$(document).ready(function () {
    createGroceryTable();
    createGroceryList();
    onLogoutHandler();
    onAddGroceryHandler();
    onhandleResultClick();
    generateResultList();
});


//logout handler function
function onLogoutHandler() {
    let logoutBtn = document.getElementById('logout_btn');
    if (logoutBtn === null) {
        return false;
    }
    else {
        logoutBtn.addEventListener('click', function () {
            localStorage.removeItem("profileCred");
            window.location.href = "./index.html";
        })
    }
}

// Create HTML for grocery list based on JSON
function createGroceryList() {
    let groceries_arr = JSON.parse(localStorage.getItem('groceries')) || [];
    const grocery_list = document.getElementById('grocery_list');
    if (grocery_list === null) {
        return false;
    }
    else {
        grocery_list.innerHTML = "";
        let groceryHTML = renderGroceryList(groceries_arr);
        grocery_list.innerHTML = groceryHTML;
    }
}

// Create HTML for grocery table based on JSON
function createGroceryTable() {
    let groceries_arr = JSON.parse(localStorage.getItem('groceries')) || [];
    const grocery_table = document.getElementById('grocery_table');
    if (grocery_table === null) {
        return false;
    }
    else {
        grocery_table.innerHTML = "";
        let groceryHTMLForTable = renderGroceryTable(groceries_arr);
        grocery_table.innerHTML = groceryHTMLForTable;
    }
}

//render grocery list for home page
function renderGroceryList(groceries) {
    let result = [];
    if (groceries !== null || groceries.length !== 0) {
        for (var i = 0; i < groceries.length; i++) {
            let grocery = groceries[i].ingredient;
            let res = [];
            res.push("<li>" + grocery + "</li>");
            result.push(res.join(""));
        }
    }
    else {
        return false;
    }
    return result.join("");

}

//render grocery table for ingredients page
function renderGroceryTable(groceries) {
    let result = [];
    let thead_title1 = "Ingredient";
    let thead_title2 = "Quantity";
    result.push("<thead><tr><th>" + thead_title1 + "</th>");
    result.push("<th>" + thead_title2 + "</th></tr></thead>");
    if (groceries !== null || groceries.length !== 0) {
        for (var i = 0; i < groceries.length; i++) {
            let grocery = groceries[i].ingredient;
            let qty = groceries[i].quantity;
            let res = [];
            res.push("<tbody><tr><td>" + grocery + "</td>");
            res.push("<td>" + qty + "</td></tr></tbody");
            result.push(res.join(""));
        }
        return result.join("");
    }
    else {
        return false;
    }
}

function onAddGroceryHandler() {
    const save_recipe_btn = document.getElementById('save_recipe');
    if (save_recipe_btn === null) {
        return false;
    }
    else {
        save_recipe_btn.addEventListener('click', function () {
            let ingredient_name = document.getElementById('ingredient_name');
            let ingredient_qty = document.getElementById('ingredient_qty');
            let ingredient_name_value = ingredient_name.value;
            let ingredient_qty_value = ingredient_qty.value;

            if ((ingredient_name_value.length === 0 ||
                ingredient_name_value === undefined ||
                ingredient_name_value === null) &&
                (
                    ingredient_qty_value === undefined ||
                    ingredient_qty_value === null ||
                    ingredient_qty_value.length === 0)
            ) {
                return false;
            }
            else {
                var groceries_array = JSON.parse(localStorage.getItem("groceries")) || [];
                groceries_array.push({'ingredient': ingredient_name_value, 'quantity': ingredient_qty_value});
                localStorage.setItem('groceries', JSON.stringify(groceries_array));
                createGroceryTable();
            }
        });
    }
}

function getIngredientSet(groceries_local_array) {
    let result = [];
    for (var i = 0; i < groceries_local_array.length; i++) {
        result.push(groceries_local_array[i].ingredient);
    }
    return result;
}

function returnRecipesWithinTime() {
    var recipe_list = [
        {
            "name": "French Toast", "time": '00:10',
            "ingredients": ['egg', 'bread'],
            "image": 'img/french-toast.jpg'
        },

        {
            "name": "Omellete", "time": '00:12',
            "ingredients": ['egg', 'bread', 'onion'],
            "image": 'img/omellete.jpg'
        },
        {
            "name": "Egg Sandwich", "time": '00:15',
            "ingredients": ['egg', 'bread'],
            "image": 'img/egg-sanwitch.jpg'
        },
        {
            "name": "Chicken Sandwich", "time": '00:20',
            "ingredients": ['chicken', 'bread'],
            "image": 'img/chicken-sandwich.jpg'
        },
        {
            "name": "Fried Chicken", "time": '00:30',
            "ingredients": ['chicken', 'lemon'],
            "image": 'img/fried-chicken.jpeg'
        },

        {
            "name": "Chicken Fried Rick", "time": '00:35',
            "ingredients": ['chicken', 'lemon', 'rice', 'onion'],
            "image": 'img/chicken-fried-rice.jpg'
        },
    ];

    var time_value = document.getElementById('time_input').value;
    let result = [];

    for (var i = 0; i < recipe_list.length; i++) {
        let recipe = recipe_list[i];
        if (time_value >= recipe.time) {
            result.push(recipe);
        }
    }
    return result;
}

function getRecipesBasedOnIngredients() {

    var list = JSON.parse(localStorage.getItem('groceries'));
    var recipe_list = returnRecipesWithinTime();
    var local_ingredients_list = getIngredientSet(list);
    var final_result = [];

    for (var i = 0; i < recipe_list.length; i++) {
        let recipe_obj = recipe_list[i];
        let ingredient_list = recipe_obj.ingredients;
        if ((ingredient_list.every(e => local_ingredients_list.includes(e))) === true) {
            final_result.push(recipe_obj);
        }
    }
    console.log(final_result);
    localStorage.setItem('final_result', JSON.stringify(final_result));
}

function onhandleResultClick() {
    let results_btn = document.getElementById('results_btn');
    if (results_btn === null) {
        return false;
    }
    else {
        results_btn.addEventListener('click', function () {
            getRecipesBasedOnIngredients();
            window.location.href = "./results.html";
        })
    }
}

//generate result list
function generateResultList() {
    let result_list = JSON.parse(localStorage.getItem('final_result')) || [];
    //localStorage.removeItem('final_result');
    var list_id = document.getElementById('result-list');
    if (list_id === null) {
        return false;
    }
    else {
        list_id.innerHTML = "";
        let resultHTML = renderResultRecipeList(result_list);
        list_id.innerHTML = resultHTML;
    }
}

function renderResultRecipeList(recipes) {
    let result = [];
    if (recipes !== null || recipes.length !== 0) {
        for (var i = 0; i < recipes.length; i++) {
            let recipe = recipes[i];
            let res = [];
            res.push("<li class='list-group-item'><div class='row'><div class='col-lg-6'>");
            res.push("<h2 class='mb-2'>" + recipe.name + "</h2>");
            res.push("<p style='font-weight: bold'>Ingredients Required </p>");
            res.push("<p>" + recipe.ingredients.join(", ") + "</p>");
            res.push("<p style='font-weight: bold'>Time Required</p>");
            res.push("<p style='font-weight: bold'>~ " + recipe.time + "</p></div>");
            res.push("<div class='col-lg-6'>");
            res.push("<img src=" + recipe.image + ">");
            res.push("</div>");
            res.push("</div>");
            res.push("</li>");
            result.push(res.join(""));
        }
    }
    else {
        return false;
    }
    return result.join("");
}
