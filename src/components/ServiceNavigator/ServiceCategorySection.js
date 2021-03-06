import React from 'react'
import ServiceCards from './ServiceCards'
const ServiceCategorySection = ({serviceCategory}) => {
    return (<div>
        <a id={serviceCategory.id}/>
        <h2>{serviceCategory.serviceCategoryName}</h2>
            <div>
                <ServiceCards
                    services={serviceCategory.services.slice(0,4)}/>
                <div className="row">
                    {
                        serviceCategory.services.map(service =>
                            <div key={service.id}
                                className="col-6 list-group-item no-border">
                                <a href="/provider"> {service.serviceName}</a>
                            </div>
                        )
                    }
                </div>
            </div>
    </div>)
}

export default ServiceCategorySection