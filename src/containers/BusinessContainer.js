import React from 'react';
import UserService from '../services/UserService';
import Business from '../components/Business.js';
import {Redirect} from 'react-router-dom';

class BusinessContainer extends React.Component {
  constructor(props) {
    super(props);
    this.userService = UserService.getInstance();
    this.state = {
      business: {
        businessName: '',
        businessEmail: '',
        businessStreet: '',
        businessCity: '',
        businessState: '',
        businessZipcode: '',
        facebook: '',
        instagram: '',
        twitter: '',
        description: '',
        timesHired: '',
        isBackgroundChecked: '',
        numEmployees: '',
        numYearsInBusiness: '',
        businessAcceptedPayments: []
      },
      redirect: false
    };
  }

  getBusiness = () => {
    this.userService.findUserById('522').then((provider) => {
      if (provider) {
        this.setState({
          business: provider
        });
      }
    });
  };

  componentDidMount() {
    this.getBusiness();
  }

  update = (business) => {
    this.userService.updateUser(this.state.business).then((provider) => {
      if (provider) {
        this.setState({redirect: true});
      }
    });
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (target.type === 'checkbox') {
      if (target.checked) {
        this.setState({
          business: {
            ...this.state.business,
            businessAcceptedPayments: [...this.state.business.businessAcceptedPayments, target.name]
          }
        });
      } else {
        if (this.state.business.businessAcceptedPayments.includes(target.name)) {
          this.setState({
            business: {
              ...this.state.business,
              businessAcceptedPayments: this.state.business.businessAcceptedPayments.filter(
                (payment) => payment === target.name
              )
            }
          });
        }
      }
    } else {
      this.setState({
        business: {...this.state.business, [name]: value}
      });
    }
  };

  render() {
    if (this.state.redirect) return <Redirect to="/profile" />;
    return <Business business={this.state.business} onChange={this.handleChange} update={this.update} />;
  }
}

export default BusinessContainer;
