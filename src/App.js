import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import serviceCategories from './data/service-categories.mock.json'
import ServiceCategoryService from './services/ServiceCategoryService'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Admin from './components/Admin';
import Home from './components/Home';

class App extends Component {
    constructor(props) {
        super(props)
        this.serviceCategoryService = ServiceCategoryService.getInstance()
        this.state = {
            pillServiceCategories: serviceCategories
        }
    }


    getServiceCategories = () => {
    this.serviceCategoryService.findAllServiceCategories(4).then((serviceCategories) => {
    this.setState({
                      pillServiceCategories: serviceCategories
                  });
            });
        };
    componentDidMount() {
        this.getServiceCategories();
    }
    render() {
        return (
            <div className="container">
            <Router>
            <div>
            <Link to="/home">Home</Link> |
            <Link to="/services"> Services</Link> |
            <Link to="/providers"> Providers</Link> |
            <Link to="/admin"> Admin</Link> |
            <Link to="/providers"> Provider</Link>
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
        </div>
        </Router>
        {/*<h1>ServicesRus</h1>*/}
    </div>
    );
    }
}

export default App;