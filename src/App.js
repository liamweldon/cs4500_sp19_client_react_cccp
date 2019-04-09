import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import serviceCategories from './data/service-categories.mock.json'
import ServiceCategoryService from './services/ServiceCategoryService'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Admin from './components/Admin';
import Home from './components/Home';
import ServiceNavigatorContainer from './containers/ServiceNavigatorContainer'
import ProviderContainer from './containers/ProviderContainer'
import Login from './components/Login/Login'
import Register from './components/Register'
import Profile from './components/Profile'

class App extends Component {
    constructor(props) {
        super(props)
        this.serviceCategoryService = ServiceCategoryService.getInstance()
        this.state = {
            pillServiceCategories: serviceCategories
        }
    }
    componentDidMount() {
        this.serviceCategoryService.findAllServiceCategories(4)
            .then(serviceCategories => this.setState({
            pillServiceCategories: serviceCategories
        }))
    }

    render() {
        return (
            <div className="container">
            <Router>
            <div>
            <Link to="/home">Home</Link> |
            <Link to="/services"> Services</Link> |
            <Link to="/providers"> Providers</Link> |
            <Link to="/provider"> Provider</Link> |
            <Link to="/admin"> Admin</Link>  |
            <Link to="/login"> Login</Link> |
            <Link to="/register"> Sign Up</Link> |
            <Link to="/profile"> Profile</Link>
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
        <Route
        path="/provider"
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
        <Route
        path="/profile"
        exact
        render={() => <Profile/>}
        />
        <Route path="/services" exact
             render={() => <ServiceNavigatorContainer
                            serviceCategoryService={this.serviceCategoryService}/>}/>
        </div>
        </Router>
    </div>
    );
    }
}

export default App;
