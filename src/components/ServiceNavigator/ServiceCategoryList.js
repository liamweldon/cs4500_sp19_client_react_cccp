import React from 'react'

const ServiceCategoryList = ({categories}) =>
  <div style={{ position: "fixed"}}>
   <ul className="list-group">
        {
            categories.map(serviceCategory =>
                <li key={serviceCategory.id}
                    className="list-group-item no-border">
                    <a href={`#${serviceCategory.id}`}>{serviceCategory.serviceCategoryName}</a>
                </li>
            )
        }
    </ul>
  </div>
    

export default ServiceCategoryList