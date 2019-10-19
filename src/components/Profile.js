import React from 'react'
import UserServices from "../services/UserServices";
import RegularUserServices from "../services/RegularUserServices";
import ChefServices from "../services/ChefServices";
import NutritionistServices from "../services/NutritionistServices";
import {getFromStorage} from "../utils/storage";
import {Link} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        const obj = getFromStorage('project_april');


        this.userServices = new UserServices();
        this.regularUserServices = new RegularUserServices();
        this.chefServices = new ChefServices();
        this.nutritionistServices = new NutritionistServices();
        const userId = props.match.params['userId'];
        const userType = props.match.params['userType'];
        this.state = {
            loggedInUser: obj.user[0],
            loggedInUserId: obj.user[0]._id,
            userId: userId,
            user: {regularUser: {}, chef: {}, nutritionist: {}},
            userType: userType,
            message: '',
            messageBox: false,
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            blogPost: '',
            appointmentLink: ''
        }
        this.firstNameChanged = this.firstNameChanged.bind(this);
        this.lastNameChanged = this.lastNameChanged.bind(this);
        this.usernameChanged = this.usernameChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.blogPostChanged = this.blogPostChanged.bind(this);
        this.linkChanged = this.linkChanged.bind(this);
    }

    componentWillMount() {
        document.title = "What's Cooking?";
        let currentUser = {};
        this.userServices.findById(this.state.userId)
            .then(user => {
                currentUser = user;
                if (this.state.userType === 'REGULAR')
                    this.regularUserServices.findById(this.state.userId)
                        .then(user => {
                            currentUser.regularUser = user;
                            this.setState({
                                user: currentUser
                            })
                        })
                else if (this.state.userType === 'CHEF')
                    this.chefServices.findById(this.state.userId)
                        .then(user => {
                            currentUser.chef = user[0];
                            this.setState({
                                user: currentUser
                            })
                        })
                else
                    this.nutritionistServices.findById(this.state.userId)
                        .then(user => {
                            currentUser.nutritionist = user[0];
                            this.setState({
                                user: currentUser
                            })
                        })
            })
    }

    firstNameChanged = (event) => {
        this.setState(
            {
                firstName: event
            });

    }
    lastNameChanged = (event) => {
        this.setState(
            {
                lastName: event
            });

    }
    usernameChanged = (event) => {
        this.setState(
            {
                username: event
            });

    }
    passwordChanged = (event) => {
        this.setState(
            {
                password: event
            });

    }
    blogPostChanged = (event) => {
        this.setState(
            {
                blogPost: event
            });

    }
    linkChanged = (event) => {
        this.setState(
            {
                appointmentLink: event
            });

    }

    updateProfile = (user) => {

        if (user.userType.toLowerCase() === "regular") {
            this.userServices.updateProfile(user).then(
                () => this.userServices.findById(user._id)
                    .then(updatedUser => {
                        this.setState({
                            user: updatedUser,
                            message: 'Profile has been updated.',
                            messageBox: true
                        })
                    }))
        } else if (user.userType.toLowerCase() === "chef") {
            this.chefServices.updateProfile(user.chef, user._id)
                .then(
                    this.userServices.updateProfile(user).then(
                        () => this.userServices.findById(user._id)
                            .then(updatedUser => {
                                this.setState({
                                    user: updatedUser,
                                    message: 'Profile has been updated.',
                                    messageBox: true
                                })
                            }))
                )
        } else if (user.userType.toLowerCase() === "nutritionist") {
            this.nutritionistServices.updateProfile(user.nutritionist, user._id)
                .then(
                    this.userServices.updateProfile(user).then(
                        () => this.userServices.findById(user._id)
                            .then(updatedUser => {
                                this.setState({
                                    user: updatedUser,
                                    message: 'Profile has been updated.',
                                    messageBox: true
                                })
                            }))
                )
        }
    }

    resetForm = () => {

        this.setState({
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            blogPost: '',
            appointmentLink: ''
        })

    };

    handleCloseMessageBox = () => {
        this.setState({
            message: '',
            messageBox: false
        });
    };

    render() {
        let firstName;
        let lastName;
        let username;
        let password;
        let blogPost;
        let link;
        return (
            <div>
                <div>
                    <div id="header">
                        {/*<HomePageNav/>*/}
                    </div>
                    <Modal show={this.state.messageBox} onHide={this.handleCloseMessageBox}>
                        <Modal.Header closeButton>
                            <Modal.Title>Yay!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{this.state.message}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={this.handleCloseMessageBox}>
                                Ok
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <section className="about-banner relative">
                        <div className="overlay overlay-bg"></div>
                        <div className="container">
                            <div className="row d-flex align-items-center justify-content-center">
                                <div className="about-content col-lg-12">
                                    <div className="section-top2 text-center">
                                        <h3 style={{color:"white"}}>My <span>Profile</span></h3>
                                        <p className="text-white link-nav"><Link className="text-white link-nav" to='/home'>Home </Link> <span
                                            className="lnr lnr-arrow-right"></span>
                                            <Link className="text-white link-nav" to={`/profile/${this.state.user.userType}/${this.state.user.userId}`}>{this.state.user.username}</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="home-about-area section-gap">
                        <div className="container">
                            <h1 className="mb-5 text-center">Profile</h1>
                            <div className="row">
                                <div className="col-lg-3 home-about-left"></div>
                                <div className="col-lg-6 home-about-left">
                                    <div className="table-responsive">
                                        <table className="groceries table table-bordered table-hover"
                                               id="grocery_table">
                                            <thead>
                                            <tr>
                                                <th>Info</th>
                                                <th>Detail</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.user._id === this.state.loggedInUserId && <tr>
                                                <td className="name-theader">Username</td>
                                                <td className="actions-theader">
                                                    {/*{this.state.user.username}*/}
                                                    <input onChange={e => this.usernameChanged(e.target.value)}
                                                           ref={node => username = node} className="form-control "
                                                           id="firstName"
                                                           placeholder="alice"
                                                           value={this.state.username ? this.state.username : this.state.user.username}
                                                           disabled/>
                                                </td>
                                            </tr>}
                                            {this.state.user._id === this.state.loggedInUserId && <tr>
                                                <td className="name-theader">Password</td>
                                                <td className="actions-theader">
                                                    {/*{this.state.user.password}*/}
                                                    <input onChange={e => this.passwordChanged(e.target.value)}
                                                           ref={node => password = node} className="form-control "
                                                           id="firstName"
                                                           placeholder="D7h!k9"
                                                           value={this.state.password ? this.state.password : this.state.user.password}/>
                                                </td>
                                            </tr>}
                                            <tr className={"form-group"}>
                                                <td className="name-theader">First Name</td>
                                                <td className="actions-theader">

                                                    {this.state.user._id !== this.state.loggedInUserId && this.state.user.firstName}
                                                    {this.state.user._id === this.state.loggedInUserId &&
                                                    <input onChange={e => this.firstNameChanged(e.target.value)}
                                                           ref={node => firstName = node} className="form-control "
                                                           id="firstName"
                                                           placeholder="Alice"
                                                           value={this.state.firstName ? this.state.firstName : this.state.user.firstName}/>}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="name-theader">Last Name</td>
                                                <td className="actions-theader">
                                                    {this.state.user._id !== this.state.loggedInUserId && this.state.user.lastName}
                                                    {this.state.user._id === this.state.loggedInUserId &&
                                                    <input onChange={e => this.lastNameChanged(e.target.value)}
                                                           ref={node => lastName = node} className="form-control "
                                                           id="firstName"
                                                           placeholder="Wonder"
                                                           value={this.state.lastName ? this.state.lastName : this.state.user.lastName}/>}
                                                </td>
                                            </tr>
                                            {this.state.user._id === this.state.loggedInUserId && <tr>
                                                <td className="name-theader">Privilege</td>
                                                <td className="actions-theader"><input className="form-control"
                                                                                       id="username"
                                                                                       value={this.state.user.userType}
                                                                                       disabled/>
                                                </td>
                                            </tr>}
                                            {
                                                this.state.userType === 'CHEF' &&
                                                <tr>
                                                    <td className="name-theader">Blogpost</td>
                                                    <td className="actions-theader">
                                                        {this.state.user._id === this.state.loggedInUserId &&
                                                        <input onChange={e => this.blogPostChanged(e.target.value)}
                                                               ref={node => blogPost = node} className="form-control "
                                                               id="firstName"
                                                               placeholder="https://blogpost.com"
                                                               value={this.state.blogPost ? this.state.blogPost : this.state.user.chef.blogPost}/>}
                                                        {this.state.user._id !== this.state.loggedInUserId && <a
                                                            href={this.state.user.chef.blogPost}>
                                                            {this.state.user.chef.blogPost}

                                                        </a>}
                                                    </td>
                                                </tr>
                                                ||
                                                this.state.userType === 'NUTRITIONIST' &&
                                                <tr>
                                                    <td className="name-theader">AppointmentLink</td>
                                                    <td className="actions-theader">
                                                        {/*{this.state.user._id !== this.state.loggedInUserId &&*/}
                                                        {/*<a href={this.state.user.nutritionist.appointmentLink}>*/}
                                                            {/*{this.state.user.nutritionist.appointmentLink}</a>}*/}

                                                        {this.state.user._id === this.state.loggedInUserId &&
                                                        <input onChange={e => this.linkChanged(e.target.value)}
                                                               ref={node => link = node} className="form-control "
                                                               id="firstName"
                                                               placeholder="https://appointmentLink.com"
                                                               value={this.state.appointmentLink ? this.state.appointmentLink : this.state.user.nutritionist.appointmentLink}/>}

                                                        {this.state.user._id !== this.state.loggedInUserId && <a
                                                            href={this.state.user.nutritionist.appointmentLink}>
                                                            {this.state.user.nutritionist.appointmentLink}


                                                        </a>}
                                                    </td>

                                                </tr>

                                            }
                                            {this.state.user._id === this.state.loggedInUserId && <tr>


                                                <td className="table-btn text-center"
                                                    style={{border: "0px solid black"}}>
                                                    <a href="#" className="template-btn123 template-btn22 mt-4"
                                                       id="login_user"
                                                       style={{color: 'black', background: 'lightgrey'}}
                                                       onClick={() => {

                                                           this.resetForm();

                                                       }
                                                       }>Reset
                                                    </a>

                                                </td>
                                                <td className="table-btn text-center"
                                                    style={{border: "0px solid black"}}>

                                                    <a className="primary-btn text-uppercase mt-20" id="login_user"
                                                       style={{color: 'white'}} onClick={() => {
                                                        let u = {}
                                                        if (this.state.user.userType.toLowerCase() === "regular") {

                                                            u = {
                                                                _id: this.state.user._id,
                                                                password: this.state.password != "" ? this.state.password : this.state.user.password,
                                                                username: this.state.user.username,
                                                                firstName: this.state.firstName != "" ? this.state.firstName : this.state.user.firstName,
                                                                lastName: this.state.lastName != "" ? this.state.lastName : this.state.user.lastName,
                                                                userType: this.state.user.userType,
                                                                regularUser: {
                                                                    favoriteRecipes: this.state.user.regularUser.favoriteRecipes,
                                                                    ownedRecipes: this.state.user.regularUser.ownedRecipes,
                                                                    ingredients: this.state.user.regularUser.ingredients
                                                                }
                                                            }
                                                        } else if (this.state.user.userType.toLowerCase() === "chef") {
                                                            u = {
                                                                _id: this.state.user._id,
                                                                password: this.state.password != "" ? this.state.password : this.state.user.password,
                                                                username: this.state.user.username,
                                                                firstName: this.state.firstName != "" ? this.state.firstName : this.state.user.firstName,
                                                                lastName: this.state.lastName != "" ? this.state.lastName : this.state.user.lastName,
                                                                userType: this.state.user.userType,
                                                                chef: {
                                                                    endorsedRecipes: this.state.user.chef.favoriteRecipes,
                                                                    ownedRecipes: this.state.user.chef.ownedRecipes,
                                                                    blogPost: this.state.blogPost != "" ? this.state.blogPost : this.state.user.chef.blogPost
                                                                }
                                                            }
                                                        } else if (this.state.user.userType.toLowerCase() === "nutritionist") {
                                                            u = {
                                                                _id: this.state.user._id,
                                                                password: this.state.password !== "" ? this.state.password : this.state.user.password,
                                                                username: this.state.user.username,
                                                                firstName: this.state.firstName !== "" ? this.state.firstName : this.state.user.firstName,
                                                                lastName: this.state.lastName !== "" ? this.state.lastName : this.state.user.lastName,
                                                                userType: this.state.user.userType,
                                                                nutritionist: {
                                                                    endorsedRecipes: this.state.user.nutritionist.endorsedRecipes,
                                                                    appointmentLink: this.state.appointmentLink !== "" ? this.state.appointmentLink : this.state.user.nutritionist.appointmentLink
                                                                }
                                                            }
                                                        }

                                                        this.updateProfile(u);

                                                    }

                                                    }>Update
                                                    </a>
                                                </td>


                                            </tr>}
                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default Profile
