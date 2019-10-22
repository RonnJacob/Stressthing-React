import React from 'react'
// import '../../../node_modules/font-awesome.css'
// import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import './RegisterPage.css'
import '../../assets/css/main.css'
import Select from 'react-select'
import UserServices from '../../services/UserServices'
import ChefServices from '../../services/ChefServices'
import NutritionistServices from '../../services/NutritionistServices'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import {Redirect} from 'react-router-dom'
import {setInStorage} from "../../utils/storage";
import RegularUserServices from "../../services/RegularUserServices";


const customStyles = {


    option: (provided, state) => ({
        ...provided,
        color: '#686868',
        fontSize: '13px',
        fontWeight: '300',
    }),
    container: (provided, state) => ({
        ...provided,
        marginBottom: '17'
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: '#747474',
        fontSize: '13px',
        fontWeight: '300',
    }),

    valueContainer: (provided, state) => ({
        ...provided,
        color: '#747474',
        fontSize: '13px',
        fontWeight: '300',
    }),

};

class RegisterPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errors: [],
            user: {},
            toHome: false,
            token: '',
            signInError: ''
        };
        this.userServices = new UserServices();
        this.regularUserServices = new RegularUserServices();
    }


    validateUser = () => {
        const errorsReg = [];
        if(document.getElementById('register_username').value.length===0){
            errorsReg.push('Username cannot be empty.');
        }

        if(document.getElementById('register_password').value.length <= 2){
            errorsReg.push('Password must be greater than 2 charaxcters');
        }

        else if(document.getElementById('register_verify_password').value
            !== document.getElementById('register_password').value){
            errorsReg.push('Passwords do not match');
        }

        return errorsReg;
    };

    registerUser = () => {
        this.setState({errors: this.validateUser()});
        this.state.user['username'] = document.getElementById('register_username').value;
        this.userServices.checkUserNameValidity(this.state.user['username']).then(res=>{
            if(res.length!==0){
                // var errors = this.validateUser();
                // Needn't show other errors if username is already taken.
                var errors = [];
                errors.push('Username has been taken.');
                this.setState({errors: errors});
            }
            else{
                this.state.user['password'] = document.getElementById('register_password').value;
                this.state.user['password'] = document.getElementById('register_verify_password').value;
                this.regularUserServices.registerRegularUser(this.state.user)
                        .then(this.userServices.loginUser(this.state.user.username, this.state.user.password)
                            .then(json => {
                                if (json.success) {
                                    setInStorage('project_april', { token: json.token , user: json.user});
                                    this.setState({
                                        token: json.token,
                                        user: json.user[0],
                                        toHome: true
                                    });
                                    window.location.href = `/landingp`;
                                } else {
                                    this.setState({
                                        toHome: false
                                    });
                                }
                            })
                        );
            }
        });
    };

    render(){

        if(this.state.toHome === true){
            return <Redirect to={{pathname: '/home', state: { user: this.state.user}}}/>
        }

        const { selectedOption } = this.state;
        library.add(faExclamation);
        return(
            <div id="register-page">
                <section className="reservation-area section-gap relative">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-lg-6 reservation-left">
                                <h1 className="text-white mb-3">StressThing</h1>
                                <p className="text-white intro-text">Are you StressThing out?</p>
                                <p className="text-white intro-text">Log what's stressing you out every time you feel
                                    stressed.
                                    StressThing makes your life easier by pinpointing your biggest stress factors so
                                    you know what to target.
                                </p>
                                <p className="text-white intro-text">
                                    StressThing out? Find out your Stress Things!
                                </p>
                            </div>
                            <div className="col-lg-5 reservation-right">
                                <form className="form-wrap" style={{borderRadius:"40px"}}>
                                    <h2 className="mb-4">Register</h2>
                                    {this.state.errors.map(error => (
                                        <p className="form-errors" key={error}>
                                            <FontAwesomeIcon className="form-error-icons" icon="exclamation"/>
                                            &nbsp;&nbsp;{error}
                                        </p>
                                    ))}
                                    <input type="text" className="form-control"
                                           placeholder="Username"
                                           required
                                           id="register_username"
                                           onFocus={()=>{this.placeholder = ''}} onBlur={()=>{this.placeholder = 'Username'}}>
                                    </input>

                                    <input type="password" className="form-control"
                                           placeholder="Password"
                                           id="register_password"
                                           onFocus={()=>this.placeholder = ''}
                                           onBlur={()=>this.placeholder = 'Password'}>
                                    </input>

                                    <input type="password"
                                           className="form-control"
                                           placeholder="Verify Your Password"
                                           id="register_verify_password"
                                           onFocus={()=>this.placeholder = ''}
                                           onBlur={()=>this.placeholder = 'Verify Your Password'}>
                                    </input>

                                    <a className="primary-btn text-uppercase mt-20" style={{color: 'white'}}
                                       id="sign_up" onClick={this.registerUser}>Register
                                    </a>

                                    <p className="mt-3">Already A Member?
                                        <a href="/login"
                                           className="sign-in">Sign In
                                        </a>
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

export default RegisterPage
