import React from "react";
import "./table.scss";

const Services = ({
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
  <div>
    <h3>Services</h3>
    <table className="table">
      <tbody>
        <tr key={"header"}>
          <td>
            <div className="row">
              <div className="col-5">
                <h5>Service Name</h5>
              </div>
              <div className="col-5">
                <h5>Description</h5>
              </div>
            </div>
          </td>
        </tr>
        <tr key={"edit"}>
          <td>
            <div className="row">
              <div className="col-5">
                <input
                  onChange={e => updateNameInForm(e)}
                  value={service.serviceName}
                />
              </div>
              <div className="col-5">
                <input
                  onChange={e => updateDescriptionInForm(e)}
                  value={service.serviceDescription}
                />
              </div>
              <div className="col-1">
                <button
                  onClick={createService}
                  style={{ backgroundColor: "blue", borderColor: "blue" }}
                >
                  <i
                    className="fa fa-plus"
                    style={{ color: "white", fontSize: "50px" }}
                  />
                </button>
              </div>
              <div className="col-1">
                <button
                  onClick={updateService}
                  style={{ backgroundColor: "green", borderColor: "green" }}
                >
                  <i
                    className="fa fa-check"
                    style={{ color: "white", fontSize: "50px" }}
                  />
                </button>
              </div>
            </div>
          </td>
        </tr>
        {services.map(serv => (
          <tr className="serviceRow" key={serv.id}>
            <td>
              <div className="row">
                <div className="col-5">
                  <a href={"/admin/services/" + serv.id}>{serv.serviceName}</a>
                </div>
                <div className="col-5">
                  <a href={"/admin/services/" + serv.id}>
                    {serv.serviceDescription}
                  </a>
                </div>
                <div className="col-1">
                  <button
                    className={"delete-button" + serv.id}
                    onClick={() => deleteService(serv.id)}
                    style={{ backgroundColor: "red", borderColor: "red" }}
                  >
                    <i
                      className="fa fa-times"
                      style={{ color: "white", fontSize: "50px" }}
                    />
                  </button>
                </div>
                <div className="col-1">
                  <button
                    onClick={() => selectService(serv.id)}
                    style={{ backgroundColor: "blue", borderColor: "blue" }}
                  >
                    <i
                      className="fa fa-edit"
                      style={{ color: "white", fontSize: "50px" }}
                    />
                  </button>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Services;
