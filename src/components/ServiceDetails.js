import React from "react";
import ServiceService from "../services/ServiceService";

class ServiceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.serviceService = ServiceService.getInstance();

    this.state = {
      services: [],
      service: {
        title: undefined,
        id: undefined
      }
    };
  }

  componentDidMount() {
    this.serviceService.findAllServices().then(services => {
      const currentServiceId = this.props.match.params.id;
      this.selectService(currentServiceId);

      // this.props.history.push("/admin/services/" + currentService);
      this.setState({
        services: services
      });
    });
  }

  selectService = id =>
    this.serviceService.findServiceById(id).then(service => {
      // this.props.history.push("/admin/services/" + id);
      this.setState({
        service: service
      });
    });

  render() {
    return (
      <div>
        <h3>Service Details</h3>
        <select
          value={this.state.service.id}
          onChange={e => this.selectService(e.target.value)}
          className="form-control"
        >
          {this.state.services.map(service => {
            var selected = service.id === this.state.service.id ? true : false;
            return (
              <option
                value={service.id}
                key={service.id}
                defaultValue={selected}
              >
                {service.serviceName}
              </option>
            );
          })}
        </select>
        <label>Service Title</label>
        <br />
        <input
          className="form-control"
          type="text"
          value={this.state.service.serviceName}
          onChange={() => {
            console.log("input changed");
          }}
        />
      </div>
    );
  }
}

export default ServiceDetails;
