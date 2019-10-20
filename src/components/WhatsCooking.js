  import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import RegisterPage from "./RegisterPage/RegisterPage";
import LandingPage from "./LandingPage/LandingPage";
import ExploreRecipes from "./Explore/ExploreRecipes";
import LoginPage from "./LoginPage/LoginPage";
import FavoriteRecipes from "./recipes/FavoriteRecipes"
import RecipeDetails from "./recipes/RecipeDetails";
import MyRecipes from "./recipes/MyRecipes";

import MealDBServices from "../services/MealDBServices";

import SearchRecipesByIngredients from "./recipes/SearchRecipesByIngredients";
import EndorsedRecipes from "./recipes/EndorsedRecipes";
import IngredientServices from "../services/IngredientServices";
import AddIngredient from "./ingredients/AddIngredient";
import Ingredients from "./ingredients/Ingredients";
import Profile from "./Profile";
import StressLandingPage from './StressLandingPage/StressLandingPage';
import Insights from './Insights/Insights';
import Log from './Log/Log';
import AddRecipe from "./recipes/AddRecipe";

import EndorsedRecipesNutritionist from "./recipes/EndorsedRecipesNutritionist";

import RecipeServices from "../services/RecipeServices";
import {getFromStorage} from "../utils/storage";


class WhatsCooking extends Component{
    constructor(props){
        super(props);
        this.mealDBServices = new MealDBServices();
        this.ingredientService = new IngredientServices();
        this.recipeService = new RecipeServices();
        this.state = {
            popularRecipes: []
        };
    }


    componentWillMount() {
        this.mealDBServices.findPopularRecipes()
            .then(recipes =>{
                this.setState
                ({popularRecipes: recipes})
            });
    }

    addIngredient = (ingredient) => {
        this.ingredientService.addIngredient(ingredient)
            .then(() => this.ingredientService.findIngredientsByUser(this.state.userId))
            .then(ingredients =>
                this.setState({
                    ingredients: ingredients
                }))
            .then(() => {
                window.location.href = `/ingredients`
            })
    };

    addRecipe = (recipe) => {
        this.recipeService.addRecipe(recipe)
            .then(() => {
                // alert('Recipe Added Successfully!');
                const obj = getFromStorage('project_april');
                window.location.href = `/user/${obj.user[0]._id}/myrecipes`
            })
    };

    deleteIngredient = (recipeId) => {
        this.recipeService.deleteRecipe(recipeId)
            .then(() => alert('Recipe Deleted Successfully!'))
    };


    render(){

        return (
            <div id="landing-page" style={{height: '100%'}}>
                <Router>
                    <Switch>
                    <Route path='/' exact component={LoginPage}/>
                    <Route path='/explore-recipes' component={ExploreRecipes}/>

                    <Route path='/user/:userId/favorites' component={(props) =>
                               <FavoriteRecipes
                                   userId={`5cb93fa8d765b8de30a1ace2`}
                                   {...props}/>}/>
                    <Route path='/user/:userId/myrecipes'
                           component={(props) =>
                               <MyRecipes
                                   {...props}/>}/>

                    <Route path='/chef/:userId/endorsedRecipes'
                           component={(props) =>
                               <EndorsedRecipes
                                   {...props}/>}/>
                        <Route path='/nutritionist/:userId/endorsedRecipes'
                               component={(props) =>
                                   <EndorsedRecipesNutritionist
                                       {...props}/>}/>
                    <Route path='/user/:userId/findRecipes'
                           component={(props) =>
                               <SearchRecipesByIngredients
                                   {...props}/>}/>
                    <Route path="/addIngredient"
                           render={() =>
                               <AddIngredient
                                   addIngredient={this.addIngredient}/>}/>
                    <Route path="/recipes/:recipeId"
                           component={(props) =>
                               <RecipeDetails
                                   {...props}/>}/>
                    <Route path='/ingredients' exact
                           component={(props) =>
                               <Ingredients
                                   {...props}/>}/>
                    <Route path='/profile/:userType/:userId' exact
                           component={(props) =>
                               <Profile
                                   {...props}/>}/>
                   <Route path="/addRecipe"
                           render={() =>
                               <AddRecipe
                                   addRecipe={this.addRecipe}/>}/>

                    <Route path='/home' component={HomePage}/>
                    <Route path="/login" exact component={LoginPage}/>
                    <Route path="/landingp" exact component={StressLandingPage}/>
                    <Route path="/landingpage" exact component={LandingPage}/>
                    <Route path="/register" exact component={RegisterPage}/>
                    <Route path="/insights" exact component={Insights}/>
                    <Route path="/log" exact component={Log}/>
                    </Switch>
                </Router>
                {/*<MainApp/>*/}
            </div>
        )
    }
}

export default WhatsCooking;
