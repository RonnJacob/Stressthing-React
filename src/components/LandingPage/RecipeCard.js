import React from 'react'
import {Link, Route} from 'react-router-dom'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap'
import {Modal,Button} from 'react-bootstrap'
import {getFromStorage} from "../../utils/storage";

export default class RecipeCard extends React.Component{
    constructor(props){
        super(props);
        const obj = getFromStorage('project_april');
        // this.handleShow = this.handleShow.bind(this);
        // this.handleClose = this.handleClose.bind(this);

        this.state = {
            loggedInUser: obj &&obj.user[0]?obj.user[0]:'',
            loggedInUserId: obj &&obj.user[0]?obj.user[0]._id:'',
            show: false,
            showRecipeDetail: false
        };
    }

    handleClose=()=> {
        this.setState({ show: false });
    };

    handleCloseRecipeModal=()=> {
        this.setState({ showRecipeDetail: false });
    };


    handleCloseDelete=()=> {
        this.setState({ show: false });
        this.props.deleteRecipe(this.props.popularRecipe._id);
    };

    handleShow=()=> {
        this.setState({ show: true });

    };

    handleShowLoggedOut = () => {
        if(this.props.loggedIn){
            console.log(this.props.popularRecipe);
            // console.log(this.props.popularRecipe._id);
            window.location.href
                =`/recipes/${this.props.popularRecipe.idMeal?this.props.popularRecipe.idMeal:this.props.popularRecipe._id}`;
        }
        else{
            // window.location.href
            //     =`/recipes/${this.props.popularRecipe.idMeal?this.props.popularRecipe.idMeal:this.props.popularRecipe._id}`;
            this.setState({showRecipeDetail: true});
        }
    };

    render() {
        return(
        <div className="col-md-4 col-sm-6">
            <a onClick={this.handleShowLoggedOut}>
                <div className="single-food">
                    <div className="food-img">
                        <img src={this.props.popularRecipe.strMealThumb?this.props.popularRecipe.strMealThumb:(this.props.popularRecipe.image?this.props.popularRecipe.image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAANlBMVEX///+/v7+8vLzKysr8/Pzg4ODFxcXb29vT09Pj4+P4+PjBwcH6+vry8vLY2NjIyMjp6eno6Og1AQOEAAAEdUlEQVR4nO2d6ZbCIAxGp3TT1i6+/8uOWrUUwlKsIZ7z3d+dwh0wIYDHvz8AAAAAAAAAAAAAAAAAXqqx+Snq/YYnVfwQqoUhDKUDQxjKB4YwlA8MYSifAwyVNA43PJ2FUR5sqM673/BljP7B0AaG2YFhEBhmB4ZBYJgdGAaBYXZgGASG2YFhEBhmB4ZBYJidDIaXKqWjyfAaXubxsUs7nbvkHu+F1XAuX1vQqmm5RpLTsO61R9WJaRgZDc0Djmb4pOPR8BmezTMqVX7U81jYDIemMFH775glwGY4EseMH8zTNvpPuQw7ewhvJC8Phn6MfZTLcKZOitUpMWXcGp1iQzGXITVJiyK6mwatih9/LkP6tL9PM+zUjvH/ScPlZZGxJq9hk2RYP96lTnFPcxnWpGF52d2ellnjHucyHMhYGh3ydcrX6v0a9TiX4WV76WOhn3c3p8+GMirWsK1pztQkTUiH2uov7h/EZliV1jxVCYu26rS3t3y1xaU3DVMW3puIFRWKGevDudmOYkqV3xWRja1w1viDNlFV2qackVab3X/y7Z2oc9k8dqL6aUzJhH+1Mc9jPsnMu4nVULfjWF/TVmtWFR2TUH9qR9gOxxHFiTDD2Rd9qJVfOB7LMuzU6FYkdnpiVrayDG/vclYMeq7XCMYaUYb3lZ2zsqWrk3ANJcmwmx6voCfqNtdrDYbWDZIMX3s55LC4vvQQbFCQ4buEpMKNmetXQgWKHEO9grQUyTi6EKqh5BhuCkhzrWLn+rXFwLpGjOHQb7u9GUXrVGcziP6EIcbQHCW9tvLM0SJ4wCPF0N71XyefI9e/8ddQQgyJg5v180Xneu1Jb6wRYthSPX92xpXr1za96xoZhoO1h6MpunL9ivccktuwIgu6yTE49+64c/36nC/WcBteS0LRnQzaQBx94quhuHcxSmX3pnMM4Z06PEcL/34Ns+Ft4aJ6Q9H7TeIYvxueax3Mt77ua09lTNQ5TsKLck9TXsNnXt8qxnzQgobuWMNr+EwKSj/7bSMnop/JOYishtd3BVi+Q0NUrAzTOw8TOQ0rrQJ8TdTQmjMW98UFTkO9AnxNVG9dtAdnDcVouD0GVtO9SxW9XEvA2XXO0zVjuO478seEmQd9fkN7uLr5sCF0X1zgM7zawzVR1xeSDR01FOM5/oE2JI4aKutdjGNxdD7rfZqDoQ8Ts94vPRh6v4bL8MCg6WbKaEgE0i+gqGnKY/j9QOruPo/h9wPpAnVJisWQI5AuEK2zGHIE0qV1ooZiMWQJpAv2uobDkCeQLs3bh4kMhkyB9EkOw8PK+Bjs9r9vWI0lJ9Y0ZRjDjhVrV1HG6do3gWEQGGYHhkFgmB0YBoFhdmAYBIbZOdqwqCtZHG/YsFaDEWw3ifDbCDCUDwxhKB8YwlA+MIShfGAIQ/nAEIbygSEM5QNDGMoHhjCUDwxhKB8YwlA+MIShfGAIQ/nAEIbygSEM5QNDGMoHhjCUT5rhT5FgONc/Bc/PuwIAAAAAAAAAAAAAAAAQzD8O4oElgraltwAAAABJRU5ErkJggg==")}
                             className="img-fluid" alt=""/>
                    </div>
                    <div className="food-content">
                        <div className="d-flex justify-content-between">
                            <h5>{this.props.popularRecipe.strMeal?this.props.popularRecipe.strMeal:this.props.popularRecipe.name}</h5>

                        </div>


                    </div>
                </div>
            </a>

            {this.props.recipeOwner===this.state.loggedInUserId && <div>
                {<div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Do you want to delete the recipe?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>


                                 <button type="button"
                                                    onClick={()=>this.props.deleteRecipe(this.props.popularRecipe._id)}
                                                    className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>}

                {this.props.loggedIn &&<Button variant="danger" onClick={this.handleShow}>
                    Delete
                </Button>}



            </div>}
            <Modal show={this.state.show && this.props.loggedIn} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this yummy recipe?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={this.handleCloseDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={this.state.showRecipeDetail} onHide={this.handleCloseRecipeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Yikes!</Modal.Title>
                </Modal.Header>
                <Modal.Body>You have to be registered or logged in to view the recipe.</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.handleCloseRecipeModal}>
                        Got it
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        );
    }
}
