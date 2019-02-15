import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Services from './Services';
import FAQs from './FAQs';
import FAQDetails from './FAQDetails';
import ServiceDetails from "./ServiceDetails";
import Users from './Users';
import ServiceQuestions from './ServiceQuestions';
import ServiceQuestionDetails from './ServiceQuestionDetails';
import ServiceAnswers from './ServiceAnswers';
import ServiceAnswerDetails from './ServiceAnswerDetails';


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
                    <Link to="/admin/users">Users</Link>
                    <br />
                    <Link to="/admin/service-questions">Service Questions</Link>
                    <br />
                    <Link to="/admin/service-answers">Service Answers</Link>
                    <br />
                </div>
                <div className="col-9">
                    <Route path="/admin/faqs" exact component={FAQs} />
                    <Route path="/admin/services" exact component={Services} />
                    <Route path="/admin/services/:id" exact component={ServiceDetails} />
                    <Route path="/admin/users" exact component={Users} />
                    <Route path="/admin/faqs/:id" exact component={FAQDetails} />
                    <Route path="/admin/service-questions" exact component={ServiceQuestions} />
                    <Route path="/admin/service-questions/:id" exact component={ServiceQuestionDetails} />
                    <Route path="/admin/service-answers" exact component={ServiceAnswers} />
                    <Route path="/admin/service-answers/:id" exact component={ServiceAnswerDetails} />
                </div>
            </div>
        </Router>
    </div>
);

export default Admin;
