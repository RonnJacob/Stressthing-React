import React from 'react'
// import '../../../node_modules/font-awesome.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import './Log.css'
import '../../assets/css/main.css'
import Select from 'react-select'
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

class Log extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errors: [],
            user: {},
            toHome: false,
            token: '',
            signInError: ''
        };
{/*        this.userServices = new UserServices();
  */}
        this.regularUserServices = new RegularUserServices();
{/*        this.chefServices = new ChefServices();
        this.nutritionistServices = new NutritionistServices();
  */}
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
            <div className="full-height">
                <div className="navbar top-links pt-5">
                    <div className="container">
                        <h1 class="text-white col-sm-5">StressThing</h1>

                        <a className="primary-btn text-uppercase m-20" style={{color: 'white'}}
                           id="dashboard" href="../landingp" onClick={this.registerUser}>Dashboard
                        </a>

                        <a className="primary-btn text-uppercase m-20" style={{color: 'white'}}
                           id="logout" href="../login" onClick={this.registerUser}>Logout
                        </a>

                    </div>
                </div>

                <section className="reservation-area section-gap relative">

                    <div className="container">
                        <div className="row justify-content-center align-bottom">
                            <h2 className="text-white mb-5">Log</h2>
                        </div>
                        <div className="row justify-content-center mt-2">
                            <h5 className="text-white mb-4">What's StressThing you out?</h5>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-6 justify-content-center">
                                <input type="text" className="form-control mb-4" style={{borderRadius:"20px"}}
                                       name="stress-thing" id="stress-thing"
                                       placeholder="add your StressThings one at a time, please!"
                                       required
                                       onFocus={()=>{this.placeholder = ''}}
                                       onBlur={()=>{this.placeholder = 'Stressthing'}}>
                                </input>
                            </div>
                        </div>
                        <div className="row justify-content-center mt-5">
                            <a className="primary-btn m-20" style={{color: 'white'}}
                               id="stressor-log" onClick={this.registerUser}>
                               Add StressThing
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Log
