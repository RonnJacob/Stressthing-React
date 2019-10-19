import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap';
import {Link, Route,Router} from 'react-router-dom'
import ExploreRecipes from "../Explore/ExploreRecipes";
import {Navbar, Collapse, Nav, NavDropdown, NavbarBrand} from "react-bootstrap";
import './LandingPageHeader.css'





export const LandingPageHeader = ({popularRecipes}) => {
    {
        return (
            <header className="header-area header-area2">

                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-sm-9 col-8">
                                <div className="logo-area">
                                    <img src={require("../../../src/assets/landingpage/images/logo/newlogo.png")}
                                         alt="logo"/>
                                </div>
                        </div>
                        <div className="col-lg-10 col-sm-3 col-4">
                            {/*<div className="custom-navbar">*/}
                                {/*<span>8</span>*/}
                                {/*<span></span>*/}
                                {/*<span></span>*/}
                            {/*</div>*/}
                            {/*<div id="wbdv_main_menu" className="main-menu main-menu2">*/}
                                {/*<ul className="main-menu main-menu2">*/}
                                    {/*<li className="active">*/}
                                        {/*<a href="#">home*/}
                                        {/*</a>*/}
                                    {/*</li>*/}
                                    {/*<li>*/}
                                        {/*<a href={`/explore-recipes`}>explore*/}
                                        {/*<Route path='/explore-recipes' render={() => <ExploreRecipes*/}
                                            {/*popularRecipes={popularRecipes}/>}/>*/}

                                        {/*</a>*/}
                                    {/*</li>*/}
                                    {/*<li>*/}
                                        {/*<a href="/login">*/}
                                            {/*login*/}
                                        {/*</a>/*/}
                                        {/*<a href="/register">*/}
                                            {/*register*/}
                                        {/*</a>*/}
                                    {/*</li>*/}

                                {/*</ul>*/}
                            {/*</div>*/}
                            <Navbar id="transparent-navbar" collapseOnSelect expand="lg" variant="dark">
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="mr-auto">
                                    </Nav>
                                    <Nav id="white-nav" className="white-nav">
                                        <Nav.Link href="/" style={{color: 'white'}}>Home</Nav.Link>
                                        <Nav.Link href="/explore-recipes" style={{color: 'white'}}>Explore</Nav.Link>
                                        <Nav.Link href="/login" style={{color: 'white'}}>Login /</Nav.Link>
                                        <Nav.Link href="/register" style={{color: 'white'}}> Register</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </div>
                    </div>
                </div>
            </header>
        );

    }
}
