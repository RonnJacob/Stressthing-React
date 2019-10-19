import React from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from "react-router-dom";
import RegularUserServices from "../../services/RegularUserServices";
import RecipeCard from "../LandingPage/RecipeCard";
import '../../assets/landingpage/css/sidebar.css'
import FilterRecipes from "../Explore/FilterRecipes";
import '../Explore/Explore.css'
import MealDBServices from "../../services/MealDBServices";
import RecipeServices from "../../services/RecipeServices";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ReactTooltip from 'react-tooltip'
import {getFromStorage} from "../../utils/storage";
import UserServices from "../../services/UserServices";

class MyRecipes extends React.Component {
    constructor(props) {
        super(props);
        this.mealDBServices = new MealDBServices();
        this.regularUserServices = new RegularUserServices();
        const userId = props.match.params['userId'];
        this.recipeServices = new RecipeServices();
        this.userServices = new UserServices();
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
        document.title = "My Recipes";
        const obj = getFromStorage('project_april');
        if (obj && obj.token) {
            const { token } = obj;
            this.userServices.verifyUser(token).then(json => {
                if(!json.success){
                    window.location.href='/';
                }
                else if(json.success){
                    this.regularUserServices.findOwnRecipes(this.state.userId)
                        .then(recipes => {
                            this.setState
                            ({
                                recipes: recipes.meals ? recipes.meals : recipes
                            })
                        });
                }
            });
        }



    }

    componentDidMount() {
        this.mealDBServices.findAllCategories()
            .then(filterCategory => {
                this.setState
                ({filterCategory: filterCategory.meals})
            });
        this.regularUserServices.findOwnRecipes(this.state.userId)
            .then(recipes => {
                this.setState
                ({
                    unSortedRecipes: recipes.meals ? recipes.meals : recipes
                })
            });
    }

