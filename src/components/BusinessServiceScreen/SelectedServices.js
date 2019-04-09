import React from "react";

const SelectedServices = props => {
  const serviceItemStyle = {
    display: "flex",
    justifyContent: "space-between"
  };

  const selectedServices = props.selectedServices;

  return (
    <div>
      <h4>Selected Services</h4>
      <ul className="list-group">
        {selectedServices.map(currentSelectedService => (
          <li
            key={currentSelectedService.id}
            className="list-group-item"
            style={serviceItemStyle}
            active={props.clickedSelectedService === currentSelectedService.id}
          >
            <div
              onClick={() =>
                props.clickASelectedService(currentSelectedService.id)
              }
            >
              {currentSelectedService.serviceName}
            </div>
            <div
              onClick={() =>
                props.removeFromSelectedServices(currentSelectedService.id)
              }
            >
              <i class="fa fa-times" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedServices;
