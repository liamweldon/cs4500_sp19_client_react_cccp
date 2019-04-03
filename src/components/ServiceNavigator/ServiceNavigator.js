import React from 'react'
import ServiceService from '../../services/ServiceService'
import ServiceCategoryList from './ServiceCategoryList'
import ServiceCategorySectionList from './ServiceCategorySectionList'
import SearchBar from '../SearchBar'

const ServiceNavigator = ({categories}) =>
    <div>
        <div className="row">
            <div className="col-8">
                <SearchBar service={ServiceService.getInstance()}/>
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
        <div className="row">
            <div className="col-3">
                <ServiceCategoryList 
                    className="categories-list"
                    categories={categories}/>
            </div>
            <div className="col-9">
                <ServiceCategorySectionList
                    categories={categories}/>
            </div>
        </div>
    </div>

export default ServiceNavigator