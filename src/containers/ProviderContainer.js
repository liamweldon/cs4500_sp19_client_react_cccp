import React from 'react';
import UserService from '../services/UserService';
import FAQAnswerService from '../services/FAQAnswerService';
import '../components/table.scss';
import '../components/FAQs.scss';
import Provider from '../components/Provider/Provider.js';

class ProviderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.userService = UserService.getInstance();
    this.faaService = FAQAnswerService.getInstance();
    this.state = {provider: {}, faas: []};
  }

  getProvider = () => {
    // TODO in the future, we will find by the ID in the path
    this.userService.findUserById('522').then((provider) => {
      if (provider) {
        this.setState({
          provider
        });
      }
    });
  };

  getFAAs = () => {
    // in the future, we will find by the provider's ID in the path
    this.faaService.findFAAsByUser('522').then((faas) => {
      if (faas) {
        this.setState({
          faas
        });
      }
    });
  };

  componentDidMount() {
    this.getProvider();
    this.getFAAs();
  }

  render() {
    return <Provider provider={this.state.provider} faas={this.state.faas} />;
  }
}

export default ProviderContainer;
