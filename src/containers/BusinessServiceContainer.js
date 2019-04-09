import React from "react";
import ServiceService from "../services/ServiceService";
import SearchForServices from "../components/BusinessServiceScreen/SerachForServices";
import SelectedServices from "../components/BusinessServiceScreen/SelectedServices";
import ServiceQuestionAnswerSelect from "../components/BusinessServiceScreen/ServiceQuestionAnswerSelect";

import mockServices from "../components/BusinessServiceScreen/mockServices";

class BusinessServiceContainer extends React.Component {
  constructor(props) {
    super(props);
    this.serviceService = ServiceService.getInstance();

    this.state = {
      services: [],
      selectedServiceIds: []
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
    this.setState((prevState, props) => {
      return {
        selectedServiceIds: prevState.selectedServiceIds.push(serviceId)
      };
    });
  };

  deselectService = serviceId => {
    this.setState((prevState, props) => {
      return {
        selectedServiceIds: prevState.filter(
          currentServiceId => currentServiceId !== serviceId
        )
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
              selectService={() => this.selectService()}
              deselectService={() => this.deselectService()}
            />
            <div className="w-100">
              <br />
            </div>
            <SelectedServices
              selectedServices={this.state.services.filter(currentService =>
                this.state.selectedServiceIds.includes(currentService.id)
              )}
              selectService={() => this.selectService()}
              deselectService={() => this.deselectService()}
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
