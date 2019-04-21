import React from 'react'
import ServiceProviderFilter from './ServiceProviderFilter'
import ServiceProviderList from './ServiceProviderList'
import serviceCategories from '../../data/service-categories.mock.json'
import SearchBar from "../SearchBar";

const ServiceProviderNavigator = ({serviceProviders}) =>
    <div>
        <div className="row">
            <div className="col-8">
                <SearchBar/>
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
                <ServiceProviderFilter
                    serviceQuestions={serviceCategories[0].questions}
                />
            </div>
            <div className="col-9">
                <ServiceProviderList
                    serviceProviders={serviceCategories[0].serviceProviders}/>
            </div>
        </div>
    </div>

export default ServiceProviderNavigator