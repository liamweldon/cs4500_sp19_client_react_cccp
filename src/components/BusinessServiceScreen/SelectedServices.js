import React from "react";

const SelectedServices = props => {
  const serviceItemStyle = {
    display: "flex",
    justifyContent: "space-between"
  };

  const selectedServices = props.selectedServices;
  const clickedSelectedService = props.clickedSelectedService;

  return (
    <div>
      <h4>Selected Services</h4>
      <ul className="list-group">
        {selectedServices.map(mappedSelectedService => {
          let listItemIsActive = "list-group-item";
          if (clickedSelectedService === mappedSelectedService.id) {
            listItemIsActive += " active";
          }

          return (
            <li
              key={mappedSelectedService.id}
              className={listItemIsActive}
              style={serviceItemStyle}
              onClick={e =>
                props.clickASelectedService(mappedSelectedService.id)
              }
            >
              <div>
                {mappedSelectedService.serviceName}, {mappedSelectedService.id}
              </div>
              <div
                onClick={e => {
                  e.stopPropagation();
                  props.removeFromSelectedServices(mappedSelectedService.id);
                }}
              >
                <i class="fa fa-times" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectedServices;
