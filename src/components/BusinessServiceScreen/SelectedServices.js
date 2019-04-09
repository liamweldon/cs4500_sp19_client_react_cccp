import React from "react";

const SelectedServices = props => {
  const selectedServiceStyle = {
    display: "flex",
    justifyContent: "space-between"
  };

  return (
    <div>
      <h4>Selected Services</h4>
      <ul className="list-group">
        {props.selectedServices.map(currentSelectedService => (
          <li
            key={currentSelectedService.id}
            className="list-group-item"
            style={selectedServiceStyle}
          >
            <div>{currentSelectedService.serviceName}</div>
            <div onClick={() => props.selectService(currentSelectedService.id)}>
              <i class="far fa-times" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedServices;
