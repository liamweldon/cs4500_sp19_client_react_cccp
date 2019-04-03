import React from 'react'
import SearchBar from './SearchBar'
import ServiceService from '../services/ServiceService';
import ServiceCategoryService from '../services/ServiceCategoryService';
import ServiceNavigatorContainer from '../containers/ServiceNavigatorContainer';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import ServiceCategoryPills from './ServiceCategoryPills/ServiceCategoryPills'
import serviceCategories from '../data/service-categories.mock.json'
import ServiceTabNavigator from './ServiceTabNavigator/ServiceTabNavigator'

const Home = ({history, pillServiceCategories}) =>
<div>
<div className="row">
    <div className="col-8">
    <h1>
    Find professionals near you.
</h1>
<SearchBar history={history}/>
</div>
<div className="col-3 text-r ight">
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
    <ServiceCategoryPills serviceCategories={pillServiceCategories}/>
</div>
<br/>
<br/>
<br/>
<ServiceTabNavigator
serviceCategories={serviceCategories}/>
</div>

export default Home