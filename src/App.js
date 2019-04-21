import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/Home";
import Admin from "./components/Admin";
import ServiceNavigatorContainer from "./containers/ServiceNavigatorContainer";
import ProviderContainer from "./containers/ProviderContainer";
import BusinessServiceContainer from "./containers/BusinessServiceContainer";
import BusinessContainer from "./containers/BusinessContainer";
import Login from "./components/Login/Login";
import Register from "./components/Register";

import serviceCategories from "./data/service-categories.mock.json";
import ServiceCategoryService from "./services/ServiceCategoryService";

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
        </Router>
      </div>
    );
  }
}

export default App;
