/* global process */

import React, { Component } from "react";
import ReactDOM from "react-dom";
import escher from "escher-vis";
import { render, createElement as h, createComponent } from "tinier";
import { getDescriptionForBiggId } from "../../lib/utils/utils";
import { json as loadJson, xml as loadXml } from "d3-request";
import "./builder.css";
// eslint-disable-next-line import/no-webpack-loader-syntax
import builderEmbedCss from "!!raw-loader!./builder-embed.css";

function addMembraneSvg() {
  const sel = this.selection;
  loadXml(process.env.PUBLIC_URL + "/membrane.svg").get(function(error, xml) {
    if (error) throw error;
    const par = sel.select(".zoom-g");
    const g = par.insert("g", "#reactions");
    g
      .attr("transform", "scale(11.1)translate(-243,-245)")
      .node()
      .appendChild(xml.documentElement);
    sel.select("#mouse-node").style("fill", "rgb(173, 79, 87)");
  });

  // --------------------------------------------- adding in display images around map (containing data, etc.)

  loadXml(process.env.PUBLIC_URL + "/display-svgs.svg").get(function(
    error,
    xml
  ) {
    if (error) throw error;
    const par = sel.select(".zoom-g");
    const g = par.insert("g", "#reactions");
    g
      .attr("transform", "scale(6)translate(-1190,-320)")
      .node()
      .appendChild(xml.documentElement);
  });
}

// ---------------------------------------------

class EscherReact extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      tooltipComponent,
      mapFilename,
      descriptions,
      descriptionStore,
      dataStore
    } = this.props;

    const parent = ReactDOM.findDOMNode(this);

    loadJson(mapFilename, (e, data) => {
      escher.Builder(data, null, builderEmbedCss, parent, {
        menu: "zoom",
        tooltip_component: tooltipComponent
          ? ToolTipTinierComponent(
              tooltipComponent,
              descriptionStore,
              descriptions,
              dataStore
            )
          : null,
        enable_editing: false,
        never_ask_before_quit: true,
        first_load_callback: addMembraneSvg
        // ---------------------------------------------
        // first_load_callback: addDisplaySvgs,
        // ---------------------------------------------
      });
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      />
    );
  }
}

const ToolTipTinierComponent = function(
  TooltipContentComponent,
  descriptionStore,
  descriptions,
  dataStore
) {
  return createComponent({
    init: function() {
      return {
        biggId: "",
        name: "",
        loc: { x: 0, y: 0 },
        data: null,
        type: null,
        loaded: false
      };
    },

    reducers: {
      setContainerData: function(args) {
        var d = getDescriptionForBiggId(args.biggId, args.type, descriptions);
        return Object.assign({}, args.state, {
          biggId: args.biggId,
          name: args.name,
          loc: args.loc,
          data: args.data,
          type: args.type,
          descriptionsInfo: d,
          loaded: true
        });
      }
    },

    methods: {},

    render: function({ el, state }) {
      //  let clonedTooltipContentComponent = React.cloneElement(TooltipContentComponent, {data:state})

      if (state.loaded) {
        render(
          el,
          h(
            "div",
            { class: "tooltip-container" },
            h("div", { class: "tooltip-title" }, state.name),
            h("div", {}, state.biggId),
            h("img", {
              class: "tooltip-image",
              src:
                state.type === "metabolite"
                  ? state.descriptionsInfo["kegg_image_url"]
                  : state.descriptionsInfo["pdb_image_url"]
            }),
            h(
              "div",
              {},
              h(
                "button",
                {
                  class: "simple-button",
                  onClick: () => {
                    dataStore.dispatch({
                      type: "DESCRIPTION",
                      description: state,
                      data: state
                    });
                    dataStore.dispatch({ type: "OPEN_SIDEBAR" });
                  }
                },
                "Show data in side menu"
              )
            )
          )
        );
      } else {
        render(el, h("div", {}, ""));
      }
    }
  });
};

export default EscherReact;
