import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';



export const LandingPageSearch = () => {


    {
        return (
            <section className="table-area section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-top2 text-center">
                                <h3>Find <span>a</span> recipe</h3>
                                <p><i>Time to get into a yummilicious world.</i></p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <form action="#">
                                <div className="input-group md-form form-sm form-2 pl-0">
                                    <input className="form-control my-0 py-1 amber-border" type="text"
                                           placeholder="Search" aria-label="Search"/>
                                    <div className="input-group-append">
    <span className="input-group-text amber lighten-3" id="basic-text1"><i className="fa fa-search"
                                                                           aria-hidden="true"></i></span>
                                    </div>
                                </div>

                                <div className="table-btn text-center">
                                    <a href="#" className="template-btn template-btn2 mt-4">Go</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );

    }
}
