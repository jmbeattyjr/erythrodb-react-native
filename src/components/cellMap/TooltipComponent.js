import React, { Component } from "react";
import { getDescriptionForBiggId } from "../../lib/utils/utils";

class TooltipComponent extends Component {
  render() {
    const { data, descriptions, descriptionStore } = this.props;

    let description = getDescriptionForBiggId(
      data.biggId,
      data.type,
      descriptions
    );

    return (
      <div className="tooltip-container">
        <div className="tooltip-title">{data.name}</div>
        <div>{data.biggId}</div>

        <img
          className="tooltip-image"
          alt=""
          src={
            data.type === "metabolite"
              ? description["kegg_image_url"]
              : description["pdb_image_url"]
          }
        />

        <div>
          <button
            className="simple-button"
            onClick={() => {
              descriptionStore.dispatch({
                type: "DESCRIPTION",
                description,
                data
              });
            }}
          >
            Show data in side menu
          </button>
        </div>
      </div>
    );
  }
}

export default TooltipComponent;
