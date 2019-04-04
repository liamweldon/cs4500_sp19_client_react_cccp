import React from "react";
import ServiceNavigator from "../components/ServiceNavigator/ServiceNavigator";
import "../components/table.scss";

class ServiceNavigatorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.serviceCategoryService = this.props.serviceCategoryService;
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    this.findAllServiceCategories();
  }

  findAllServiceCategories = () =>
    this.serviceCategoryService.findAllServiceCategories().then(categories => {
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