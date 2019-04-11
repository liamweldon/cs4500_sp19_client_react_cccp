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
  const id = this.props.match.params.id;
    this.userService.findUserById(id).then((provider) => {
      if (provider) {
        this.setState({
          provider
        });
      }
    });
  };

  getFAAs = () => {
    const id = this.props.match.params.id;
    this.faaService.findFAAsByUser(id).then((faas) => {
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
