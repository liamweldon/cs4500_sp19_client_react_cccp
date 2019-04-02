import React from 'react';
import './Provider.scss';
import FAQs from './FAQs';

const Provider = ({provider, faas}) => (
  <div className="provider">
    <div className="row">
      <ul className="nav nav-pills">
        <li className="nav-item">
          <a className="nav-link" href="#about">
            About
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#reviews">
            Reviews
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#faqs">
            FAQs
          </a>
        </li>
      </ul>
    </div>
    <div className="row">
      <img src="https://picsum.photos/150/150" alt="car" />
      <h2 className="name">{provider.username}</h2>
    </div>
    <div className="description row">{provider.description}</div>
    <div className="row section" id="about">
      <div className="col overview">
        <h4> Overview </h4>
        <label>
          <i className="fa fa-trophy" />
          Hired {provider.timesHired} times
        </label>
        <label>
          <i className="fa fa-lock" />
          {provider.isBackgroundChecked ? 'Background checked' : ''}
        </label>
        <label>
          <i className="fa fa-users" />
          {provider.numEmployees} Employees
        </label>
        <label>
          <i className="fa fa-briefcase" />
          {provider.numYearsInBusiness} Years in business
        </label>
      </div>
      <div className="col payment">
        <h4> Payment Methods </h4>
      </div>
    </div>
    <div className="section" id="reviews">
      <h4> Reviews </h4>
    </div>
    <div className="row" id="faqs" />
    <h4> FAQs </h4>
    <FAQs faqs={faas} />
  </div>
);

export default Provider;
