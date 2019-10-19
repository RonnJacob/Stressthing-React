import React, {Component} from 'react'
import '../../assets/css/linearicons.css'
import '../../assets/css/font-awesome.min.css'
import '../../assets/css/magnific-popup.css'
import '../../assets/css/nice-select.css'
import '../../assets/css/animate.min.css'
import '../../assets/css/main.css'
import './HomePage.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../assets/css/bootstrap.css'
import HomePageNav from "../HomePageNav/HomePageNav";
import UserServices from '../../services/UserServices'
import {getFromStorage} from '../../utils/storage';
import RegisterPage from "../WhatsCooking";
import Ingredients from "../ingredients/Ingredients";
import AddIngredient from "../ingredients/AddIngredient";
import AddRecipe from "../recipes/AddRecipe";
import Profile from "../Profile";
import IngredientServices from "../../services/IngredientServices";
import RecipeServices from "../../services/RecipeServices";
import RecipeDetails from "../recipes/RecipeDetails";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

class HomePage extends  Component {
    constructor(props){
        super(props);
        const obj =  getFromStorage('project_april');
        this.state = {
            user: obj.user[0],
            userId: obj.user[0]._id,
            ingredients: []};
        this.userServices = new UserServices();
        this.ingredientService = new IngredientServices();
        this.recipeService = new RecipeServices();
    }

    componentWillMount() {
        const obj = getFromStorage('project_april');
        if (obj && obj.token) {
            const { token } = obj;
            this.userServices.verifyUser(token).then(json => {
                    if(!json.success){
                        window.location.href='/';
                        console.log('loggedin');
                    }
                    else if (json.success) {
                        this.ingredientService.findIngredientsByUser(obj.user[0]._id)
                            .then(ingredients => {
                                // alert("updated"+courses.length)
                                this.setState({
                                    ingredients: ingredients,
                                    token,
                                    user: obj.user[0]
                                })
                            });
                    }
                    else{

                    }
                });
        }
    }




    logOut = () => {
        const obj = getFromStorage('project_april');
        if (obj && obj.token) {
            const { token } = obj;
            this.userServices.logOutUser(token)
                .then(json => {
                    console.log(json);
                    if (json.success) {
                        this.setState({
                            token: ''
                        });
                    }
                });
        }
    };


    render(){
        return (
            <div id="home-page">
                <div id="header">
                    <HomePageNav user={this.state.user} logOut={this.logOut}/>
                </div>
                <section className="banner-area home-page">
                    <div className="container">
                        <div className="row fullscreen align-items-center justify-content-between">
                            <div className="col-lg-12 banner-content">
                                <h1 className="text-white">Hi {this.state.user ?
                                    this.state.user.firstName: this.props.location.state.user.firstName}!
                                    What's Cooking?</h1>
                                {this.state.user.userType==='REGULAR' && <p className="text-white">
                                    Here is your one stop solution to find recipes that best match the ingredients in
                                    h
                                    and.<br/>
                                    What's Cooking? makes your life easier by helping you decide what to cook based on
                                    the ingredients you have in hand.
                                    You no longer have to surf various websites to find the "perfect" recipe.
                                </p>}
                                {this.state.user.userType==='CHEF' && <p className="text-white">
                                    Thank you for joining us!<br/> Explore on our recipes and endorse the one's you find the best tasty!<br/>
                                    All your followers would love to learn and experiment a lot of your signature recipes. Go ahead and help them lead a tasty life.
                                </p>}
                                {this.state.user.userType==='NUTRITIONIST' && <p className="text-white">
                                    Thank you for joining us!<br/> Explore on our recipes and endorse the one's you find the best tasty!<br/>
                                    All your followers would love to lead a healthy and hence happy life!! Go ahead and help them lead a healthier life with your endorsements.
                                </p>}
                                {this.state.user.userType==='REGULAR' && <h5 className="text-white">Get results in just two easy steps!</h5>}
                                <br/>
                                {this.state.user.userType==='REGULAR' && <p className="text-white">Step 1: Add the Ingredients</p>}
                                {this.state.user.userType==='REGULAR' && <p className="text-white">Step 2: Well! Everything is done, just get recipes in a single click</p>}

                                {this.state.user.userType==='REGULAR' &&
                                <button type="button"
                                        className="primary-btn text-uppercase mt-3"
                                        onClick={()=>window.location.href=`/user/${this.state.userId}/findRecipes`}
                                        id="prepare"
                                        style={{marginBottom:'20px'}}>
                                    Let's Cook!
                                </button>}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }



}
export default HomePage
