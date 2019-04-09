import React from "react";
import ServiceService from "../services/ServiceService";
import SearchForServices from "../components/BusinessServiceScreen/SerachForServices";
import SelectedServices from "../components/BusinessServiceScreen/SelectedServices";
import ServiceQuestionAnswerSelect from "../components/BusinessServiceScreen/ServiceQuestionAnswerSelect";

class BusinessServiceContainer extends React.Component {
  constructor(props) {
    super(props);
    this.serviceService = ServiceService.getInstance();

    this.state = {
      services: [],
      selectedServices: []
    };
  }

  componentDidMount() {
    console.log("business container mounted");
    this.setState((prevState, props) => {
      return {
        services: this.serviceService.findAllServices(),
        selectedServices: []
      };
    });
  }

  selectService = serviceId => {
    this.setState((prevState, props) => {
      return {
        selectedServices: prevState.selectedServices.push(serviceId)
      };
    });
  };

  deselectService = serviceId => {
    this.setState((prevState, props) => {
      return {
        selectedServices: prevState.filter(
          currentServiceId => currentServiceId !== serviceId
        )
      };
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4">
            <SearchForServices
              services={this.state.services}
              selectedServices={this.state.selectedServices}
              selectService={() => this.selectService()}
              deselectService={() => this.deselectService()}
            />
            <div class="w-100">
              <br />
            </div>
            <SelectedServices
              services={this.state.services}
              selectedServices={this.state.selectedServices}
              selectService={() => this.selectService()}
              deselectService={() => this.deselectService()}
            />
          </div>
          <div className="col-sm-8">
            <ServiceQuestionAnswerSelect
              services={this.state.services}
              selectedServices={this.state.selectedServices}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BusinessServiceContainer;
