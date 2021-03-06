import React from 'react';
import './business.scss';

const Business = ({business, onChange, update}) => (
  <div className="business">
    <h1>Business</h1>
    <div className="label">Business Name</div>
    <input value={business.businessName} name="businessName" onChange={onChange} />
    <div className="label">Years In Business</div>
    <input value={business.numYearsInBusiness} name="numYearsInBusiness" onChange={onChange} />
    <div className="label">Number of employees</div>
    <input value={business.numEmployees} name="numEmployees" onChange={onChange} />
    <div className="label">Email</div>
    <input value={business.businessEmail} name="businessEmail" onChange={onChange} />
    <h4>Business Address (optional)</h4>
    <div className="label">Street</div>
    <input value={business.businessStreet} name="businessStreet" onChange={onChange} />
    <div className="label">City</div>
    <input value={business.businessCity} name="businessCity" onChange={onChange} />
    <div className="label">State</div>
    <input value={business.businessState} name="businessState" onChange={onChange} />
    <div className="label">Zip</div>
    <input value={business.businessZipcode} name="businessZipcode" onChange={onChange} /> <h4>Payment methods</h4>
    <ul class="list-group">
      <li class="list-group-item">
        <label>
          <input
            type="checkbox"
            name="Credit Card"
            onChange={onChange}
            checked={
              business && business.businessAcceptedPayments && business.businessAcceptedPayments.includes('Credit Card')
            }
          />
          Credit Card
        </label>
      </li>
      <li class="list-group-item">
        <label>
          <input
            type="checkbox"
            name="Cash"
            onChange={onChange}
            checked={
              business && business.businessAcceptedPayments && business.businessAcceptedPayments.includes('Cash')
            }
          />
          Cash
        </label>
      </li>
      <li class="list-group-item">
        <label>
          <input
            type="checkbox"
            name="Check"
            onChange={onChange}
            checked={
              business && business.businessAcceptedPayments && business.businessAcceptedPayments.includes('Check')
            }
          />
          Check
        </label>
      </li>
      <li class="list-group-item">
        <label>
          <input
            type="checkbox"
            name="Venmo"
            onChange={onChange}
            checked={
              business && business.businessAcceptedPayments && business.businessAcceptedPayments.includes('Venmo')
            }
          />
          Venmo
        </label>
      </li>
      <li class="list-group-item">
        <label>
          <input
            type="checkbox"
            name="Paypal"
            onChange={onChange}
            checked={
              business && business.businessAcceptedPayments && business.businessAcceptedPayments.includes('Paypal')
            }
          />
          Paypal
        </label>
      </li>
      <li class="list-group-item">
        <label>
          <input
            type="checkbox"
            name="Square"
            onChange={onChange}
            checked={
              business && business.businessAcceptedPayments && business.businessAcceptedPayments.includes('Square')
            }
          />
          Square
        </label>
      </li>
    </ul>
    <h4>Social Media</h4>
    <div className="label">Facebook</div>
    <input value={business.facebook} name="facebook" onChange={onChange} />
    <div className="label">Instagram</div>
    <input value={business.instagram} name="instagram" onChange={onChange} />
    <div className="label">Twitter</div>
    <input value={business.twitter} name="twitter" onChange={onChange} />
    <button onClick={update}>Save</button>
  </div>
);
export default Business;
