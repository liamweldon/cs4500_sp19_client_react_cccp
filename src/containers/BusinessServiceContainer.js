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
      selectedServiceIds: [],
      clickedSelectedService: undefined
    };
  }

  componentDidMount() {
    /*
    this.serviceService.findAllServices().then(services =>
      this.setState((prevState, props) => {
        return {
          services: services
        };
      })
    );
    */
    this.setState((prevState, props) => {
      return {
        services: mockServices
      };
    });
  }

  addToSelectedServices = serviceId => {
    if (!this.state.selectedServiceIds.includes(serviceId)) {
      this.setState((prevState, props) => {
        return {
          selectedServiceIds: [...prevState.selectedServiceIds, serviceId]
        };
      });
    }
  };

  removeFromSelectedServices = serviceId => {
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

  clickASelectedService = serviceId => {
    this.setState((prevState, props) => {
      return {
        clickedSelectedService: serviceId
      };
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-5">
            <SearchForServices
              services={this.state.services}
              selectedServiceIds={this.state.selectedServiceIds}
              addToSelectedServices={serviceId =>
                this.addToSelectedServices(serviceId)
              }
            />
            <div className="w-100">
              <br />
            </div>
            <SelectedServices
              selectedServices={this.state.services.filter(currentService =>
                this.state.selectedServiceIds.includes(currentService.id)
              )}
              removeFromSelectedServices={serviceId =>
                this.removeFromSelectedServices(serviceId)
              }
              clickASelectedService={serviceId =>
                this.clickASelectedService(serviceId)
              }
            />
          </div>
          <div className="col-sm-7s">
            <ServiceQuestionAnswerSelect
              clickedSelectedService={this.state.clickedSelectedService}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BusinessServiceContainer;
