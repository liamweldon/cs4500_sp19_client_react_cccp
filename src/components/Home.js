import React from 'react'
import SearchBar from './SearchBar'
import ServiceService from '../services/ServiceService';
import ServiceCategoryService from '../services/ServiceCategoryService';
import ServiceNavigatorContainer from '../containers/ServiceNavigatorContainer';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import ServiceTabNavigator from './ServiceTabNavigator'


const Home = ({history, tabServiceCategories}) =>
    <div>
        <div className="row">
            <div className="col-8">
                <h1>
                    Find professionals near you.
                </h1>
                <SearchBar history={history} service={ServiceService.getInstance()}/>
            </div>
            <div className="col-3 text-right">
                <a href="#">Sign up</a>
            </div>
            <div className="col-1">
                <a href="#">Log in</a>
            </div>
        </div>

        <br/>
        <br/>
        <br/>
        <div>
            <p>PILLS</p>
        </div>
        <div>
          <Link to="/home/services/">Services</Link>
          <Route path="/home/services/" exact
                 render={() => <ServiceNavigatorContainer 
                                ServiceService={ServiceService.getInstance()}
                                serviceCategoryService={ServiceCategoryService.getInstance()}/>}/>
        </div>
        <br/>
        <br/>
        <br/>
        <p>SERVICE TABS</p>
        <ServiceTabNavigator serviceCategories={tabServiceCategories}/>
    </div>



export default Home
