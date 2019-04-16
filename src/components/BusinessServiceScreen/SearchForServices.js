import React from "react";

class SearchForServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foundServices: [],
      searchValue: ""
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.selectedServiceIds.length !==
        this.props.selectedServiceIds.length ||
      prevState.searchValue !== this.state.searchValue
    ) {
      this.foundServicesFilter();
    }
  }

  updateSearchValue(event) {
    const updatedSearchValue = event.target.value ? event.target.value : "";
    this.setState((prevState, prevProps) => {
      return {
        searchValue: updatedSearchValue
      };
    });
  }

  nonSelectedServices() {
    return this.props.selectedServiceIds.length === 0
      ? this.props.services
      : this.props.services.filter(
          currentService =>
            !this.props.selectedServiceIds.includes(currentService.id)
        );
  }

  foundServicesFilter = () => {
    const searchValue = this.state.searchValue;
    const nonSelectedServices = this.nonSelectedServices();

    const updatedServices =
      searchValue === ""
        ? nonSelectedServices.slice(0, 5)
        : nonSelectedServices.filter(currentService =>
            currentService.serviceName
              .toLowerCase()
              .includes(searchValue.toLowerCase())
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
          className="form-control search-box-services"
          placeholder="Service Name"
          onChange={event => this.updateSearchValue(event)}
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
