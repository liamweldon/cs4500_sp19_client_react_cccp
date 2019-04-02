import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Admin from './components/Admin';
import Home from './components/Home';
import ServiceCategoryService from './services/ServiceCategoryService'
import serviceCategories from './data/service-categories.mock.json'

class App extends Component {
    constructor(props) {
        super(props)
        this.serviceCategoryService = ServiceCategoryService.getInstance()
        this.state = {
            tabServiceCategories: serviceCategories
        }
    }

    componentDidMount() {
        this.serviceCategoryService.findAllServiceCategories(6)
            .then(serviceCategories => this.setState({
                tabServiceCategories: serviceCategories
            }))
    }
  render() {
    return (
      <div className="container-fluid">
        <h1>ServicesRus</h1>
        <Router>
          <div>
            <Link to="/admin">Admin</Link>
            <Route path="/admin" component={Admin} />
            <Link to="/home">Home</Link>
            <Route
                path="/home"
                exact
                render={() =>
                    <Home
                        tabServiceCategories={this.state.tabServiceCategories}/>}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
