<<<<<<< HEAD
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import serviceCategories from "./data/service-categories.mock.json";
import ServiceCategoryService from "./services/ServiceCategoryService";

import Admin from "./components/Admin";
import Home from "./components/Home";
import ServiceNavigatorContainer from "./containers/ServiceNavigatorContainer";
import ProviderContainer from "./containers/ProviderContainer";
import BusinessServiceContainer from "./containers/BusinessServiceContainer";
=======
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import serviceCategories from './data/service-categories.mock.json'
import ServiceCategoryService from './services/ServiceCategoryService'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Admin from './components/Admin';
import Home from './components/Home';
import BusinessContainer from './containers/BusinessContainer';
import ServiceNavigatorContainer from './containers/ServiceNavigatorContainer'
import ProviderContainer from './containers/ProviderContainer'
import Login from './components/Login/Login'
import Register from './components/Register'
>>>>>>> master

class App extends Component {
  constructor(props) {
    super(props);
    this.serviceCategoryService = ServiceCategoryService.getInstance();
    this.state = {
      pillServiceCategories: serviceCategories
    };
  }
  componentDidMount() {
    this.serviceCategoryService
      .findAllServiceCategories(4)
      .then(serviceCategories =>
        this.setState({
          pillServiceCategories: serviceCategories
        })
      );
  }

<<<<<<< HEAD
  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Link to="/home">Home</Link>
            <span> | </span>
            <Link to="/services"> Services</Link>
            <span> | </span>
            <Link to="/providers"> Providers</Link>
            <span> | </span>
            <Link to="/provider"> Provider</Link>
            <span> | </span>
            <Link to="/admin"> Admin</Link>
            <span> | </span>
            <Link to="/service-questions"> Service Questions</Link>
            <br />
            <br />
            <br />
            <Route
              path="/home"
              exact
              render={() => (
                <Home
                  pillServiceCategories={this.state.pillServiceCategories}
                />
              )}
            />
            <Route path="/admin" exact component={Admin} />
            <Route path="/provider" exact component={ProviderContainer} />
            <Route
              path="/services"
              exact
              render={() => (
                <ServiceNavigatorContainer
                  serviceCategoryService={this.serviceCategoryService}
                />
              )}
            />
            <Route
              path="/service-questions"
              exact
              component={BusinessServiceContainer}
            />
          </div>
=======
    render() {
        return (
            <div className="container">
            <Router>
            <div>
            <Link to="/home">Home</Link> |
            <Link to="/services"> Services</Link> |
            <Link to="/providers"> Providers</Link> |
            <Link to="/provider/522"> Provider</Link> |
            <Link to="/business"> Business</Link> |
            <Link to="/admin"> Admin</Link>  |
            <Link to="/login"> Login</Link> |
            <Link to="/register"> Sign Up</Link>
            <br/>
            <br/>
            <br/>
        <Route
        path="/home"
        exact
        render={() => <Home pillServiceCategories={this.state.pillServiceCategories}/>}/>
        <Route
        path="/admin"
        exact
          component={Admin}/>
        <Route path="/provider/:id"
        exact
        component={ProviderContainer}/>
        <Route
        path="/login"
        exact
        render={() => <Login/>}
        />
        <Route
        path="/register"
        exact
        render={() => <Register/>}
        />
        <Route path="/services" exact
             render={() => <ServiceNavigatorContainer
               serviceCategoryService={this.serviceCategoryService}/>}/>
        <Route path="/business" exact component={BusinessContainer}/>
        </div>
>>>>>>> master
        </Router>
      </div>
    );
  }
}

export default App;
