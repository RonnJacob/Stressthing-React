import React from 'react'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import './GuestNav.css'
const GuestNav = ({user, loggedIn, logOut}) =>

        <div>
            {/*<Navbar id="transparent-navbar"*/}
                    {/*collapseOnSelect*/}
                    {/*expand="lg"  variant="dark" className=" navbar-explore">*/}
                {/*<Navbar.Brand href="/">What's Cookin!</Navbar.Brand>*/}
                {/*<Navbar.Toggle aria-controls="responsive-navbar-nav" />*/}
                {/*<Navbar.Collapse id="responsive-navbar-nav">*/}
                    {/*<Nav className="mr-auto">*/}
                        {/*{user.firstName ?*/}
                            {/*<Nav.Link href="/home">Home</Nav.Link>:*/}
                            {/*<Nav.Link href="/">Home</Nav.Link>}*/}
                    {/*</Nav>*/}
                    {/*<Nav>*/}
                        {/*<Nav.Link eventKey={2} href="/login">*/}
                            {/*{user.firstName ? user.firstName:'Log in'}*/}
                        {/*</Nav.Link>*/}
                        {/*{user.firstName ?*/}
                            {/*<Nav.Link href="/" onClick={logOut}>Sign Out</Nav.Link>:*/}
                            {/*<Nav.Link href="/register">Sign up</Nav.Link>}*/}
                    {/*</Nav>*/}
                {/*</Navbar.Collapse>*/}
            {/*</Navbar>*/}
            <Navbar id="transparent-navbar-guestnav" collapseOnSelect expand="lg" variant="dark" fixed={'top'}>
                <div className="logo-area">
                        <img src={require("../../../src/assets/landingpage/images/logo/newlogo.png")}
                             alt="logo"/>
                </div>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                {/*<Navbar.Collapse id="responsive-navbar-nav">*/}
                    {/*<Nav className="mr-auto">*/}
                    {/*</Nav>*/}
                    {/*<Nav id="white-nav" className="white-nav">*/}
                        {/*<Nav.Link href="/" style={{color: 'white'}}>Home</Nav.Link>*/}
                        {/*<Nav.Link href="/explore-recipes" style={{color: 'white'}}>Explore</Nav.Link>*/}
                        {/*<Nav.Link href="/login" style={{color: 'white'}}>Login /</Nav.Link>*/}
                        {/*<Nav.Link href="/register" style={{color: 'white'}}> Register</Nav.Link>*/}
                    {/*</Nav>*/}
                {/*</Navbar.Collapse>*/}

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                         {loggedIn ?
                            <Nav.Link style={{color:'white', fontWeight: 'bold'}} href="/home">Home</Nav.Link>:
                            <Nav.Link style={{color:'white', fontWeight: 'bold'}} href="/">Home</Nav.Link>}
                    </Nav>
                    <Nav>
                        <Nav.Link style={{color:'white', fontWeight: 'bold'}} eventKey={2} href="/login">
                        {loggedIn ? user.firstName:'Log in'}
                        </Nav.Link>
                        {loggedIn ?
                        <Nav.Link style={{color:'white', fontWeight: 'bold'}} href="/" onClick={logOut}>Sign Out</Nav.Link>:
                        <Nav.Link style={{color:'white', fontWeight: 'bold'}} href="/register">Sign up</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        </div>

export default GuestNav;


