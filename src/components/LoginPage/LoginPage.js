import React, {Component} from 'react'
import './LoginPage.css'
import '../../assets/css/main.css'
import {Redirect} from 'react-router-dom'
import {setInStorage, getFromStorage} from '../../utils/storage';
import UserServices from "../../services/UserServices";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            successfulLogin: false,
            token: '',
            signInError: ''
        };
        this.userServices = new UserServices();
    }


    componentWillMount() {
        // const obj = getFromStorage('project_april');
        // if (obj && obj.token) {
        //     const { token } = obj;
        //     this.userServices.verifyUser(token).then(json => {
        //             if (json.success) {
        //                 window.location.href='/home';
        //             }
        //         });
        // }
    }

    signIn = () => {
        const user = {};
        user.username = document.getElementById('login_username').value;
        user.password = document.getElementById('login_password').value;
        this.userServices.loginUser(user.username, user.password).then(json => {
                if (json.success) {
                    setInStorage('project_april', { token: json.token , user: json.user});
                    this.setState({
                        signInError: json.message,
                        token: json.token,
                        user: json.user[0],
                        successfulLogin: true
                    });
                } else {
                    this.setState({
                        signInError: json.message,
                        successfulLogin: false
                    });
                }
        });
    };

    render(){
        if(this.state.successfulLogin === true){
            return <Redirect to={{pathname: '/landingp', state: { user: this.state.user}}}/>
        }
        library.add(faExclamation);
        return (
            <div id="login-page">
                <section className="reservation-area section-gap">
                    <div className="container">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-lg-5 margin-auto bg-white reservation-right" style={{borderRadius:"40px"}}>
                                <form className="form-wrap" action="#" style={{borderRadius:"40px"}}>
                                    <h2 className="mb-4">Sign In</h2>
                                    {(this.state.signInError) &&
                                        <p className="form-errors">
                                            <FontAwesomeIcon className="form-error-icons" icon="exclamation"/>
                                            &nbsp;&nbsp;{this.state.signInError}
                                        </p>
                                    }
                                    <label className="form-labels">Enter username:</label>
                                    <input type="text" className="form-control mb-3" style={{borderRadius:"20px"}}
                                           name="username" id="login_username"
                                           placeholder=" Your username"
                                           required
                                           onFocus={()=>{this.placeholder = ''}}
                                           onBlur={()=>{this.placeholder = 'Your username'}}>
                                    </input>
                                    <label className="form-labels">Enter password:</label>
                                    <input type="password" className="form-control" style={{borderRadius:"20px"}}
                                           name="password"
                                           id="login_password" placeholder="Your password"
                                           required
                                           onFocus={()=>this.placeholder = ''}
                                           onBlur={()=>this.placeholder = 'Your password'}>
                                    </input>
                                    <a className="primary-btn text-uppercase mt-20" id="login_user"
                                       style={{color: 'white'}} onClick={this.signIn}>Sign In</a>
                                    <p className="mt-3">If you have not registered yet,&nbsp;
                                        <a className="text-primary font-weight-bold"
                                        href="/register"
                                        style={{color: 'white'}}>Sign Up</a> now</p>
                                    <p className="text-center mt-3 font-weight-bold text-danger"
                                       id="loading"
                                       style ={{display: 'none'}}>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default LoginPage;
