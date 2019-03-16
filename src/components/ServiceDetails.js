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

      this.setState({
        services: services
      });
    });
  }

  createService = () => {
    this.serviceService
      .createService(this.state.service)
      .then(this.findAllServices);
  };

  deleteService = id => {
    this.serviceService.deleteService(id).then(this.findAllServices);
  };

  updateService = () => {
    this.serviceService
      .updateService(this.state.service)
      .then(this.findAllServices);
  };

  selectService = id => {
    this.serviceService.findServiceById(id).then(service =>
      this.setState({
        service: service
      })
    );
  };

  updateNameInForm = e => {
    this.setState({
      service: {
        id: this.state.service.id,
        serviceName: e.target.value,
        serviceDescription: this.state.service.serviceDescription
      }
    });
  };

  updateDescriptionInForm = e => {
    this.setState({
      service: {
        id: this.state.service.id,
        serviceName: this.state.service.serviceName,
        serviceDescription: e.target.value
      }
    });
  };

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col">
            <h3>Service Details</h3>
            <select
              value={this.state.service.id}
              onChange={e => {
                this.selectService(e.target.value);
                this.props.history.push("/admin/services/" + e.target.value);
              }}
              className="form-control"
            >
              {this.state.services.map(service => {
                var selected =
                  service.id === this.state.service.id ? true : false;
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
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col">
            <label>Service Title</label>
            <input
              type="text"
              class="form-control"
              //value={this.state.service.serviceName}
            />
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col">
            <button
              type="button"
              class="btn btn-danger"
              onClick={() => this.props.history.push("/admin/services")}
            >
              Cancel
            </button>
          </div>
          <div class="col">
            <button
              type="button"
              class="btn btn-danger"
              onClick={() =>
                this.deleteService().then(() =>
                  this.props.history.push("/admin/services")
                )
              }
            >
              Delete
            </button>
          </div>
          <div class="col">
            <button
              type="button"
              class="btn btn-primary"
              onClick={() =>
                this.updateService().then(() =>
                  this.props.history.push("/admin/services")
                )
              }
            >
              Edit
            </button>
          </div>
          <div class="col">
            <button
              type="button"
              class="btn btn-success"
              onClick={() =>
                this.createService().then(
                  () => this.props.history.push("/admin/services")
                  //<Redirect to='/dashboard' />
                )
              }
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ServiceDetails;
