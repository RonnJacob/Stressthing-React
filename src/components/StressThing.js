/* eslint-disable no-useless-constructor */
import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import RegisterPage from "./RegisterPage/RegisterPage";
import LoginPage from "./LoginPage/LoginPage";
import StressLandingPage from './StressLandingPage/StressLandingPage';
import Insights from './Insights/Insights';
import Log from './Log/Log';


class StressThing extends Component{
    constructor(props){
        super(props);
    }
    
    render(){

        return (
            <div id="landing-page" style={{height: '100%'}}>
                <Router>
                    <Switch>
                    <Route path='/' exact component={LoginPage}/>
                    <Route path="/login" exact component={LoginPage}/>
                    <Route path="/landingp" exact component={StressLandingPage}/>
                    <Route path="/register" exact component={RegisterPage}/>
                    <Route path="/insights" exact component={Insights}/>
                    <Route path="/log" exact component={Log}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default StressThing;
