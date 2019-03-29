import React from "react";

const ServiceDetails = ({
  services,
  service,
  findAllServices,
  createService,
  deleteService,
  selectService,
  updateService,
  updateNameInForm,
  updateDescriptionInForm
}) => (
  <div className="container">
    <div className="row">
      <div className="col">
        <h3>Service Details</h3>
        <select
          value={service.id}
          onChange={e => {
            selectService(e.target.value);
            this.props.history.push("/admin/services/" + e.target.value);
          }}
          className="form-control"
        >
          {services.map(currentService => {
            var selected = currentService.id === service.id ? true : false;
            return (
              <option
                value={currentService.id}
                key={currentService.id}
                defaultValue={selected}
              >
                {currentService.serviceName}
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
          defaultValue={service.serviceName}
          onChange={e => updateNameInForm(e)}
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
          defaultValue={service.serviceDescription}
          onChange={e => updateDescriptionInForm(e)}
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
            deleteService().then(() =>
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
            updateService().then(() =>
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
            createService().then(() =>
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

export default ServiceDetails;
