/* global process */

import React, { Component } from "react";
import ReactDOM from "react-dom";
// import logo from './logo.svg';
import "./App.css";
import { toSubscripts } from "../../lib/utils/utils";
import { createStore } from "redux";

import request from "superagent";

import EscherReact from "./EscherReact";

// import { Link } from 'react-router'

import RightArrowIcon from "../../assets/icons/RightArrow";
import LeftArrowIcon from "../../assets/icons/LeftArrow";
import ChartIcon from "../../assets/icons/Chart";
import HomeIcon from "../../assets/icons/Home";
import DownloadIcon from "../../assets/icons/Download";

import TooltipComponent from "./TooltipComponent";
import { browserHistory } from "react-router";

const map = require('../../../public/map.json')

// For the lightbox
const ROOT = document.getElementById("root");

// Halfway implementation - should be using react bindings with a Provider
function descriptionReducer(
  state = { description: null, sidebarStatus: false },
  action
) {
  switch (action.type) {
    case "DESCRIPTION":
      return { ...state, description: action.description, data: action.data };
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarStatus: !state.sidebarStatus };
    case "OPEN_SIDEBAR":
      return { ...state, sidebarStatus: true };
    default:
      return state;
  }
}

let store = createStore(descriptionReducer);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptions: null,
      sideBarStatus: null,
      descriptionStore: {}
    };

    // Create lightbox div
    this.lightboxPortal = document.createElement("div");
  }

  componentDidMount() {
    document.title = "Map";

    //subscribe to the store and attach to the state tree
    store.subscribe(() =>
      this.setState({
        descriptionStore: store.getState(),
        sideBarStatus: store.getState().sidebarStatus
      })
    );

    //Load in the model file from s3
    request
      .get("https://s3-us-west-2.amazonaws.com/erythrodb.org/rbc_model.json")
      .set("content-type", "application/json")
      .end((err, res) => {
        this.setState({ descriptions: JSON.parse(res.text) });
      });

    // Add lightbox to DOM
    ROOT.insertBefore(this.lightboxPortal, ROOT.firstChild);
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    ROOT.removeChild(this.lightboxPortal);
  }

  render() {
    const { descriptions, sideBarStatus } = this.state;
    const { descriptionStore } = this.state;

    if (descriptions) {
      return (
        <div className="App-intro">
          <EscherReact
            tooltipComponent={TooltipComponent}
            mapFilename={'../../../public/map.json'}
            descriptionStore={store}
            descriptions={descriptions}
            dataStore={store}
          />
          <Sidebar
            descriptionStore={descriptionStore}
            sideBarStatus={sideBarStatus}
            lightboxPortal={this.lightboxPortal}
          />
          <SidebarButton
            sideBarStatus={sideBarStatus}
            callback={() => {
              // this.setState({sideBarStatus:!sideBarStatus})
              store.dispatch({ type: "TOGGLE_SIDEBAR" });
            }}
          />

          <div
            className="home-button"
            onClick={() => {
              browserHistory.push("/");
            }}
          >
            <HomeIcon scale={0.75} isStaticSize={true} fill={"white"} />
          </div>
          <div>
            <a
              className="map-button"
              href={
                "https://s3-us-west-2.amazonaws.com/erythrodb.org/rbc-map.pdf"
              }
              target="_blank"
            >
              <DownloadIcon scale={0.75} isStaticSize={true} fill={"white"} />
            </a>
          </div>
          <style>{`body{overflow-y: hidden;}`}</style>
        </div>
      );
    }

    return (
      <div className="welcome-box-container">
        <div className="welcome-title">Welcome to ErythroDB.org</div>
        <div className="loader">Loading...</div>
      </div>
    );
  }
}

class Sidebar extends Component {
  render() {
    const { sideBarStatus, descriptionStore } = this.props;

    if (descriptionStore.description) {
      let formula = toSubscripts(
        descriptionStore.description.descriptionsInfo.formula
      );

      return (
        <div
          style={{ right: sideBarStatus ? 0 : "-350px" }}
          className="sidebar-container"
        >
          <div className="sidebar-top-container">
            <div className="sidebar-title">
              {descriptionStore.description.descriptionsInfo.description}
            </div>
            <div className="sidebar-formula">{formula}</div>
          </div>
          <div className="sidebar-middle-container">
            <img
              className="sidebar-image"
              alt=""
              src={
                descriptionStore.description.type === "metabolite"
                  ? descriptionStore.description.descriptionsInfo[
                      "kegg_image_url"
                    ]
                  : descriptionStore.description.descriptionsInfo[
                      "pdb_image_url"
                    ]
              }
            />
          </div>
          <div className="sidebar-bottom-container">
            <PopulatorBox
              description={descriptionStore.description.descriptionsInfo}
              lightboxPortal={this.props.lightboxPortal}
            />
          </div>
        </div>
      );
    }

    return (
      <div
        style={{ right: sideBarStatus ? 0 : "-350px" }}
        className="sidebar-container"
      >
        <div className="sidebar-empty">
          Click on a metabolite or reaction to load information
        </div>
      </div>
    );
  }
}

class PopulatorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: null,
      isOpen: false
    };
  }

  render() {
    const { description } = this.props;
    if (description.data) {
      let charts = description.data.charts.map(chart => {
        return (
          <div
            key={chart.location}
            onClick={() => {
              this.setState({
                isOpen: true,
                title: chart.title,
                location: chart.location,
                link_source: chart.source_link,
                link_text: chart.source_text,
                descr: chart.description
              });
            }}
          >
            <img className="chart-image" alt="" src={chart.location} />
            <a className="chart-link" href={chart.source_link} target="_blank">
              {chart.source_text}
            </a>
          </div>
        );
      });

      // User a React portal to put the lightbox in front of everything else
      const lightbox = ReactDOM.createPortal(
        <div
          className="chart-screen-overlay"
          style={{ display: this.state.isOpen ? "block" : "none" }}
          onClick={() => {
            this.setState({ isOpen: false });
          }}
        >
          <div className="chart-zoom-box">
            <div className="chart-title">{this.state.title}</div>
            <img
              className="chart-zoom-image"
              alt=""
              src={this.state.location}
            />
            <div className="chart-description">{this.state.descr}</div>
            <div
              className="chart-zoom-button"
              onClick={() => {
                this.setState({ isOpen: false });
              }}
            >
              close
            </div>
          </div>
        </div>,
        this.props.lightboxPortal
      );

      return (
        <div>
          {charts}
          {lightbox}
        </div>
      );
    }

    return <div className="chart-empty">No data to display</div>;
  }
}

const SidebarButton = ({ sideBarStatus, callback }) => (
  <div
    style={{ right: sideBarStatus ? "350px" : 0 }}
    className="sidebar-button"
    onClick={callback}
  >
    <ChartIcon scale={1.5} fill={"white"} isStaticSize={true} />
    {sideBarStatus ? (
      <RightArrowIcon scale={1} fill={"white"} isStaticSize={true} />
    ) : (
      <LeftArrowIcon scale={1} fill={"white"} isStaticSize={true} />
    )}
  </div>
);

export default App;
