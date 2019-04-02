import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import serviceCategories from './data/service-categories.mock.json'
import ServiceCategoryService from './services/ServiceCategoryService'

import Admin from './components/Admin';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1>ServicesRus</h1>
        <Router>
          <div>
            <Link to="/admin">Admin</Link>
            <Route path="/admin" component={Admin} />
            <Link to="/home">Home</Link>
            <Route path="/home" component={Home} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
