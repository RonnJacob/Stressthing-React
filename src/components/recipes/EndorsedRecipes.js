import React from 'react'

import RegularUserServices from "../../services/RegularUserServices";
import RecipeCard from "../LandingPage/RecipeCard";
import GuestNav from "../LandingPage/GuestNav";
import '../../assets/landingpage/css/sidebar.css'
import FilterRecipes from "../Explore/FilterRecipes";
import '../Explore/Explore.css'
import HomePageNav from "../HomePageNav/HomePageNav";
import MealDBServices from "../../services/MealDBServices";
import {Link} from "react-router-dom";
import ChefServices from "../../services/ChefServices";
import {getFromStorage} from "../../utils/storage";
import UserServices from "../../services/UserServices";

class EndorsedRecipes extends React.Component {
    constructor(props) {
        super(props);
        this.mealDBServices = new MealDBServices();
        this.chefServices = new ChefServices();
        this.userServices = new UserServices();
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
            userId: userId
        };
        //this.searchRecipe = this.searchRecipe.bind(this);
    }

    componentWillMount() {
        document.title = "Endorsed Recipes";
        var endorsed = [];
        this.chefServices.findEndorsedRecipes(this.state.userId)
            .then(recipes => {
                recipes.map(recipe => {
                        console.log("Inside the map Recipe = " + recipe.name)
                        endorsed = [...endorsed, recipe]
                        console.log("Inside the map Array of recipes = " + endorsed.length)
                    }
                )
            }).then(() => this.chefServices.findEndorsedRecipeId(this.state.userId))
            .then(recipeIds => {
                recipeIds.map(recipeId => {
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
                                endorsed = [...endorsed, recipeFound]

                                endorsed = endorsed.filter(function (a) {
                                    return !this[a._id] && (this[a._id] = true);
                                }, Object.create(null));


                            }).then(() => {
                            //alert(finalFavorites.length)
                            this.setState({
                                recipes: endorsed
                            })
                        });
                    }
                })

            })


        const obj = getFromStorage('project_april');
        if (obj && obj.token) {
            const { token } = obj;
            this.userServices.verifyUser(token).then(json => {
                if(!json.success){
                    window.location.href='/';
                }
                else if(json.success){
                    this.chefServices.findEndorsedRecipes(this.state.userId)
                        .then(recipes => {
                            this.setState
                            ({
                                recipes: recipes.meals?recipes.meals:recipes
                            })
                        });
                }
            });
        }
    }

    componentDidMount() {

        var endorsed = [];
        this.chefServices.findEndorsedRecipes(this.state.userId)
            .then(recipes => {
                recipes.map(recipe => {
                        console.log("Inside the map Recipe = " + recipe.name)
                        endorsed = [...endorsed, recipe]
                        console.log("Inside the map Array of recipes = " + endorsed.length)
                    }
                )
            }).then(() => this.chefServices.findEndorsedRecipeId(this.state.userId))
            .then(recipeIds => {
                recipeIds.map(recipeId => {
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
                                endorsed = [...endorsed, recipeFound]

                                endorsed = endorsed.filter(function (a) {
                                    return !this[a._id] && (this[a._id] = true);
                                }, Object.create(null));


                            }).then(() => {
                            //alert(finalFavorites.length)
                            this.setState({
                                unSortedRecipes: endorsed
                            })
                        });
                    }
                })

            })

    }

    handleClick = event => {
        return this.setState({
            currentPage: Number(event.target.id)
        })
    }


    findRecipesByCategory = (category) => {
        var filteredresult=[];
        this.chefServices.findEndorsedRecipes('5cb93fa8d765b8de30a1ace2')
            .then(recipes => {
                recipes.map(recipe=>{
                    if(recipe.strCategory?recipe.strCategory===category:(recipe.category===category))
                        filteredresult.push(recipe);
                })
                this.setState
                ({
                    recipes: filteredresult
                })
            });
    }

    findRecipesByCuisine = (cuisine) => {
        this.mealDBServices.findRecipesByCuisines(cuisine)
            .then(recipes => {
                this.setState
                ({recipes: recipes.meals})
            });
    }


    compareAsc(a, b) {
        // Use toUpperCase() to ignore character casing
        const recipeA = a.strMeal?a.strMeal.toUpperCase():a.name.toUpperCase();
        const recipeB = b.strMeal?b.strMeal.toUpperCase():b.name.toUpperCase();

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
        const recipeA = a.strMeal?a.strMeal.toUpperCase():a.name.toUpperCase();
        const recipeB = b.strMeal?b.strMeal.toUpperCase():b.name.toUpperCase();

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
        var endorsed = [];
        this.chefServices.findEndorsedRecipes(this.state.userId)
            .then(recipes => {
                recipes.map(recipe => {
                        console.log("Inside the map Recipe = " + recipe.name)
                        endorsed = [...endorsed, recipe]
                        console.log("Inside the map Array of recipes = " + endorsed.length)
                    }
                )
            }).then(() => this.chefServices.findEndorsedRecipeId(this.state.userId))
            .then(recipeIds => {
                recipeIds.map(recipeId => {
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
                                endorsed = [...endorsed, recipeFound]

                                endorsed = endorsed.filter(function (a) {
                                    return !this[a._id] && (this[a._id] = true);
                                }, Object.create(null));


                            }).then(() => {
                            //alert(finalFavorites.length)
                            this.setState({
                                recipes: endorsed
                            })
                        });
                    }
                })

            })

    }




    render() {
        const {recipes, currentPage, recipesPerPage} = this.state;

        // Logic for displaying todos
        const indexOfLastRecipe = currentPage * recipesPerPage;
        const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
        const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

        const renderRecipes = currentRecipes.map(recipe => {
            return <RecipeCard popularRecipe={recipe} recipeOwner={recipe.ownedBy?recipe.ownedBy:"Anonymous"} loggedIn={true}/>
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(recipes.length / recipesPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li className='horizontal-li'
                    key={number}
                    id={number}
                    onClick={this.handleClick}>
                    &nbsp;&nbsp;&nbsp;<label className='hover-underline'>{number}</label>
                </li>
            );
        });

        return (

            <div>
                {/*<LandingPageHeader/>*/}
                <div id="header">
                    {/*<HomePageNav/>*/}
                </div>
                <div>
                    <section className="table-area section-padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section-top2 text-center">
                                        <h3>My <span>Endorsed</span> recipes</h3>
                                        <p className="text-white link-nav"><Link className="text-white link-nav" to={`/home`}>Home </Link> <span
                                            className="lnr lnr-arrow-right"></span>
                                            <Link className="text-white link-nav" to={`/chef/${this.state.userId}/endorsedRecipes`}>My Endorsed Recipes</Link>

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


                                    </div>
                                </div>


                                <div className="pagination">
                                    <a href="#" className="prev-arrow head" onClick={this.sortAscend}><i className="fa fa-sort-alpha-asc"
                                                                                                         aria-hidden="true"></i></a>
                                    <a href="#" className="next-arrow head" onClick={this.sortDescend}><i className="fa fa-sort-alpha-desc"
                                                                                                          aria-hidden="true"></i></a>

                                    <a href="#" onClick={this.resetSort}>reset</a>
                                </div>
                            </div>


                            <div className="food-area " id={"food-area"}>

                                <div className="container">
                                    <div className="row">
                                        {this.state.recipes && renderRecipes}
                                        <ul id="page-numbers" className="page-numbers">
                                            {/*{renderPageNumbers}*/}
                                        </ul>
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

export default EndorsedRecipes;
