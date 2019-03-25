import React from "react";
import Services from "./Services";
import "./table.scss";

class ServicesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.serviceService = this.props.service;
    this.state = {
      services: [],
      service: {id: 0, serviceName: "Service Name", serviceDescription: "Description"}
    };
  };

  componentDidMount() { 
    console.log("Mounting");
    return this.findAllServices() 
  };

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
    console.log("Passing services");
    console.log(this.state.services);
    return (<Services services = {this.state.services}
                      service = {this.state.service}
                      findAllServices = {this.findAllServices}
                      createService = {this.createService}
                      deleteService = {this.deleteService}
                      selectService = {this.selectService}
                      updateService = {this.updateService}
                      updateNameInForm = {this.updateNameInForm}
                      updateDescriptionInForm = {this.updateDescriptionInForm}/>);
  }
}

export default ServicesContainer;
