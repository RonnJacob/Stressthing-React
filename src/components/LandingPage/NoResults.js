import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';



export const NoResults = ({recipe,ingredientInsuffiecient}) => {


    {
        return (
            <div>
                <div className="no-results">
                    <h3>We searched all over but didn't find a recipe for '{recipe}'</h3>
                    <div className="no-results-suggestion">
                        <img src="https://x.yummlystatic.com/s/e3ccfc5a7/img/check_spelling.svg"/>
                        <span>Check Spelling</span>
                    </div>
                    <div className="no-results-suggestion">
                        <img src="https://x.yummlystatic.com/s/e3ccfc5a7/img/different_keywords.svg"/>
                        <span>Different Keywords</span></div>
                    <div className="no-results-suggestion">
                        <img src="https://x.yummlystatic.com/s/e3ccfc5a7/img/simplify_search.svg"/>
                        <span>Simplify Search</span></div>
                    {/*</PopularRecipes popularRecipes={this.state.popularRecipes}>*/}
                </div>
            </div>
        );

    }
}
