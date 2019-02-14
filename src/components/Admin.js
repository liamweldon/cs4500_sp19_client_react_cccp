import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Services from './Services';
import FAQs from './FAQs';
import FAQDetails from './FAQDetails';

const Admin = () => (
    <div>
        <h2>Admin</h2>
        <Router>
            <div className="row">
                <div className="col-3">
                    <Link to="/admin/services">Services</Link>
                    <br />
                    <Link to="/admin/faqs">FAQs</Link>
                    <br />
                </div>
                <div className="col-9">
                    <Route path="/admin/faqs" exact component={FAQs} />
                    <Route path="/admin/services" exact component={Services} />
                    <Route path="/admin/faqs/:id" exact component={FAQDetails} />
                </div>
            </div>
        </Router>
    </div>
);

export default Admin;
