import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import FAQAnswersContainer from "./faq_answers/FAQAnswersContainer";
import FAQsContainer from '../containers/FAQsContainer';
import FAQDetailsContainer from '../containers/FAQDetailsContainer';
import ServicesContainer from '../containers/ServicesContainer';
import UserDetailsContainer from '../containers/UserDetailsContainer';
import UsersContainer from '../containers/UsersContainer';
import ServiceQuestionsContainer from '../containers/ServiceQuestionsContainer';
import ServiceAnswersContainer from '../containers/ServiceAnswersContainer';
import ServiceService from '../services/ServiceService';
import ServiceDetails from './ServiceDetails';
import ServiceQuestionDetailsContainer from '../containers/ServiceQuestionDetailsContainer';
import ServiceAnswerDetails from './ServiceAnswerDetails';
import FAQAnswerDetails from './faq_answers/FAQAnswerDetails';

const Admin = () => (
    <div>
        <h2>Admin</h2>
        <Router>
            <div className="row">
                <div className="col-3">
                    <Link to="/admin/services">Services</Link>
                    <br/>
                    <Link to="/admin/faqs">FAQs</Link>
                    <br/>
                    <Link to="/admin/faas">FAQ Answers</Link>
                    <br/>
                    <Link to="/admin/users">Users</Link>
                    <br/>
                    <Link to="/admin/service-questions">Service Questions</Link>
                    <br/>
                    <Link to="/admin/service-answers">Service Answers</Link>
                    <br/>
                </div>
                <div className="col-9">
                    <Route path="/admin/faqs" exact component={FAQsContainer}/>
                    <Route path="/admin/faas" exact component={FAQAnswersContainer}/>
                    <Route path="/admin/faas/:id" exact component={FAQAnswerDetails}/>
                    <Route path="/admin/services" exact
                           render={() => <ServicesContainer service={ServiceService.getInstance()}/>}/>
                    <Route path="/admin/services/:id" exact component={ServiceDetails}/>
                    <Route path="/admin/users" exact component={UsersContainer}/>
                    <Route path="/admin/users/:id" exact component={UserDetailsContainer}/>
                    <Route path="/admin/faqs/:id" exact component={FAQDetailsContainer}/>
                    <Route path="/admin/service-questions" exact component={ServiceQuestionsContainer}/>
                    <Route path="/admin/service-questions/:id" exact component={ServiceQuestionDetailsContainer}/>
                    <Route path="/admin/service-answers" exact component={ServiceAnswersContainer}/>
                    <Route path="/admin/service-answers/:id" exact component={ServiceAnswerDetails}/>
                </div>
            </div>
        </Router>
    </div>
);

export default Admin;

