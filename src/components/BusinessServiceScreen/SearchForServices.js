import React from "react";

class SearchForServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foundServices: []
    };
  }

  componentDidMount() {
    this.setState((prevState, props) => {
      return {
        foundServices: props.services.slice(0, 5)
      };
    });
  }

  servicesFilter = event => {
    const updatedServices = this.props.services.filter(currentService =>
      currentService.serviceName.includes(event.target.value)
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
          onChange={event => this.servicesFilter(event)}
        />
        <ul className="list-group">
          {this.state.foundServices.map(currentService => (
            <li
              key={currentService.id}
              className="list-group-item"
              style={selectedServiceStyle}
            >
              <div>{currentService.serviceName}</div>
              <div onClick={() => this.props.selectService(currentService.id)}>
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
