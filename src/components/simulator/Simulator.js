import React from 'react'
import { connect } from 'react-redux'
import store from '../../lib/redux/store'
import { withRouteData, Link } from 'react-static'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts'
import { scaleLog } from 'd3-scale'
//
import './simulator.css'
import { fetchSimData } from '../../lib/redux/entities/simulator/simulator.actions'

import { BigButton, PlotOptions } from './simulatorComponents'

class Simulator extends React.Component {
  async componentDidMount() {
    const { dispatchFetchSimData } = this.props
    dispatchFetchSimData()
  }

  constructor(props) {
    super(props)
    this.state = {
      hasUpdated: false,
      mcpXAxis: 'linear',
      mcpYAxis: 'linear',
      rvpXAxis: 'linear',
      rvpYAxis: 'linear'
    }
  }

  render() {
    const { simDataRoot } = this.props

    if (this.props.simDataRoot.hasFetched === true && this.state.hasUpdated === false) {
      this.initalData(simDataRoot)
    }

    const DataFormaterTime = number => {
      const newNumber = Math.round(number * 1) / 1
      return newNumber
    }

    const DataFormaterY = number => {
      const newNumber = Math.round(number * 10000000) / 10000000
      return newNumber
    }

    return (
      <div className="simulator-body">
        <button onClick={this.submit.bind(this)}>Get Data</button>
        <button onClick={this.create.bind(this)}>Create Data</button>
        
        <div className="chartContainers">
          <div className="chartSectionTitle">
            <h1>Metabolite Concentration Profiles</h1>
            <div className="selectionPane">
              <h3 className="optionsTitle">Metabolites To Plot</h3>
              <div className="options">
                <this.bigButton name="concentrationsGlcDC" checked={this.state.concentrationsGlcDC} displayName="Glucose (GLC)" />
                {/* <BigButton name="concentrationsGlcDC" checked={this.state.concentrationsGlcDC} displayName="Glucose (GLC)" /> */}
              </div>
            </div>
            <this.plotOptions name="mcp" XAxis={this.state.mcpXAxis} YAxis={this.state.mcpYAxis} />
            {/* <PlotOptions name="mcp" XAxis={this.state.mcpXAxis} YAxis={this.state.mcpYAxis} /> */}
            {this.state.concentrationsGlcDC && (
              <div className="chartSubContainers">
                <ResponsiveContainer height={200}>
                  <LineChart data={this.state.dataModel} style={{ overflow: 'unset' }}>
                    <XAxis dataKey="time" tickFormatter={number => DataFormaterTime(number)} scale={this.state.mcpXAxis}>
                      <Label value="Time (hours)" offset={0} position="bottom" />
                    </XAxis>
                    <YAxis
                      domain={['auto', 'auto']}
                      label={{ value: 'Metabolite  Concentration  (mmol)', position: 'top', dx: 50, dy: -10 }}
                      tickFormatter={number => DataFormaterY(number)}
                      scale={this.state.mcpYAxis}
                    />
                    <Tooltip />
                    <Line type="monotone" dataKey={'concentrationsGlcDC'} stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        <div className="chartContainers">
          <div className="chartSectionTitle">
            <h1>Reaction Velocity Profiles</h1>
            <div className="selectionPane">
              <h3 className="optionsTitle">Metabolites To Plot</h3>
              <div className="options">
                <this.bigButton name="HEX1" checked={this.state.HEX1} displayName="Hexokinase (HEX)" />
                <this.bigButton name="PYK" checked={this.state.PYK} displayName="Pyruvate kinase (PYK)" />
              </div>
            </div>
            <this.plotOptions name="rvp" XAxis={this.state.rvpXAxis} YAxis={this.state.rvpYAxis} />
            {this.state.HEX1 && (
              <div className="chartSubContainers">
                <ResponsiveContainer height={200}>
                  <LineChart data={this.state.dataModel} style={{ overflow: 'unset' }} syncId="velProfiles">
                    <XAxis dataKey="time" tickFormatter={number => DataFormaterTime(number)} scale={this.state.rvpXAxis}>
                      <Label value="Time (hours)" offset={0} position="bottom" />
                    </XAxis>
                    <YAxis
                      allowDataOverflow={true}
                      domain={['auto', 'auto']}
                      label={{ value: 'Reaction Flux (mmol/hour)', position: 'top', dx: 50, dy: -10 }}
                      type="number"
                      yAxisId="1"
                      tickFormatter={number => DataFormaterY(number)}
                      scale={this.state.rvpYAxis}
                    />
                    <Tooltip />
                    <Line yAxisId="1" type="monotone" dataKey={`HEX1`} stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
            {this.state.PYK && (
              <div className="chartSubContainers">
                <ResponsiveContainer height={200}>
                  <LineChart data={this.state.dataModel} style={{ overflow: 'unset' }} syncId="velProfiles">
                    <XAxis dataKey="time" tickFormatter={number => DataFormaterTime(number)} scale={this.state.rvpXAxis}>
                      <Label value="Time (hours)" offset={0} position="bottom" />
                    </XAxis>
                    <YAxis
                      allowDataOverflow={true}
                      domain={['auto', 'auto']}
                      label={{ value: 'Reaction Flux (mmol/hour)', position: 'top', dx: 50, dy: -10 }}
                      type="number"
                      yAxisId="2"
                      tickFormatter={number => DataFormaterY(number)}
                      scale={this.state.rvpYAxis}
                    />
                    <Tooltip />
                    <Line yAxisId="2" type="monotone" dataKey={'PYK'} stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Components
  bigButton = props => {
    const ischecked = `this.state.${props.name}`
    console.log(props.checked)
    return (
      <div className="buttonRow">
        <input name={props.name} type="checkbox" onChange={this.hidden.bind(this)} checked={props.checked} />
        <h4>{props.displayName}</h4>
      </div>
    )
  }

  plotOptions = props => {
    return (
      <div className="chartContainers">
        <div>
          <h3 className="plotOptionsTitle">Plot Options</h3>
          <div className="plotOptions">
            <div className="axisSections">
              <h3>XAxis</h3>
              <form>
                <div className="buttonRow">
                  <h4>
                    <input
                      type="radio"
                      name={`${props.name}XAxis`}
                      value="linear"
                      checked={props.XAxis === 'linear'}
                      onChange={this.handleOptionChange.bind(this)}
                    />
                    Linear Scale
                  </h4>
                </div>
                <div className="buttonRow">
                  <h4>
                    <input
                      type="radio"
                      name={`${props.name}XAxis`}
                      value="log"
                      checked={props.XAxis === 'log'}
                      onChange={this.handleOptionChange.bind(this)}
                    />
                    Logarithmic Scale
                  </h4>
                </div>
              </form>
            </div>
            <div className="axisSections">
              <h3>YAxis</h3>
              <form>
                <div className="buttonRow">
                  <h4>
                    <input
                      type="radio"
                      name={`${props.name}YAxis`}
                      value="linear"
                      checked={props.YAxis === 'linear'}
                      onChange={this.handleOptionChange.bind(this)}
                    />
                    Linear Scale
                  </h4>
                </div>
                <div className="buttonRow">
                  <h4>
                    <input
                      type="radio"
                      name={`${props.name}YAxis`}
                      value="log"
                      checked={props.YAxis === 'log'}
                      onChange={this.handleOptionChange.bind(this)}
                    />
                    Logarithmic Scale
                  </h4>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Actions
  submit(evt) {
    evt.preventDefault()
    const { dispatchFetchSimData } = this.props
    dispatchFetchSimData()
    console.log('I hope this works')
  }

  create(evt) {
    const time = this.props.simDataRoot.simData.time
    const HEX1 = this.props.simDataRoot.simData.fluxHEX1
    const PYK = this.props.simDataRoot.simData.fluxPYK
    const concentrationsGlcDC = this.props.simDataRoot.simData.concentrationsGlcDC
    const data = []
    let i
    for (i = 0; i < time.length; i++) {
      data.push({ time: time[i], HEX1: HEX1[i], concentrationsGlcDC: concentrationsGlcDC[i], PYK: PYK[i] })
    }
    this.setState({
      dataModel: data
    })
  }

  click(evt) {
    const name = evt.target.name
    const nameCheckBox = `${evt.target.name}CheckBox`
    const value = evt.target.checked
    const nextState = {}
    const nextState2 = {}
    nextState2[nameCheckBox] = !this.state.nameCheckBox
    this.setState(nextState2)
    if (value === true) {
      nextState[name] = name
    } else {
      nextState[name] = ''
    }
    this.setState(nextState)
  }

  hidden(evt) {
    console.log(evt.target)
    const name = evt.target.name
    const nameCheckBox = `${evt.target.name}`
    const value = evt.target.checked
    const nextState2 = {}
    nextState2[nameCheckBox] = value
    this.setState(nextState2)
  }

  initalData(simDataRoot) {
    const time = simDataRoot.simData.time
    const HEX1 = simDataRoot.simData.fluxHEX1
    const PYK = simDataRoot.simData.fluxPYK
    const concentrationsGlcDC = simDataRoot.simData.concentrationsGlcDC
    const data = []
    let i
    for (i = 0; i < time.length; i++) {
      data.push({ time: time[i], HEX1: HEX1[i], concentrationsGlcDC: concentrationsGlcDC[i], PYK: PYK[i] })
    }
    this.setState({
      dataModel: data,
      hasUpdated: true
    })
  }

  handleOptionChange(evt) {
    const name = evt.target.name
    const value = evt.target.value
    const nextState = {}
    nextState[name] = value
    this.setState(nextState)
  }
}

const mapStateToProps = state => {
  return {
    simDataRoot: state.simDataRoot
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchFetchSimData: () => dispatch(fetchSimData())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Simulator)
