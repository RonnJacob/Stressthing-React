import React from 'react'

import MealDBServices from "../../services/MealDBServices";
import RecipeCard from "../LandingPage/RecipeCard";
import GuestNav from "../LandingPage/GuestNav";
import FilterRecipes from "./FilterRecipes";
import './Explore.css'
import {getFromStorage} from "../../utils/storage";
import UserServices from "../../services/UserServices";
import {NoResults} from "../LandingPage/NoResults";
import {Link} from "react-router-dom";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import RecipeServices from "../../services/RecipeServices";
import '../../assets/landingpage/css/sidebar.css'

class ExploreRecipes extends React.Component {
    constructor(props) {
        super(props);
        this.mealDBServices = new MealDBServices();
        this.recipeServices = new RecipeServices();
        const obj = getFromStorage('project_april');


        this.state = {
            recipes: [],
            unsortedRecipes: [],
            searchRecipe: '',
            popularRecipes: [],
            filterCategory: [],
            sorted: 0,
            currentPage: 1,
            loggedIn: false,
            user: obj &&obj.user[0] ? obj.user[0] : '',
            userId: obj&&obj.user[0]._id ? obj.user[0]._id : '',
            recipesPerPage: 6,
            searched: ''
        };
        this.searchRecipe = this.searchRecipe.bind(this);
        this.userServices = new UserServices();

    }

    componentWillMount() {
        document.title = "Explore Recipes";
        const obj = getFromStorage('project_april');
        this.mealDBServices.findAllRecipes()
            .then(recipes => {
                this.setState({
                    recipes: recipes.meals
                })
            });
        if (obj && obj.token) {
            const {token} = obj;
            this.userServices.verifyUser(token).then(json => {
                console.log(json);
                if (json.success) {
                    let allRecipes = [];
                    this.setState({
                        loggedIn: true
                    })
                    this.mealDBServices.findAllRecipes()
                        .then(recipes => {
                            recipes.meals.map(recipe => {
                                    allRecipes = [...allRecipes, recipe];
                                    console.log("After API count" + allRecipes.length)
                                }
                            )
                        })
                        .then(() => this.recipeServices.findAllRecipes()
                            .then(recipeFromDb => {
                                recipeFromDb.map(eachRecipeFromDb => {
                                    let recipeFound = {};
                                    recipeFound.idMeal = eachRecipeFromDb._id;

                                    recipeFound.strMeal = eachRecipeFromDb.name
                                    var ingr=[];
                                    ingr=(recipeFromDb.ingredients&&recipeFromDb.ingredients.length>0)?recipeFromDb.ingredients.split(','):[]
                                    if(ingr.length>0){
                                        recipeFound.strIngredient1 = ingr[0]
                                        ingr.length>1?recipeFound.strIngredient2= ingr[0]:recipeFound.strIngredient2=''
                                        ingr.length>2?recipeFound.strIngredient3 = ingr[0]:recipeFound.strIngredient3=''
                                        ingr.length>3?recipeFound.strIngredient4= ingr[0]:recipeFound.strIngredient4=''
                                        ingr.length>4?recipeFound.strIngredient5 = ingr[0]:recipeFound.strIngredient5=''
                                    }
                                    recipeFound.strInstructions = eachRecipeFromDb.steps
                                    recipeFound.strMealThumb = eachRecipeFromDb.image
                                    recipeFound.endorsedByChef = eachRecipeFromDb.endorsedByChef
                                    recipeFound.endorsedByNutritionist = eachRecipeFromDb.endorsedByNutritionist
                                    recipeFound.ownedBy = eachRecipeFromDb.ownedBy
                                    recipeFound.strCategory = "Miscellaneous"
                                    allRecipes = [...allRecipes, recipeFound]
                                    console.log("After db count" + allRecipes.length)
                                })

                            }).then(() => {
                                this.setState({
                                    recipes: allRecipes
                                });
                            })
                        )}
            })
        }
    }


