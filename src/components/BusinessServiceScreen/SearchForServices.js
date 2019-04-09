import React from "react";

class SearchForServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foundServices: []
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedServiceIds.length !=
      this.props.selectedServiceIds.length
    ) {
      this.setState((prevState, props) => {
        return {
          foundServices: this.nonSelectedServices()
        };
      });
    }
  }

  nonSelectedServices() {
    return this.props.selectedServiceIds.length === 0
      ? this.props.services
      : this.props.services.filter(
          currentService =>
            !this.props.selectedServiceIds.includes(currentService.id)
        );
  }

  foundServicesFilter = event => {
    const searchText = event.target.value;
    const nonSelectedServices = this.nonSelectedServices();

    const updatedServices =
      searchText === ""
        ? nonSelectedServices.slice(0, 5)
        : nonSelectedServices.filter(currentService =>
            currentService.serviceName.includes(searchText)
          );

    this.setState((prevState, props) => {
      return {
        foundServices: updatedServices
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
          type="text"
          className="form-control"
          placeholder="Service Name"
          onChange={event => this.foundServicesFilter(event)}
        />
        <ul className="list-group">
          {this.state.foundServices.map(currentService => (
            <li
              key={currentService.id}
              className="list-group-item"
              style={selectedServiceStyle}
            >
              <div>{currentService.serviceName}</div>
              <div
                onClick={() =>
                  this.props.addToSelectedServices(currentService.id)
                }
              >
                <i className="fa fa-check" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SearchForServices;
