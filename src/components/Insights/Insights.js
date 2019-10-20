import React from 'react'
// import '../../../node_modules/font-awesome.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import './Insights.css'
import '../../assets/css/main.css'
import Select from 'react-select'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import {Redirect} from 'react-router-dom'
import {getFromStorage} from "../../utils/storage"
import {setInStorage} from "../../utils/storage"
import RegularUserServices from "../../services/RegularUserServices"
import StresserServices from "../../services/StresserServices";
import {Pie} from 'react-chartjs-2'

import {Component} from 'react';


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

class Insights extends Component{
    constructor(props){
        super(props);
        const obj =  getFromStorage('project_april');
        this.state = {
            errors: [],
            user: obj.user[0],
            userId: obj.user[0]._id,
            user: {},
            toHome: false,
            token: '',
            signInError: '',
            stressLabels: [],
            stressDataValues: []

        };
{/*        this.userServices = new UserServices();
  */}
        this.regularUserServices = new RegularUserServices();
        this.stresserServices = new StresserServices();
        this.stresserServices.findStresser(obj.user[0]._id).then(res=>{
          if(res!==undefined || res.length !== 0){
            for (var i = 0; i < res.length; i++) {
                this.setState({stressLabels: [...this.state.stressLabels, res[i].cause]});
                this.setState({stressDataValues: [...this.state.stressDataValues, res[i].count]});
            }
            console.log(this.state.stressLabels);
            console.log(this.state.stressDataValues);
          }

        });
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
                <div className="navbar top-links pt-5" style={{height: "inherit"}}>
                    <div className="container">
                        <h1 class="text-white" style={{textAlign: 'centre'}}>Insights</h1>
                        <Pie
                      data={{

                          labels : this.state.stressLabels,
                          datasets : [{
                              data : this.state.stressDataValues
                          }]
                          }}

                      />

                    </div>
                </div>
            </div>
        );
    };
}

export default Insights