    componentDidMount() {
        this.mealDBServices.findAllCategories()
            .then(filterCategory => {
                this.setState
                ({filterCategory: filterCategory.meals})
            });
        let allRecipes = [];
        this.mealDBServices.findAllRecipes()
            .then(recipes => {
                recipes.meals.map(recipe => {
                        allRecipes = [...allRecipes, recipe];
                        console.log("After API count" + allRecipes.length)
                    }
                )
            })
            .then(() => this.recipeServices.findAllRecipes()
                .then(recipeFromDb => {
                    recipeFromDb.map(eachRecipeFromDb => {
                        let recipeFound = {};
                        recipeFound.idMeal = eachRecipeFromDb._id;

                        recipeFound.strMeal = eachRecipeFromDb.name
                        var ingr=[];
                        ingr=(recipeFromDb.ingredients&&recipeFromDb.ingredients.length>0)?recipeFromDb.ingredients.split(','):[]
                        if(ingr.length>0){
                            recipeFound.strIngredient1 = ingr[0]
                            ingr.length>1?recipeFound.strIngredient2= ingr[0]:recipeFound.strIngredient2=''
                            ingr.length>2?recipeFound.strIngredient3 = ingr[0]:recipeFound.strIngredient3=''
                            ingr.length>3?recipeFound.strIngredient4= ingr[0]:recipeFound.strIngredient4=''
                            ingr.length>4?recipeFound.strIngredient5 = ingr[0]:recipeFound.strIngredient5=''
                        }
                        recipeFound.strInstructions = eachRecipeFromDb.steps
                        recipeFound.strMealThumb = eachRecipeFromDb.image
                        recipeFound.endorsedByChef = eachRecipeFromDb.endorsedByChef
                        recipeFound.endorsedByNutritionist = eachRecipeFromDb.endorsedByNutritionist
                        recipeFound.ownedBy = eachRecipeFromDb.ownedBy
                        recipeFound.strCategory = "Miscellaneous"
                        allRecipes = [...allRecipes, recipeFound]
                        console.log("After db count" + allRecipes.length)
                    })

                }).then(() => {
                    this.setState({
                        unSortedRecipes: allRecipes
                    });
                })
            )
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
        if(category!=="Miscellaneous") {
            this.mealDBServices.findRecipesByCategory(category)
                .then(recipes => {
                    this.setState
                    ({
                        recipes: recipes.meals,
                        unsortedRecipes: recipes.meals
                    })
                })
        }
        if(category==="Miscellaneous"){
            var allRecipes=[]
            this.recipeServices.findAllRecipes()
                .then(recipeFromDb => {
                    recipeFromDb.map(eachRecipeFromDb => {
                        let recipeFound = {};
                        recipeFound.idMeal = eachRecipeFromDb._id;

                        recipeFound.strMeal = eachRecipeFromDb.name
                        var ingr=[];
                        ingr=(recipeFromDb.ingredients&&recipeFromDb.ingredients.length>0)?recipeFromDb.ingredients.split(','):[]
                        if(ingr.length>0){
                            recipeFound.strIngredient1 = ingr[0]
                            ingr.length>1?recipeFound.strIngredient2= ingr[0]:recipeFound.strIngredient2=''
                            ingr.length>2?recipeFound.strIngredient3 = ingr[0]:recipeFound.strIngredient3=''
                            ingr.length>3?recipeFound.strIngredient4= ingr[0]:recipeFound.strIngredient4=''
                            ingr.length>4?recipeFound.strIngredient5 = ingr[0]:recipeFound.strIngredient5=''
                        }
                        recipeFound.strInstructions = eachRecipeFromDb.steps
                        recipeFound.strMealThumb = eachRecipeFromDb.image
                        recipeFound.endorsedByChef = eachRecipeFromDb.endorsedByChef
                        recipeFound.endorsedByNutritionist = eachRecipeFromDb.endorsedByNutritionist
                        recipeFound.ownedBy = eachRecipeFromDb.ownedBy
                        recipeFound.strCategory = "Miscellaneous"
                        allRecipes = [...allRecipes, recipeFound]
                        console.log("After db count" + allRecipes.length)
                    })


                }).then(()=>
                this.setState
                ({
                    recipes: allRecipes

                }))
               // allRecipes.map(eachRecipe=>{

            //})
        }
    }

