import React from 'react'
// import '../../../node_modules/font-awesome.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import './InsightsGraph.css'
import '../../assets/css/main.css'
import Select from 'react-select'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import {Redirect} from 'react-router-dom'
import {setInStorage} from "../../utils/storage";
import { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'
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

class InsightsGraph extends React.Component{
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

    render() {
      return(
      <PieChart data={[["Blueberry", 4], ["Strawberry", 4]]} />
    );
  }
}

export default InsightsGraph
