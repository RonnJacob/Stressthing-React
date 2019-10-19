import React from 'react'

import RegularUserServices from "../../services/RegularUserServices";
import RecipeCard from "../LandingPage/RecipeCard";
import '../../assets/landingpage/css/sidebar.css'
import '../Explore/Explore.css'
import MealDBServices from "../../services/MealDBServices";
import {Link} from "react-router-dom";


class FavoriteRecipes extends React.Component {
    constructor(props) {
        super(props);
        this.mealDBServices = new MealDBServices();
        this.regularUserServices = new RegularUserServices();
        const userId = props.match.params['userId'];
        this.state = {
            recipes: [],
            unsortedRecipes: [],
            searchRecipe: '',
            popularRecipes: [],
            filterCategory: [],
            sorted: 0,
            currentPage: 1,
            recipesPerPage: 6,
            userId: userId,
            fav: []
        };
    }

    componentWillMount() {
        document.title = "Favorite Recipes";
        var favorites = [];
        this.regularUserServices.findFavoriteRecipes(this.state.userId)
            .then(recipes => {
                recipes.map(recipe => {
                        favorites = [...favorites, recipe];
                    }
                )
            })
            .then(() => this.regularUserServices.findFavoriteRecipeId(this.state.userId)
            .then(recipeIds => {
                recipeIds.map(recipeId => {
                    console.log()
                    if (recipeId.length === 5) {
                        this.mealDBServices.findRecipeById(recipeId)
                            .then(recipeFromAPI => {
                                let recipeFound = {};
                                recipeFound._id=recipeFromAPI.meals[0].idMeal;
                                recipeFound.name = recipeFromAPI.meals[0].strMeal
                                recipeFound.ingredients = recipeFromAPI.meals[0].strIngredient1 + ',' +
                                    recipeFromAPI.meals[0].strIngredient2 + ',' +
                                    recipeFromAPI.meals[0].strIngredient3 + ',' +
                                    recipeFromAPI.meals[0].strIngredient4 + ',' +
                                    recipeFromAPI.meals[0].strIngredient5
                                recipeFound.steps = recipeFromAPI.meals[0].strInstructions
                                recipeFound.image = recipeFromAPI.meals[0].strMealThumb
                                recipeFound.endorsedByChef = []
                                recipeFound.endorsedByNutritionist = []
                                recipeFound.ownedBy = "Anonymous"
                                recipeFound.category = "Miscellaneous"
                                favorites = [...favorites, recipeFound]
                                favorites = favorites.filter(function (a) {
                                    return !this[a._id] && (this[a._id] = true);
                                }, Object.create(null));
                            }).then(() => {
                            this.setState({
                                recipes: favorites
                            });
                        });
                    }
                })
            }));
    }




    componentDidMount() {
        var favorites = [];
        this.mealDBServices.findAllCategories()
            .then(filterCategory => {
                this.setState
                ({filterCategory: filterCategory.meals})
            });
        this.regularUserServices.findFavoriteRecipes(this.state.userId)
            .then(recipes => {
                recipes.map(recipe => {
                        favorites = [...favorites, recipe]
                 }
                )
            }).then(() => this.regularUserServices.findFavoriteRecipeId(this.state.userId))
            .then(recipeIds => {
                recipeIds.map(recipeId => {
                    if (recipeId.length === 5) {
                        this.mealDBServices.findRecipeById(recipeId)
                            .then(recipeFromAPI => {
                                let recipeFound = {};
                                recipeFound._id=recipeFromAPI.meals[0].idMeal;
                                recipeFound.id=recipeFromAPI.meals[0].idMeal;
                                recipeFound.name = recipeFromAPI.meals[0].strMeal
                                recipeFound.ingredients = recipeFromAPI.meals[0].strIngredient1 + ',' +
                                    recipeFromAPI.meals[0].strIngredient2 + ',' +
                                    recipeFromAPI.meals[0].strIngredient3 + ',' +
                                    recipeFromAPI.meals[0].strIngredient4 + ',' +
                                    recipeFromAPI.meals[0].strIngredient5
                                recipeFound.steps = recipeFromAPI.meals[0].strInstructions
                                recipeFound.image = recipeFromAPI.meals[0].strMealThumb
                                recipeFound.endorsedByChef = []
                                recipeFound.endorsedByNutritionist = []
                                recipeFound.ownedBy = "Anonymous"
                                recipeFound.category = "Miscellaneous"
                                recipeFound.idMeal = recipeFromAPI.meals[0].idMeal
                                recipeFound._id = recipeFromAPI.meals[0].idMeal
                                favorites = [...favorites, recipeFound]

                                favorites = favorites.filter(function (a) {
                                    return !this[a._id] && (this[a._id] = true);
                                }, Object.create(null));


                            }).then(() => {
                            //alert(finalFavorites.length)
                            this.setState({
                                unSortedRecipes: favorites
                            })
                        });
                    }
                })

            })

    }




    compareAsc(a, b) {
        // Use toUpperCase() to ignore character casing
        const recipeA = a.strMeal ? a.strMeal.toUpperCase() : a.name.toUpperCase();
        const recipeB = b.strMeal ? b.strMeal.toUpperCase() : b.name.toUpperCase();

        let comparison = 0;
        if (recipeA > recipeB) {
            comparison = 1;
        } else if (recipeA < recipeB) {
            comparison = -1;
        }
        return comparison;
    }

