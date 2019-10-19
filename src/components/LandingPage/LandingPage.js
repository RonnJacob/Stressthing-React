import React, {Component} from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
// import '../../../node_modules/boot strap/dist/css/bootstrap.css'
import '../../assets/landingpage/css/style.css'
import '../../assets/landingpage/css/owl-carousel.min.css'
import '../../assets/landingpage/css/nice-select.css'
import '../../assets/landingpage/css/jquery.datetimepicker.min.css'
import '../../assets/landingpage/css/bootstrap-4.1.3.min.css'
import '../../assets/landingpage/css/animate-3.7.0.css'
import MealDBServices from '../../services/MealDBServices'
import RecipeCard from "./RecipeCard";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {LandingPageHeader} from "./LandingPageHeader";
import './LandingPage.css'

class LandingPage extends Component {
    constructor() {
        super();
        this.mealDBServices = new MealDBServices();
        this.state = {
            popularRecipes: []
        };
        // var recipes = this.findPopularRecipes();
        // console.log("Recipes"+recipes);


    }



    componentWillMount() {
        document.title = "What's Cooking?";
        this.mealDBServices.findPopularRecipes()
            .then(recipes =>{
                this.setState
                ({popularRecipes: recipes})
            });
    }



    render() {
        console.log(this.state.popularRecipes);
        return (
            <div>
                <div className="preloader">
                    <div className="spinner"></div>
                </div>

                <Router>
            <LandingPageHeader popularRecipes={this.state.popularRecipes}/>
                </Router>
                <section className="banner-area banner-area2 menu-bg text-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className='text-white'><i>We're live!!</i></h1>
                                <p className="pt-2"><i>What's Cooking is your smart cooking sidekick!!
                                    From healthy and yummy recipes to handy tools and helpful tips from great chefs, We
                                    have everything you need to improve life in the kitchen.</i></p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="food-area section-padding">
                    <div className="container">

                        <h1 className="wbdv-find-recipes text-center">Find the Perfect Recipe</h1>
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <h2 className="text-center">Sort &amp; Filter</h2>
                                    <p className="wbdv-app-info">Our unique search filters allow you to narrow down your search by your diet,
                                        cuisine, occasion, allergy, nutrition and more!
                                    </p>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <h2 className="text-center">Your Signature Recipes</h2>
                                    <p className="wbdv-app-info">Eant to make the world know the taste of your recipe? We let you add your signature recipes
                                    and get feedback from other fellow foodies, chefs and nutritionists!</p>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                <h2 className="text-center">Collect Your Favorites</h2>
                                    <p className="wbdv-app-info">Want to try cooking a lot of varieties? We bring to your reach a million recipes
                                    from fellow foodies, chefs and nutritionists!! Favorite the recipes of your choice and save time with this quick guide!! </p>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                <h2 className="text-center">
                                    Browse for Inspiration
                                </h2>
                                    <p className="wbdv-app-info">Not just that!! You can reach to a lot more popular recipes of world's most loved cuisines, ingredients and the best chefs.</p>
                                </div>
                            </div>
                                    <p className="features-section-description p2-text browse-description"><p
                                        title="Not Sure Where to Start? Browse Through Article Content to Read About Kitchen Tips, Trending Foods, and Recipe Roundups."
                                        aria-label="Not Sure Where to Start? Browse Through Article Content to Read About Kitchen Tips, Trending Foods, and Recipe Roundups."
                                        href="/dish">Not sure where to start? Browse through article content to read
                                        about kitchen tips, trending foods, and recipe roundups.</p>
                                    </p></div>
                    </div>
                </section>


                {/*//<!-- Banner Area End -->*/}

                {/*// <!--Food Area starts-->*/}

                <section className="table-area section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-top2 text-center">
                                    <h3>Just <span>for</span> you</h3>
                                    <p><i>Here we show you some of our most popular recipes!! Time to get into a yummilicious world.</i></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="food-area section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="section-top">
                                    <h3> <span className="style-change"> we
                                serve </span> <br/>delicious recipes to excite your appetite</h3>
                                    <p className="pt-3"> Every recipe you need for a fulfilling and tummy filling day is
                                        right here.</p>
                                </div>
                            </div>
                        </div>

                        <div className="row">

                            {
                                this.state.popularRecipes.meals &&
                                this.state.popularRecipes.meals.map(recipe =>
                                    <RecipeCard popularRecipe={recipe} recipeOwner={recipe.ownedBy?recipe.ownedBy:"Anonymous"} loggedIn={false}/>
                                )
                            }
                        </div>
                    </div>
                </section>
                {/*// <!-- Food Area End -->*/}

                {/*// <!-- Table Area Starts -->*/}

                {/*// <!-- Table Area End -->*/}
                {/*//*/}
                {/*// <!-- Footer Area Starts -->*/}
                    <div className="footer-widget section-padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="single-widget single-widget1">
                                        <a href="index.html"><img
                                            src={require("../../../src/assets/landingpage/images/logo/newlogo.png")}
                                            alt=""/></a>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="single-widget single-widget2 my-5 my-md-0">
                                        <h5 className="mb-4">contact us</h5>
                                        <div className="d-flex">
                                            <div className="into-icon">
                                                <i className="fa fa-map-marker"></i>
                                            </div>
                                            <div className="info-text">
                                                <p>1234 Some St Boston, MA 94102, US 1.800.123.4567 </p>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="into-icon">
                                                <i className="fa fa-phone"></i>
                                            </div>
                                            <div className="info-text">
                                                <p>(123) 456 78 90</p>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="into-icon">
                                                <i className="fa fa-envelope-o"></i>
                                            </div>
                                            <div className="info-text">
                                                <p>support@whatscooking.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

            </div>
        );
    }


}

export default LandingPage
