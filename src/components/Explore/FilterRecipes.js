import React from 'react'
import {Link, Route} from 'react-router-dom'


const FilterRecipes = ({category,findRecipesByCategory,findRecipesByCuisine}) =>






                        <li className="main-nav-list child"><a href="#" onClick={() => findRecipesByCategory(category)} tabindex="1">{category}<span
                            className="number"></span></a></li>








export default FilterRecipes;
