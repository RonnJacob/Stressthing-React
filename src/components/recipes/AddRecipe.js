import React from 'react';
import './Recipe.css'
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import {getFromStorage} from "../../utils/storage";
import {Button, Modal} from "react-bootstrap";
import UserServices from "../../services/UserServices";


class AddRecipe extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: '',
            addSuccessful: false,
            recipeToBeSaved: {}
        };
        this.userServices = new UserServices();
    }

    componentWillMount() {
        document.title = "What's Cooking?";
        const obj = getFromStorage('project_april');
        if (obj && obj.token) {
            const { token } = obj;
            this.userServices.verifyUser(token).then(json => {
                if(!json.success){
                    window.location.href='/';
                }
            });
        }
    }
    addRecipe = (recipe) => {
        if(recipe.name.length < 1){
            this.setState({
                error: 'A recipe must have a name.'
            })
        }
        else if(recipe.ingredients.length < 1){
            this.setState({
                error: 'A recipe must have atleast one ingredient'
            })
        }

        else if(recipe.steps.length < 1){
            this.setState({
                error: 'A recipe must have atleast one step'
            })
        }
        else{
            this.setState({
                addSuccessful: true,
                recipeToBeSaved: recipe
            })
        }
    };

    handleClose = () => {

        this.props.addRecipe(this.state.recipeToBeSaved)
            .then(()=>this.setState({
                addSuccessful: false,
            }));

    };
    render() {
        let name, ingredients, steps;
        const obj = getFromStorage('project_april');
        const userId = obj.user[0]._id;
        library.add(faExclamation);
        return(
            <div>
                <div id="header">
                    {/*<HomePageNav/>*/}
                </div>
                <section className="about-banner relative">
                    <div className="overlay overlay-bg"></div>
                    <div className="container">
                        <div className="row d-flex align-items-center justify-content-center">
                            <div className="about-content col-lg-12">
                                <h1 className="text-white">
                                    My Recipes
                                </h1>
                                <p className="text-white link-nav"><Link to='/'>Home </Link> <span
                                    className="lnr lnr-arrow-right"></span>
                                    {/*TODO need to change the hyper link to my recipes*/}
                                    <Link to={`/user/${userId}/myrecipes`}>My Recipes</Link>
                                    <span
                                        className="lnr lnr-arrow-right"></span>
                                    <a href="#">Add Recipe</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="home-about-area section-gap">
                    <div className="container">
                        <h1 className="mb-5 text-center">Add Recipe</h1>
                        {(this.state.error) &&
                        <p className="form-errors">
                            <FontAwesomeIcon className="form-error-icons" icon="exclamation"
                                            style={{color: '#F47D41'}}/>
                            &nbsp;&nbsp;{this.state.error}
                        </p>
                        }
                        <div className="row">
                            <div className="col-lg-6 home-about-left">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Add Recipe</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form id="add_ingredients">
                                            <div className="form-group">
                                                <label htmlFor="recipe_name">Recipe Name: </label>
                                                <input ref={node => name = node} type="text" className="form-control"
                                                       id="recipe_name"
                                                       aria-describedby="recipeHelp" placeholder="Enter Recipe Name"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="recipe_ingredients">Ingredients Needed: </label>
                                                <input ref={node => ingredients = node} type="text" className="form-control"
                                                       id="recipe_ingredients"
                                                       aria-describedby="recipeHelp"
                                                       placeholder="Please enter ingredients separated by commas and no spaces"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="recipe_steps">Steps: </label>
                                                <textarea ref={node => steps = node} type="text" className="form-control"
                                                          id="recipe_steps"
                                                          aria-describedby="recipeHelp" placeholder="Enter Steps"/>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="middle-div btn btn-primary" id="save_recipe"
                                                onClick={() => {
                                                    let recipe = {
                                                        name: name.value,
                                                        ownedBy: userId,
                                                        steps: steps.value,
                                                        category:'Miscellaneous',
                                                        ingredients: ingredients.value.split(',').map(function(item) {
                                                            return item.trim();
                                                        }),
                                                        image: ''
                                                    };
                                                    this.addRecipe(recipe);
                                                }}>Save changes
                                        </button>
                                        <Link to={`/user/${userId}/myrecipes`} className="middle-div btn btn-danger"
                                              id="save_recipe">Cancel
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 home-about-right">
                                <img src={require('./add-img.jpg')} alt=""/>
                            </div>

                        </div>
                    </div>
                </section>
                <Modal show={this.state.addSuccessful} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Yay</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Recipe has been added.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}


export default AddRecipe
