import React from "react";
import ServiceService from "../services/ServiceService";
import SearchForServices from "../components/BusinessServiceScreen/SearchForServices";
import SelectedServices from "../components/BusinessServiceScreen/SelectedServices";
import ServiceQuestionAnswerSelect from "../components/BusinessServiceScreen/ServiceQuestionAnswerSelect";

import mockServices from "../components/BusinessServiceScreen/mockServices";

class BusinessServiceContainer extends React.Component {
  constructor(props) {
    super(props);
    this.serviceService = ServiceService.getInstance();

    this.state = {
      services: [],
      selectedServiceIds: [-1]
    };
  }

  componentDidMount() {
    this.setState((prevState, props) => {
      return {
        services: mockServices
      };
    });
    /*
    this.serviceService.findAllServices().then(services =>
      this.setState((prevState, props) => {
        return {
          services: services
        };
      })
    );
    */
  }

  selectService = serviceId => {
    if (!this.state.selectedServiceIds.includes(serviceId)) {
      this.setState((prevState, props) => {
        return {
          selectedServiceIds: prevState.selectedServiceIds.push(serviceId)
        };
      });
    }
  };

  deselectService = serviceId => {
    if (this.state.selectedServiceIds.includes(serviceId)) {
      this.setState((prevState, props) => {
        return {
          selectedServiceIds: prevState.selectedServiceIds.filter(
            currentServiceId => currentServiceId !== serviceId
          )
        };
      });
    }
  };

  render() {
    const selectedServices = this.state.services.filter(currentService => {
      // why the FUCK is this a number
      // @TODO
      console.log(this.state.selectedServiceIds);
      return this.state.selectedServiceIds.includes(currentService.id);
    });

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-5">
            <SearchForServices
              services={this.state.services}
              selectedServiceIds={this.state.selectedServiceIds}
              selectService={serviceId => this.selectService(serviceId)}
            />
            <div className="w-100">
              <br />
            </div>
            <SelectedServices
              selectedServices={selectedServices}
              deselectService={serviceId => this.deselectService(serviceId)}
            />
          </div>
          <div className="col-sm-7s">
            <ServiceQuestionAnswerSelect
              services={this.state.services}
              selectedServiceIds={this.state.selectedServiceIds}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BusinessServiceContainer;
