import React from 'react'

const ServiceCategoryList = categories => {
   console.log("CATEGORIES");
   console.log(categories);
   return (<ul className="list-group">
        {
            categories.map(serviceCategory =>
                <li key={serviceCategory.id}
                    className="list-group-item no-border">
                    <a href={`#${serviceCategory.id}`}>{serviceCategory.title}</a>
                </li>
            )
        }
    </ul>)
}
    

export default ServiceCategoryList