import React from "react";
import ServiceService from "../services/ServiceService";

class ServiceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.serviceService = ServiceService.getInstance();

    this.state = {
      services: [],
      service: {
        id: undefined,
        serviceName: undefined,
        serviceDescription: undefined
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
    return this.serviceService
      .createService(this.state.service)
      .then(this.findAllServices);
  };

  deleteService = () => {
    return this.serviceService
      .deleteService(this.state.service.id)
      .then(this.findAllServices);
  };

  updateService = () => {
    return this.serviceService
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
      <div className="container">
        <div className="row">
          <div className="col">
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
        <div className="row">
          <div className="col">
            <label>Service Title</label>
            <input
              type="text"
              className="form-control"
              defaultValue={this.state.service.serviceName}
              onChange={e => this.updateNameInForm(e)}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <label>Service Description</label>
            <input
              type="text"
              className="form-control"
              defaultValue={this.state.service.serviceDescription}
              onChange={e => this.updateDescriptionInForm(e)}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => this.props.history.push("/admin/services")}
            >
              Cancel
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() =>
                this.deleteService().then(() =>
                  this.props.history.push("/admin/services")
                )
              }
            >
              Delete
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                this.updateService().then(() =>
                  this.props.history.push("/admin/services")
                )
              }
            >
              Edit
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-success"
              onClick={() =>
                this.createService().then(() =>
                  this.props.history.push("/admin/services")
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
