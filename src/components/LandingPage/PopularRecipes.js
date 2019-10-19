import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import RecipeCard from "./RecipeCard";




export const PopularRecipes = ({popularRecipes}) => {


    {
        return (
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
                            popularRecipes &&
                            popularRecipes.map(recipe =>
                                <RecipeCard popularRecipe={recipe} recipeOwner={recipe.ownedBy?recipe.ownedBy:"Anonymous"} loggedIn={false}/>
                            )

                        }
                    </div>
                </div>
            </section>
        );

    }
}