    handleClick = event => {
        return this.setState({
            currentPage: Number(event.target.id)
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


        // if()

        // this.mealDBServices.findRecipesByCategory(category)
        //     .then(recipes => {
        //
        //         this.setState
        //         ({
        //             recipes: recipes.meals,
        //             unsortedRecipes: recipes.meals
        //         })
        //     });
    }

    findRecipesByCuisine = (cuisine) => {
        this.mealDBServices.findRecipesByCuisines(cuisine)
            .then(recipes => {
                this.setState
                ({recipes: recipes.meals})
            });
    }


    // searchRecipe = (recipe) => {
    //     this.state.recipes.map(recipe => {
    //
    //
    //         this.setState
    //         ({recipes: recipes.meals})
    //         if (recipes.meals == null) {
    //             document.getElementById("food-area").innerHTML =
    //                 " <div class=\"no-results\">" +
    //                 "<h3>We searched all over but didn't " +
    //                 "find a recipe for '" + `${recipe}` + "'</h3>" +
    //
    //                 "<div class=\"no-results-suggestion\">" +
    //                 "<img src=\"https://x.yummlystatic.com/s/e3ccfc5a7/img/check_spelling.svg\">" +
    //                 "<span>Check Spelling</span></div><div class=\"no-results-suggestion\">" +
    //                 "<img src=\"https://x.yummlystatic.com/s/e3ccfc5a7/img/different_keywords.svg\">" +
    //                 "<span>Different Keywords</span></div><div class=\"no-results-suggestion\">" +
    //                 "<img src=\"https://x.yummlystatic.com/s/e3ccfc5a7/img/simplify_search.svg\">" +
    //                 "<span>Simplify Search</span></div></div>" +
    //                 "" +
    //                 " </PopularRecipes popularRecipes={" + this.state.popularRecipes + "}>"
    //
    //
    //         }
    //     });
    // }


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
        this.regularUserServices.findOwnRecipes(this.state.userId)
            .then(recipes => {
                this.setState
                ({
                    recipes: recipes.meals ? recipes.meals : recipes
                })
            });
    }

    deleteRecipe = (recipeId) => {
        this.recipeServices.deleteRecipe(recipeId)
            .then(() => {
                this.setState({
                    recipes: this.state.recipes.filter(function (recipe) {
                        return recipe._id !== recipeId;
                    })
                });
                this.regularUserServices.deleteOwnRecipe(this.state.userId, recipeId)
            });

    };


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

        const renderRecipes = currentRecipes.map(recipe => {
            return <RecipeCard popularRecipe={recipe} recipeOwner={recipe.ownedBy?recipe.ownedBy:"Anonymous"}
                               deleteRecipe={this.deleteRecipe} loggedIn={true}/>
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
                    &nbsp;&nbsp;&nbsp;<label className='hover-underline'></label>
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
                                        <h3>My <span>Recipes</span></h3>
                                         <p className="text-white link-nav"><Link className="text-white link-nav" to='/home'>Home </Link> <span
                                            className="lnr lnr-arrow-right"></span>
                                            <Link className="text-white link-nav" to={`/user/${this.state.userId}/myrecipes`}>My Recipes</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/*<div className="row">*/}
                            {/*<div className="col-lg-8 offset-lg-2">*/}
                            {/*<form action="#">*/}


                            {/*<div className="form-group has-search">*/}
                            {/*<span className="fa fa-search form-control-feedback"></span>*/}
                            {/*<input type="text" className="form-control"*/}
                            {/*placeholder="search a million recipes & more"*/}
                            {/*onChange={this.searchChanged}/>*/}
                            {/*</div>*/}

                            {/*<div className="table-btn text-center">*/}
                            {/*<a href="#" className="template-btn template-btn2 mt-4"*/}
                            {/*onClick={() => this.searchRecipe(this.state.searchRecipe)}>Go</a>*/}
                            {/*</div>*/}
                            {/*</form>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                        </div>
                    </section>
                </div>

                <section className="header">
                    <div className="row wrap">
                        <div className="split fleft">
                            <div className={"side-menu"}>
                                <div className="">

                                    <div className="sidebar-categories">
                                        <div className="head">Filter up your TasteBuds</div>
                                        <ul className="main-categories">


                                            {this.state.filterCategory.map(category =>
                                                <FilterRecipes category={category.strCategory}
                                                               findRecipesByCategory={this.findRecipesByCategory}
                                                               findRecipesByCuisine={this.findRecipesByCuisine}/>
                                            )}


                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="split fright">

                            {/*<div className="filter-bar d-flex flex-wrap align-items-center">*/}
                            {/*<div className="sorting">*/}

                            {/*</div>*/}
                            {/*<div className="sorting mr-auto">*/}

                            {/*</div>*/}
                            {/*<div className="pagination">*/}
                            {/*<a href="#" className="prev-arrow head" onClick={this.sortAscend}><i*/}
                            {/*className="fa fa-sort-alpha-asc"*/}
                            {/*aria-hidden="true"></i></a>*/}
                            {/*<a href="#" className="next-arrow head" onClick={this.sortDescend}><i*/}
                            {/*className="fa fa-sort-alpha-desc"*/}
                            {/*aria-hidden="true"></i></a>*/}

                            {/*<a href="#" onClick={this.resetSort}>reset</a>*/}

                            {/*</div>*/}
                            {/*</div>*/}

                            <div className="filter-bar d-flex flex-wrap align-items-center">
                                <div className="sorting">

                                </div>
                                <div className="sorting mr-auto">
                                    <div className="">

                                        <Link to="/addRecipe" id="addRecipe">  <FontAwesomeIcon
                                            icon="plus"
                                            className="fas fa-1x hand-cursor" style={{color:"black"}} data-tip='Add Recipe'/><a style={{color:"white",backgound:"orange",fontSize :"20px", fontFamily:"roboto"}} title="Add Recipe" className=""

                                                                                  aria-hidden="true">recipes</a>


			                    </Link>
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

                                <div className="container">
                                    <div className="row">
                                        {this.state.recipes && renderRecipes}
                                        <ul id="page-numbers" className="page-numbers">
                                            {renderPageNumbers}
                                        </ul>
                                    </div>
                                </div>
                                <Link to="/addRecipe" id="addRecipe"> <span
                                    className="fa-stack wd-bottom-right hand-cursor"> <i title="Add Recipe" className="fa fa-plus-circle fa-4x"
                                                                                         aria-hidden="true"/>

                                                                                         {/*<FontAwesomeIcon*/}
                                    {/*icon="plus"*/}
                                    {/*className="fas fa-2x hand-cursor" data-tip='Add Recipe'/>*/}
			                    </span></Link>



                            </div>
                        </div>
                    </div>
                </section>
                <ReactTooltip/>
            </div>
        )
    }
}

export default MyRecipes;