    compareDesc(a, b) {
        // Use toUpperCase() to ignore character casing
        const recipeA = a.strMeal ? a.strMeal.toUpperCase() : a.name.toUpperCase();
        const recipeB = b.strMeal ? b.strMeal.toUpperCase() : b.name.toUpperCase();

        let comparison = 0;
        if (recipeA > recipeB) {
            comparison = 1;
        } else if (recipeA < recipeB) {
            comparison = -1;
        }
        return comparison * -1;
    }

    sortAscend = () => {
        var unsortedRecipes = this.state.recipes;
        const sortedRecipes = unsortedRecipes.sort(this.compareAsc);

        this.setState
        ({
            recipes: sortedRecipes,
            sorted: 1
        })
        this.mealDBServices.findAllRecipes()
            .then(recipes => {
                this.setState
                ({

                    unsortedRecipes: recipes.meals
                })
            });

    };

    sortDescend = () => {
        var dummy = this.state.recipes;
        // const unsortedRecipes=this.state.recipes;
        console.log()
        const sortedRecipes = dummy.sort(this.compareDesc);

        this.setState
        ({
            recipes: sortedRecipes,
            sorted: 1
        })
        this.mealDBServices.findAllRecipes()
            .then(recipes => {
                this.setState
                ({

                    unsortedRecipes: recipes.meals
                })
            });


    };

    resetSort = () => {

        var favorites = [];
        // this.mealDBServices.findAllCategories()
        //     .then(filterCategory => {
        //         this.setState
        //         ({filterCategory: filterCategory.meals})
        //     });
        this.regularUserServices.findFavoriteRecipes(this.state.userId)
            .then(recipes => {
                recipes.map(recipe => {
                        console.log("Inside the map Recipe = " + recipe.name)
                        favorites = [...favorites, recipe]
                        console.log("Inside the map Array of recipes = " + favorites.length)
                    }
                )
            }).then(() => this.regularUserServices.findFavoriteRecipeId(this.state.userId))
            .then(recipeIds => {
                recipeIds.map(recipeId => {
                    if (recipeId.length === 5) {
                        this.mealDBServices.findRecipeById(recipeId)
                            .then(recipeFromAPI => {
                                let recipeFound = {};
                                recipeFound._id=recipeFromAPI.meals[0].idMeal;
                                recipeFound.id=recipeFromAPI.meals[0].idMeal;
                                recipeFound.name = recipeFromAPI.meals[0].strMeal
                                recipeFound.ingredients = recipeFromAPI.meals[0].strIngredient1 + ',' +
                                    recipeFromAPI.meals[0].strIngredient2 + ',' +
                                    recipeFromAPI.meals[0].strIngredient3 + ',' +
                                    recipeFromAPI.meals[0].strIngredient4 + ',' +
                                    recipeFromAPI.meals[0].strIngredient5
                                recipeFound.steps = recipeFromAPI.meals[0].strInstructions
                                recipeFound.image = recipeFromAPI.meals[0].strMealThumb
                                recipeFound.endorsedByChef = []
                                recipeFound.endorsedByNutritionist = []
                                recipeFound.ownedBy = "Anonymous"
                                recipeFound.category = "Miscellaneous"
                                recipeFound.idMeal = recipeFromAPI.meals[0].idMeal
                                recipeFound._id = recipeFromAPI.meals[0].idMeal
                                favorites = [...favorites, recipeFound]

                                favorites = favorites.filter(function (a) {
                                    return !this[a._id] && (this[a._id] = true);
                                }, Object.create(null));


                            }).then(() => {
                            //alert(finalFavorites.length)
                            this.setState({
                                recipes: favorites
                            })
                        });
                    }
                })

            })
    }


    render() {
        return (

            <div>
                {/*<LandingPageHeader/>*/}
                <div id="header">
                    {/*<HomePageNav/>*/}
                </div>
                <div>
                    <section className="table-area section-padding">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section-top2 text-center">
                                        <h3>My <span>Favorite</span> recipes</h3>

                                        <p className="text-white link-nav"><Link className="text-white link-nav"
                                                                                 to={`/home`}>Home </Link> <span

                                            className="lnr lnr-arrow-right"></span>
                                            <Link className="text-white link-nav"
                                                  to={`/user/${this.state.userId}/favorites`}> Favorite Recipes</Link>


                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <section className="header">
                    <div className="row">

                        <div className="container-fluid">
                            <div className="filter-bar d-flex flex-wrap align-items-center">
                                <div className="sorting">

                                </div>
                                <div className="sorting mr-auto">
                                    <div className="pagination">
                                        <a href="#" className="prev-arrow head" onClick={this.sortAscend}><i
                                            className="fa fa-sort-alpha-asc"
                                            aria-hidden="true"></i></a>
                                        <a href="#" className="next-arrow head" onClick={this.sortDescend}><i
                                            className="fa fa-sort-alpha-desc"
                                            aria-hidden="true"></i></a>

                                        <a href="#" onClick={this.resetSort}>reset</a>

                                    </div>
                                </div>
                            </div>
                            <div className="food-area " id={"food-area"}>
                                <div className="container">
                                    <div className="row">
                                        {
                                            (this.state.recipes)
                                            &&(this.state.recipes.map(recipe =>
                                                    <RecipeCard popularRecipe={recipe} recipeOwner={recipe.ownedBy?recipe.ownedBy:"Anonymous"} loggedIn={!!this.state.userId}/>)
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default FavoriteRecipes;
