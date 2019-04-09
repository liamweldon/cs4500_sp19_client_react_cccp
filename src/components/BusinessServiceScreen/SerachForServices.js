import React from "react";

class SearchForServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: props.services,
      selectedServiceIds: props.selectedServiceIds
    };
  }

  servicesFilter = event => {
    const updatedServices = this.state.services.filter(
      currentService =>
        currentService.serviceName.includes(event.target.value) &&
        !this.state.selectedServiceIds.includes(currentService.id)
    );
    this.setState((prevState, props) => {
      return {
        services: updatedServices
      };
    });
  };

  render() {
    const selectedServiceStyle = {
      display: "flex",
      justifyContent: "space-between"
    };

    return (
      <div>
        <h4>Search For Services</h4>
        <input
          type="tesxt"
          className="form-control"
          placeholder="Service Name"
          onChange={this.servicesFilter}
        />
        <ul className="list-group">
          {this.state.services.map(currentSelectedService => (
            <li
              key={currentSelectedService.id}
              className="list-group-item"
              style={selectedServiceStyle}
            >
              <div>{currentSelectedService.serviceName}</div>
              <i className="fa fa-check" />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SearchForServices;
