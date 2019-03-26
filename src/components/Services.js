import React from "react";
import { Link } from "react-router-dom";
import ServiceService from "../services/ServiceService";
import "./table.scss";

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.serviceService = ServiceService.getInstance();
    this.state = {
      services: [],
      service: {id: 0, serviceName: "Service Name", serviceDescription: "Description"}
    };
  }

  componentDidMount() {this.findAllServices()};

  findAllServices = () => {
    this.serviceService.findAllServices().then(services =>
      this.setState({
        services: services
      })
    );
  };

  createService = () => {
    this.serviceService.createService(this.state.service).then(this.findAllServices)
  };

  deleteService = id => {
    this.serviceService.deleteService(id).then(this.findAllServices)
  };

  selectService = id => {
    this.serviceService.findServiceById(id).then(service => this.setState({
      service: service
    }))
  };

  updateService = () => {
    this.serviceService.updateService(this.state.service).then(this.findAllServices)
  };

  updateNameInForm = e => {
    this.setState({
       service: {
         id: this.state.service.id,
         serviceName: e.target.value,
         serviceDescription: this.state.service.serviceDescription
       }
    })
  };

  updateDescriptionInForm = e => {
    this.setState({
       service: {
         id: this.state.service.id,
         serviceName: this.state.service.serviceName,
         serviceDescription: e.target.value
       }
    })
  };

  render() {
    return (
      <div>
        <h3>Services</h3>
        <table className="table">
          <tbody>
              <tr>
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
            <tr>
              <td>
                <div className="row">
                  <div className="col-5">
                    <input onChange={e => this.updateNameInForm(e)} value={this.state.service.serviceName}/>
                  </div>
                  <div className="col-5">
                    <input onChange={e => this.updateDescriptionInForm(e)} value={this.state.service.serviceDescription}/>
                  </div>
                  <div className="col-1">
                    <button onClick={this.createService} style={{backgroundColor: "blue", borderColor: "blue"}}>
                      <i className="fa fa-plus" style={{color: "white", fontSize: "50px"}}/>
                    </button>
                  </div>
                  <div className="col-1">
                    <button onClick={this.updateService} style={{backgroundColor: "green", borderColor: "green"}}>
                      <i className="fa fa-check" style={{color: "white", fontSize: "50px"}}/>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            {this.state.services.map(service => (
              <tr key={service.id}>
                <td>
                  <div className="row">
                    <div className="col-5">
                      <Link to={"/admin/services/" + service.id}>
                        {service.serviceName}
                      </Link>
                    </div>
                    <div className="col-5">
                      <Link to={"/admin/services/" + service.id}>
                        {service.serviceDescription}
                      </Link>
                    </div>
                    <div className="col-1">
                      <button onClick={() => this.deleteService(service.id)} 
                        style={{backgroundColor: "red", borderColor: "red"}}>
                        <i className="fa fa-times" style={{color: "white", fontSize: "50px"}}/>
                      </button>
                    </div>
                    <div className="col-1">
                      <button onClick={() => this.selectService(service.id)}
                       style={{backgroundColor: "blue", borderColor: "blue"}}>
                        <i className="fa fa-edit" style={{color: "white", fontSize: "50px"}}/>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <td>

              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Services;
