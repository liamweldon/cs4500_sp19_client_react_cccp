import React from "react";
import ServiceNavigator from "../components/ServiceNavigator/ServiceNavigator";
import serviceService from "../components/ServiceNavigator/ServiceNavigator"
import "../components/table.scss";

class ServiceNavigatorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.serviceCategoryService = this.props.serviceCategoryService;
    this.serviceService = this.props.serviceService;
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    console.log("Mounting");
    console.log(this.findAllCategories());
    this.findAllCategories();
  }

  findAllCategories = () =>
    this.serviceCategoryService.findAllCategories().then(categories => {
      this.setState({
        categories: categories
      });
    }
  );

  render() {
    return <ServiceNavigator categories={this.state.categories}/>
  }
}

export default ServiceNavigatorContainer;