    findRecipesByCuisine = (cuisine) => {
        this.mealDBServices.findRecipesByCuisines(cuisine)
            .then(recipes => {
                this.setState
                ({recipes: recipes.meals})
            });
    }


    searchRecipe = (recipe) => {

        // this.mealDBServices.findRecipeByName(recipe).then(recipes => {
        //
        //     this.setState
        //     ({
        //         recipes: recipes.meals,
        //         searched: recipe
        //     })
        //
        // });

        let allRecipes = [];
        let updatedSearch = recipe.replace(" ", "&");
        this.mealDBServices.findRecipeByName(updatedSearch)
            .then(recipes => {
                recipes.meals && recipes.meals.map(recipe => {
                        allRecipes = [...allRecipes, recipe];
                        console.log("After API count" + allRecipes.length)
                    }
                )
            })
            .then(() => this.recipeServices.searchRecipeByName(recipe)
                .then(recipeFromDb => {
                    recipeFromDb.map(eachRecipeFromDb => {
                        let recipeFound = {};
                        recipeFound.idMeal = eachRecipeFromDb._id;

                        recipeFound.strMeal = eachRecipeFromDb.name
                        var ingr=[];
                        ingr=(recipeFromDb.ingredients&&recipeFromDb.ingredients.length>0)?recipeFromDb.ingredients.split(','):[]
                        if(ingr.length>0){
                            recipeFound.strIngredient1 = ingr[0]
                            ingr.length>1?recipeFound.strIngredient2= ingr[0]:recipeFound.strIngredient2=''
                            ingr.length>2?recipeFound.strIngredient3 = ingr[0]:recipeFound.strIngredient3=''
                            ingr.length>3?recipeFound.strIngredient4= ingr[0]:recipeFound.strIngredient4=''
                            ingr.length>4?recipeFound.strIngredient5 = ingr[0]:recipeFound.strIngredient5=''
                        }
                        recipeFound.strInstructions = eachRecipeFromDb.steps
                        recipeFound.strMealThumb = eachRecipeFromDb.image
                        recipeFound.endorsedByChef = eachRecipeFromDb.endorsedByChef
                        recipeFound.endorsedByNutritionist = eachRecipeFromDb.endorsedByNutritionist
                        recipeFound.ownedBy = eachRecipeFromDb.ownedBy
                        recipeFound.strCategory = "Miscellaneous"
                        allRecipes = [...allRecipes, recipeFound]
                        console.log("After db count" + allRecipes.length)
                    })

                }).then(() => {
                    this.setState({
                        recipes: allRecipes,
                        searched: recipe
                    });
                })
            )


    }


