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
            <Link to="/service-questions"> Service Questions</Link>
            <span> | </span>
            <Link to="/providers"> Providers</Link>
            <span> | </span>
            <Link to="/provider/522"> Provider</Link>
            <span> | </span>
            <Link to="/business"> Business</Link>
            <span> | </span>
            <Link to="/admin"> Admin</Link>
            <span> | </span>
            <Link to="/login"> Login</Link>
            <span> | </span>
            <Link to="/register"> Sign Up</Link>
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
            <Route path="/provider/:id" exact component={ProviderContainer} />
            <Route path="/business" exact component={BusinessContainer} />
            <Route path="/admin" exact component={Admin} />
            <Route path="/login" exact render={() => <Login />} />
            <Route path="/register" exact render={() => <Register />} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
