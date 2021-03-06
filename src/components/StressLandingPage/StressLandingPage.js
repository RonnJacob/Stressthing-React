import React from 'react'
// import '../../../node_modules/font-awesome.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import './StressLandingPage.css'
import '../../assets/css/main.css'
import Select from 'react-select'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import {Redirect} from 'react-router-dom'
import {getFromStorage} from '../../utils/storage';
import {setInStorage} from "../../utils/storage";
import RegularUserServices from "../../services/RegularUserServices";
import StresserServices from "../../services/StresserServices";
import FitnessServices from "../../services/FitnessServices";

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

class StressLandingPage extends React.Component{
    constructor(props){
        super(props);
        const obj =  getFromStorage('project_april');
        this.state = {
            errors: [],
            user: obj.user[0],
            userId: obj.user[0]._id,
            toHome: false,
            token: '',
            signInError: ''
        };
{/*        this.userServices = new UserServices();
  */}
        this.regularUserServices = new RegularUserServices();
        this.fitnessServices = new FitnessServices();
        this.fitnessServices.findLatestFitnessData(obj.user[0]._id)
                            .then(res=> {
                              if(res!==undefined &&res.length!=0){
                                if(res[0].currentHeartRate > res[0].restingHeartRate+20){
                                  alert('You seem stressed. Please log your stress.');
                                }
                              }
                            });

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
                           id="insights" href="../insights" onClick={this.registerUser}>Insights
                        </a>

                        <a className="primary-btn text-uppercase m-20" style={{color: 'white'}}
                           id="logout" href="../login" onClick={this.registerUser}>Logout
                        </a>

                    </div>
                </div>

                <section className="reservation-area section-gap relative">

                    <div className="container">
                        <div className="row justify-content-center align-bottom">
                            <h1 className="text-white mb-3">Welcome!</h1>
                        </div>
                        <div className="row justify-content-center mt-2">
                            <h5 className="text-white">What's StressThing you out today?</h5>
                        </div>
                        <div className="row justify-content-center mt-5">
                            <a className="primary-btn m-20" style={{color: 'white'}}
                               id="stressor-log" href="../log" onClick={this.registerUser}>Log Your Stressors
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default StressLandingPage
