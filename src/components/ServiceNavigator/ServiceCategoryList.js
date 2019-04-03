import React from 'react'

const ServiceCategoryList = ({categories}) => {
   return (<ul className="list-group">
        {
            categories.map(serviceCategory =>
                <li key={serviceCategory.id}
                    className="list-group-item no-border">
                    <a href={`#${serviceCategory.id}`}>{serviceCategory.serviceCategoryName}</a>
                </li>
            )
        }
    </ul>)
}
    

export default ServiceCategoryList