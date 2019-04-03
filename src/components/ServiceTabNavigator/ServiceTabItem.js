import React from 'react'

const ServiceTabItem = ({services}) =>
<div className="row">
    {
        services.map((service, index) =>
            <div key={service.id}
        className="card col-4 no-border">
        <img src={`https://picsum.photos/300/200?image=${Math.floor(Math.random() * 100)}`} className="card-img-top" alt="..."/>
    <div className="card-body">
    <h5 className="card-title">
    <a href="/providers">{service.title}</a>
    </h5>
    </div>
    </div>
)
}
</div>

export default ServiceTabItem
