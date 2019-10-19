import React from 'react'

import RegularUserServices from "../../services/RegularUserServices";
import RecipeCard from "../LandingPage/RecipeCard";
import '../../assets/landingpage/css/sidebar.css'
import '../Explore/Explore.css'
import MealDBServices from "../../services/MealDBServices";
import RecipeServices from "../../services/RecipeServices";
import {getFromStorage} from "../../utils/storage";
import UserServices from "../../services/UserServices";
import {Link} from "react-router-dom";
import {NoResults} from "../LandingPage/NoResults";

class SearchRecipesByIngredients extends React.Component {
    constructor(props) {
        super(props);
        this.mealDBServices = new MealDBServices();
        this.regularUserServices = new RegularUserServices();
        this.recipeServices = new RecipeServices();
        this.userServices=new UserServices()
        this.state = {
            ingredients: [],
            userId: this.props.match.params.userId,
            recipes: [],
            searchAttempted:false
        };

        //this.searchRecipe = this.searchRecipe.bind(this);

    }

    componentWillMount() {
        document.title = "Find Recipes";
        const obj = getFromStorage('project_april');
        if (obj && obj.token) {
            const { token } = obj;
            this.userServices.verifyUser(token).then(json => {
                if(!json.success){
                    window.location.href='/';
                }
                else if(json.success){
                    this.regularUserServices.findOwnIngredients(this.state.userId)
                        .then(ingredients => {
                            this.setState
                            ({
                                ingredients: ingredients
                            })
                        });
                }
            });
        }
    }


    handleClick = event => {
        return this.setState({
            currentPage: Number(event.target.id)
        })
    }

    findRecipesByIngredient = (ingredients) => {
        var foundRecipes = []
        ingredients.map(ingredient => {
            this.mealDBServices.findRecipesByIngredient(ingredient.name.toLowerCase()).then(
                r => {
                    r.meals&&r.meals.map(recipe => {
                            foundRecipes = [...foundRecipes, recipe];
                        }
                    )

                return foundRecipes;
                }
            ).then(recipes => {
                this.setState({
                    recipes: recipes,
                    searchAttempted:true
                })
            })
        })

                this.setState({

                    searchAttempted:true
                })

    }

    findAllCuisines = () => {
        this.mealDBServices.findAllCuisines()
            .then(filterCategory => {
                this.setState
                ({filterCategory: filterCategory.meals})
            });
    }

    findAllCategories = () => {
        this.mealDBServices.findAllCategories()
            .then(filterCategory => {
                this.setState
                ({filterCategory: filterCategory.meals})
            });
    }

    findRecipesByCategory = (category) => {
        var filteredresult = [];
        // var recipes=this.state.recipes;
        // this.setState
        // ({
        //     unsortedRecipes: recipes
        // })
        this.regularUserServices.findOwnRecipes(this.state.userId)
            .then(recipes => {
                recipes.map(recipe => {
                    if (recipe.strCategory ? recipe.strCategory === category : (recipe.category === category))
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
        if(this.state.searchAttempted)
            this.findRecipesByIngredient(this.state.ingredients)
        else{
            this.setState({
                    searchAttempted: false
                }
            )
        }

    }

    deleteRecipe = (recipeId) => {
        this.recipeServices.deleteRecipe(recipeId)
            .then(this.regularUserServices.deleteOwnRecipe(this.state.userId, recipeId)
                .then(this.regularUserServices.findOwnRecipes(this.state.userId)
                    .then(recipes => {
                        this.setState
                        ({
                            recipes: recipes.meals ? recipes.meals : recipes
                        })
                    })))
    }


    searchChanged = (event) => {
        this.setState(
            {
                searchRecipe: event.target.value
            });
    };

    render() {
        const {recipes, currentPage, recipesPerPage} = this.state;

        // Logic for displaying todos
        const indexOfLastRecipe = currentPage * recipesPerPage;
        const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
        const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

        const renderRecipes = this.state.recipes.map(recipe => {
            return <RecipeCard recipeOwner={recipe.ownedBy?recipe.ownedBy:"Anonymous"} popularRecipe={recipe}
                               deleteRecipe={this.deleteRecipe}
                               loggedIn={true}/>
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
                                        <h3>Find <span>Recipes</span></h3>
                                        <p><i>Time to get into a yummilicious world. <span>Click</span> on the <span>button</span> below to find recipes matching you grocery stock!</i></p>
                                        <p className="text-white link-nav"><Link className="text-white link-nav" to='/home'>Home </Link> <span
                                            className="lnr lnr-arrow-right"></span>
                                            <Link className="text-white link-nav" to={`/user/${this.state.user}/findrecipes`}>Let's Cook</Link>
                                        </p>
                                    </div>
                                    <div className="table-btn text-center">
                                        <a href="#" className="template-btn template-btn2 mt-4"
                                           onClick={() => this.findRecipesByIngredient(this.state.ingredients)}>Get Recipes</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <section className="header">
                    <div className="row wrap">
                        <div className="split fleft">
                            <div className={"side-menu"}>
                                <div className="">

                                    <div className="sidebar-categories">
                                        <div className="head">Available Groceries</div>
                                        <ul className="main-categories">


                                            {this.state.ingredients.map(ingredient =>
                                                <li className="main-nav-list child"><a href="#"

                                                                                       tabIndex="1">{ingredient.name}<span
                                                    className="number"></span></a></li>)
                                            }


                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="split fright">

                            <div className="filter-bar d-flex flex-wrap align-items-center">
                                <div className="sorting">

                                </div>
                                <div className="sorting mr-auto">
                                    <div className="pagination">


                                    </div>
                                </div>


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


                            <div className="food-area " id={"food-area"}>
                                {this.state.recipes.length==0 && this.state.searchAttempted &&<div className="no-results">
                                    <img width={"100px"}  src="https://cdn4.iconfinder.com/data/icons/emojis-flat-pixel-perfect/64/emoji-56-512.png"/>
                                    <h3>Ouch!! Add more to your bag of groceries to find a new world of super tasty recipes!</h3>
                                    <div className="no-results-suggestion">
                                        <img width={"100px"} src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Home_icon_black.png"/>
                                        <span>Go back Home</span>
                                    </div>
                                    <div className="no-results-suggestion">
                                        <img width={"100px"}  src="http://www.iconarchive.com/download/i87956/icons8/ios7/Ecommerce-Shopping-Cart-Loaded.ico"/>
                                        <span>Add Ingredients</span></div>
                                    <div className="no-results-suggestion">
                                        <img width={"100px"}src="https://static.thenounproject.com/png/1467471-200.png"/>
                                        <span>We'll be ready with your recipes</span></div>
                                    {/*</PopularRecipes popularRecipes={this.state.popularRecipes}>*/}
                                </div>}
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

export default SearchRecipesByIngredients;