    compareAsc(a, b) {
        // Use toUpperCase() to ignore character casing
        const recipeA = a.strMeal.toUpperCase();
        const recipeB = b.strMeal.toUpperCase();

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
        const recipeA = a.strMeal.toUpperCase();
        const recipeB = b.strMeal.toUpperCase();

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

    logOut = () => {
        const obj = getFromStorage('project_april');
        if (obj && obj.token) {
            const {token} = obj;
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

    resetSort = () => {
        let allRecipes = [];
        this.mealDBServices.findAllRecipes()
            .then(recipes => {
                recipes.meals.map(recipe => {
                        allRecipes = [...allRecipes, recipe];
                        console.log("After API count" + allRecipes.length)
                    }
                )
            })
            .then(() => this.recipeServices.findAllRecipes()
                .then(recipeFromDb => {
                    recipeFromDb.map(eachRecipeFromDb => {
                        let recipeFound = {};
                        recipeFound.idMeal = eachRecipeFromDb._id;

                        recipeFound.strMeal = eachRecipeFromDb.name
                        var ingr=[];
                        ingr=(recipeFromDb.ingredients&&recipeFromDb.ingredients.length>0)?recipeFromDb.ingredients.split(','):[]
                        if(ingr.length>0){
                            recipeFound.strIngredient1 = ingr[0]
                            ingr.length>1?recipeFound.strIngredient2= ingr[0]:recipeFound.strIngredient2=''
                            ingr.length>2?recipeFound.strIngredient3 = ingr[0]:recipeFound.strIngredient3=''
                            ingr.length>3?recipeFound.strIngredient4= ingr[0]:recipeFound.strIngredient4=''
                            ingr.length>4?recipeFound.strIngredient5 = ingr[0]:recipeFound.strIngredient5=''
                        }
                        recipeFound.strInstructions = eachRecipeFromDb.steps
                        recipeFound.strMealThumb = eachRecipeFromDb.image
                        recipeFound.endorsedByChef = eachRecipeFromDb.endorsedByChef
                        recipeFound.endorsedByNutritionist = eachRecipeFromDb.endorsedByNutritionist
                        recipeFound.ownedBy = eachRecipeFromDb.ownedBy
                        recipeFound.strCategory = "Miscellaneous"
                        allRecipes = [...allRecipes, recipeFound]
                        console.log("After db count" + allRecipes.length)
                    })

                }).then(() => {
                    this.setState({
                        recipes: allRecipes
                    });
                })
            )

    }


    searchChanged = (event) => {
        this.setState(
            {
                searchRecipe: event.target.value
            });
    };

    render() {
        // const {recipes, currentPage, recipesPerPage} = this.state;
        //
        // // Logic for displaying todos
        // const indexOfLastRecipe = currentPage * recipesPerPage;
        // const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
        // const currentRecipes = recipes?recipes.slice(indexOfFirstRecipe, indexOfLastRecipe):[];
        //
        //    if(currentRecipes.length===0)
        //        return <NoResults recipe={this.state.searchRecipe}/>
        // const renderRecipes = currentRecipes.map(recipe => {
        //     return <RecipeCard popularRecipe={recipe} loggedIn={this.state.loggedIn}/>
        // });
        // // Logic for displaying page numbers
        // const pageNumbers = [];
        // for (let i = 1; i <= Math.ceil(recipes?(recipes.length / recipesPerPage):0); i++) {
        //     pageNumbers.push(i);
        // }
        //
        // const renderPageNumbers = pageNumbers.map(number => {
        //     return (
        //         <li className='horizontal-li'
        //             key={number}
        //             id={number}
        //             onClick={this.handleClick}>
        //             &nbsp;&nbsp;&nbsp;<label className='hover-underline'>{number}</label>
        //         </li>
        //     );
        // });

        return (

            <div>
                {/*<LandingPageHeader/>*/}
                <div id="header">
                    <GuestNav user={this.state.user} loggedIn={this.state.loggedIn} logOut={this.logOut}/>
                </div>
                <div>
                    <section className="table-area section-padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section-top2 text-center">
                                        <h3>Find <span>a</span> recipe</h3>
                                        <p><i>Time to get into a yummilicious world.</i></p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {/*<div className="col-lg-12">*/}
                                    {/*<div className="section-top2 text-center">*/}
                                        {/*<p className="text-white link-nav"><Link className="text-white link-nav" to='/home'>Home </Link> <span*/}
                                            {/*className="lnr lnr-arrow-right"></span>*/}
                                            {/*<Link className="text-white link-nav" to={`/explore-recipes`}>Explore</Link>*/}
                                        {/*</p>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            </div>
                            <div className="row">
                                <div className="col-lg-8 offset-lg-2">
                                    <form action="#">


                                        <div className="form-group has-search">
                                            <span className="fa fa-search form-control-feedback"></span>
                                            <input type="text" className="form-control"
                                                   placeholder="search a million recipes & more"
                                                   onChange={this.searchChanged}/>
                                        </div>

                                        <div className="table-btn text-center">
                                            <button href="#" className="template-btn template-btn2 mt-4"
                                                    onClick={() => this.searchRecipe(this.state.searchRecipe)}>Go
                                            </button>
                                        </div>
                                    </form>
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

                                <div className="container">
                                    <div className="row">

                                        {(this.state.recipes.length===0) && <NoResults recipe={this.state.searched}/>}
                                        {

                                            (this.state.recipes)
                                            && (this.state.recipes.map(recipe =>
                                                    <RecipeCard popularRecipe={recipe} recipeOwner={recipe.ownedBy?recipe.ownedBy:"Anonymous"}
                                                                loggedIn={this.state.userId ? true : false}/>)


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

export default ExploreRecipes;
