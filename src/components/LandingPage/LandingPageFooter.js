import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';



export const LandingPageFooter = () => {


    {
        return (
            <div className="footer-area">
                <div className="footer-widget section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="single-widget single-widget1">
                                    <a href="index.html"><img
                                        src={require("../../../src/assets/landingpage/images/logo/newlogo.png")}
                                        alt=""/></a>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="single-widget single-widget2 my-5 my-md-0">
                                    <h5 className="mb-4">contact us</h5>
                                    <div className="d-flex">
                                        <div className="into-icon">
                                            <i className="fa fa-map-marker"></i>
                                        </div>
                                        <div className="info-text">
                                            <p>1234 Some St Boston, MA 94102, US 1.800.123.4567 </p>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="into-icon">
                                            <i className="fa fa-phone"></i>
                                        </div>
                                        <div className="info-text">
                                            <p>(123) 456 78 90</p>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="into-icon">
                                            <i className="fa fa-envelope-o"></i>
                                        </div>
                                        <div className="info-text">
                                            <p>support@whatscooking.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                {/*<div className="single-widget single-widget3">*/}
                                {/*<h5 className="mb-4">opening hours</h5>*/}
                                {/*<p>Monday ...................... Closed</p>*/}
                                {/*<p>Tue-Fri .............. 10 am - 12 pm</p>*/}
                                {/*<p>Sat-Sun ............... 8 am - 11 pm</p>*/}
                                {/*<p>Holidays ............. 10 am - 12 pm</p>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}
