import React from "react";

const SelectedServices = props => {
  const selectedServices = props.selectedServices;

  const selectedServiceStyle = {
    display: "flex",
    justifyContent: "space-between"
  };

  return (
    <div>
      <h4>Selected Services</h4>
      <ul className="list-group">
        {selectedServices.map(currentSelectedService => (
          <li
            key={currentSelectedService.id}
            className="list-group-item"
            style={selectedServiceStyle}
          >
            <div>{currentSelectedService.serviceName}</div>
            <i class="far fa-times" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedServices;
