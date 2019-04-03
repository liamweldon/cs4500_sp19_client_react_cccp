import React from 'react'
import ServiceCategorySection from './ServiceCategorySection'

const ServiceCategorySectionList = ({categories}) =>
    <ul className="list-group no-border">
        {
            categories.map(serviceCategory =>
                <li key={serviceCategory.id}
                    className="list-group-item no-border">
                    <ServiceCategorySection
                        serviceCategory={serviceCategory}/>
                </li>
            )
        }
    </ul>

export default ServiceCategorySectionList