import React from 'react'
import '../../assets/css/main.css'
import {BrowserRouter as Router, Link, Route, Redirect} from "react-router-dom";
import './HomePageNav.css'
class HomePageNav extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.user['userType']);
    }


    render(){
        return(
            <div id="homepage-nav" className="container main-menu" style={{color: 'white'}}>
                <div className="row align-items-center justify-content-center d-flex">
                    <nav id="nav-menu-container">
                        <ul className="nav-menu">
                            <li><a href="/home">Home</a></li>
                            {
                                (this.props.user['userType']==='REGULAR') &&
                                <li>
                                    <a href="/ingredients">
                                            Ingredients
                                    </a>
                                </li>
                            }
                            {(this.props.user['userType'] ==='CHEF' || this.props.user['userType']==='REGULAR')
                            && <li>
                                <Link to={`/user/${this.props.user._id}/myrecipes`}>
                                    My Recipes
                                </Link>

                            </li>}
                            {(this.props.user['userType']==='REGULAR')
                            && <li>
                                <Link to={`/user/${this.props.user._id}/favorites`}>
                                    Favorite Recipes
                                </Link>
                            </li>}

                            {(this.props.user['userType'] ==='CHEF')
                            && <li><Link to={`/chef/${this.props.user._id}/endorsedRecipes`}>
                                Endorsed Recipes
                            </Link></li>}

                            {(this.props.user['userType'] ==='NUTRITIONIST')
                            && <li><Link to={`/nutritionist/${this.props.user._id}/endorsedRecipes`}>
                                Endorsed Recipes
                            </Link></li>}



                            <li><a href="/explore-recipes">Explore</a></li>
                            <li>
                                <a href={`/profile/${this.props.user.userType}/${this.props.user._id}`}>
                                    {this.props.user['username']}
                                </a>
                           </li>
                            <li><a href="/" onClick={this.props.logOut}>Log Out</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
};



export default HomePageNav;


