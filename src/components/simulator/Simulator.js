import React from 'react'
import { connect } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from 'recharts'
//
import randomColor from 'randomcolor'

import Timer from 'react-compound-timer'

//Material UI
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'

import Clear from '@material-ui/icons/Clear'
import Done from '@material-ui/icons/Done'
import Search from '@material-ui/icons/Search'
import Remove from '@material-ui/icons/Remove'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'

import ListItemText from '@material-ui/core/ListItemText'

import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'

import InputAdornment from '@material-ui/core/InputAdornment'
import Input from '@material-ui/core/Input'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse';

import './simulator.css'
import { fetchSimData, fetchMetadata } from '../../lib/redux/entities/simulator/simulator.actions'

import { OutlinedInput, FormControlLabel, Checkbox, RadioGroup, TextField, Dialog, DialogTitle, Select, MenuItem, FormGroup } from '@material-ui/core'
// import { Loading } from 'react-static';

class Simulator extends React.Component {
  componentDidMount() {
    const { dispatchFetchMetadata } = this.props
    dispatchFetchMetadata()
  }

  constructor(props) {
    super(props)
    this.state = {
      hasUpdated: false,
      concentrationXAxis: 'Linear',
      concentrationYAxis: 'Linear',
      ratesXAxis: 'Linear',
      ratesYAxis: 'Linear',
      selectedConcentrations:{},
      ratesSelected: {},
      concentrationstoPlot: {},
      ratestoPlot: {},
      concentrationsPlotHeight: 300,
      ratesPlotHeight: 300,
      open: true
    }
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }))
  }

  render() {
    console.log(this.state)
    const { simDataRoot } = this.props
    console.log(simDataRoot)

    if (
      this.props.simDataRoot.simhasFetched === true &&
      this.props.simDataRoot.metahasFetched === true &&
      this.state.hasUpdated === false &&
      this.state.dataModel === null &&
      this.props.simDataRoot.simisFetching === false &&
      !this.props.simDataRoot.error
    ) {
      this.initalData(simDataRoot.simData)
    }

    let concentrations
    let rates
    const selectedConcentrations = this.state.selectedConcentrations
    const valuet0 = this.state.t0
    const valuet_end = this.state.t_end

    const { inputs } = this.props.simDataRoot.metadata
    if (this.props.simDataRoot.metahasFetched === true && !this.props.simDataRoot.metaisFetching) {
      concentrations = this.props.simDataRoot.metadata.outputs.concentrations
      rates = this.props.simDataRoot.metadata.outputs.rates
    }
    return (
      <div className="simulator-body">
        <div className="mainDashboardAll">
          <div className="simulationTitle" onClick={this.handleClick}>
            <h1>Simulation Dashboard</h1>
            {this.state.open ? <ExpandLess id="expand"/> : <ExpandMore id="expand"/>}
          </div>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <div className="mainDashboard">
              <div className="parameters">
                <Typography component="h5" variant="h5" gutterBottom>
                  INPUTS
                </Typography>
                <Typography component="h6" variant="h6" gutterBottom>
                  Specify input values for the simulation
                </Typography>
                {inputs &&
                  Object.entries(inputs).map(input => {
                    var inputData = input[1]
                    var inputJsonName = input[0].toString()
                    // const state= this.state
                    return <this.inputParameters data={inputData} jsonName={inputJsonName} state={this.state} />
                  })}
              </div>
              <div className="parameters">
                <Typography component="h5" variant="h5" gutterBottom>
                  SIMULATION PARAMETERS
                </Typography>
                <Typography component="h6" variant="h6" gutterBottom>
                  General Simulation parameters and settings
                </Typography>

                <div id="timeInput">
                  <FormControl className="border">
                    <OutlinedInput
                      id="input-with-icon-adornment"
                      name="t0"
                      value={valuet0}
                      onChange={this.handleChangeRadio.bind(this)}
                      placeholder="Time Start"
                    />
                  </FormControl>
                  <Remove className="timeLabels" />
                  <FormControl className="border">
                    <OutlinedInput
                      id="input-with-icon-adornment"
                      name="t_end"
                      value={valuet_end}
                      onChange={this.handleChangeRadio.bind(this)}
                      placeholder="Time End"
                    />
                  </FormControl>
                  <Typography className="timeLabels">hours</Typography>
                </div>
              </div>

              <div className="parameters">
                <Typography component="h5" variant="h5" gutterBottom>
                  OUTPUTS
                </Typography>
                <Typography component="h6" variant="h6" gutterBottom>
                  Select the outputs below that should be included in the simulation.
                </Typography>
                <Typography component="h6" variant="h6" gutterBottom>
                  Concentrations
                </Typography>
                {concentrations &&
                  concentrations.map(input => {
                    return <this.outputParametersConcentrations data={input} />
                  })}
                <Typography component="h6" variant="h6" gutterBottom>
                  Rates
                </Typography>
                {rates &&
                  rates.map(input => {
                    return <this.outputParametersRates data={input} />
                  })}
              </div>
            </div>
                <div id="plotOptions">
            <Button variant="contained" size="large" id="simButton" onClick={this.submit.bind(this)}>
              SIMULATE
            </Button>
            </div>
          </Collapse>
        </div>

        <div className={this.state.hasUpdated ? 'simulationsContainer' : 'hidden'}>
          {/* <div className="simulationsContainer"> */}
          <h1>VISUALIZATION</h1>
          <div className="chartContainers">
            <div className="chartSubContainers">
              <this.concentrationsCharts />
            </div>
            <div className="selectionPane">
              <Card className="plotOptions3">
                <CardContent>
                  {/* <Typography gutterBottom>PLOT OPTIONS</Typography> */}
                  <this.concentrationsplotOptions name="concentration" XAxis="concentrationXAxis" YAxis="concentrationYAxis" />
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="chartContainers">
            <div className="chartSubContainers">
              <this.ratesCharts />
            </div>
            <div className="selectionPane">
              <Card className="plotOptions3">
                <CardContent>
                  {/* <Typography gutterBottom>PLOT OPTIONS</Typography> */}
                  <this.ratesplotOptions name="rates" XAxis="ratesXAxis" YAxis="ratesYAxis" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <SimpleDialog open={this.props.simDataRoot.simisFetching} onClose={this.handleClose} />
      </div>
    )
  }

  // Material UI Components

  ratesLines = data => {
    return <Line type="monotone" dataKey="GLC" stroke="#8884d8" />
  }

  inputParameters = data => {
    const props = data.data
    // const name = props.name
    const defaultValue = this.state[data.jsonName]
    const jsonName = this.state[props.name]
    return (
      <div className="input-box">
        <Typography gutterBottom>{props.name}</Typography>
        <Typography gutterBottom>{props.description}</Typography>
        <FormControl margin="dense">
          <TextField
            defaultValue={defaultValue}
            id={data.jsonName}
            type="number"
            name={props.name}
            value={defaultValue}
            onChange={this.handleChange.bind(this)}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {!jsonName && jsonName != null && <Clear style={{ color: 'red' }} />}
                  {jsonName && <Done style={{ color: '#28FF49' }} />}
                </InputAdornment>
              )
            }}
          />

          {!jsonName && (
            <FormHelperText id="component-helper-text">
              Input must be between {props.min} and {props.max}
            </FormHelperText>
          )}
          {jsonName && <FormHelperText id="component-helper-text" />}
        </FormControl>
      </div>
    )
  }

  outputParametersConcentrations = data => {
   const checked = this.state.selectedConcentrations[data.data.variable]
    const outerTheme = createMuiTheme({
      palette: {
        secondary: {
          main: '#FF5722'
        }
      },
      typography: { useNextVariants: true }
    })

    return (
      <div className="output-box">
        <MuiThemeProvider theme={outerTheme}>
          <Checkbox checked={checked} onChange={this.concentrationsCheckbox(data.data.variable)} value={data.data.id} />
        </MuiThemeProvider>
        <div className="output-box_des">
          <Typography gutterBottom>{data.data.name}</Typography>
          <Typography gutterBottom>{data.data.description}</Typography>
        </div>
      </div>
    )
  }

  outputParametersRates = data => {
    const checked = this.state.ratesSelected[data.data.variable]
    const outerTheme = createMuiTheme({
      palette: {
        secondary: {
          main: '#FF5722'
        }
      },
      typography: { useNextVariants: true }
    })

    return (
      <div className="output-box">
        <MuiThemeProvider theme={outerTheme}>
          <Checkbox checked={checked} onChange={this.ratesCheckbox(data.data.variable)}/>
        </MuiThemeProvider>
        <div className="output-box_des">
          <Typography gutterBottom>{data.data.name}</Typography>
          <Typography gutterBottom>{data.data.description}</Typography>
        </div>
      </div>
    )
  }

  signalsToPlot = data => {
    const outerTheme = createMuiTheme({
      palette: {
        secondary: {
          main: '#FF5722'
        }
      },
      typography: { useNextVariants: true }
    })

    const concentrations = this.props.simDataRoot.metadata.outputs.concentrations
    const rates = this.props.simDataRoot.metadata.outputs.rates
    const name = `${data.data[0]}`
    const concentrationscheckedValue = this.state.concentrationstoPlot[name]
    const ratescheckedValue = this.state.ratestoPlot[name]
    const arrayToObject = array =>
      array.reduce((obj, item) => {
        obj[item.variable] = item
        return obj
      }, {})

    const concentrationsObject = arrayToObject(concentrations)
    const ratesObject = arrayToObject(rates)

    const hydratedConcentration = concentrationsObject[data.data[0]]
    const hydratedRates = ratesObject[data.data[0]]

    if (hydratedConcentration) {
      if (!this.state.concentrationsInitialCheck) {
        this.setState({ concentrationsInitialCheck: true })
        this.concentrationsCheckboxPlots(name)
      }
      return (
        <div className="output-box">
          <MuiThemeProvider theme={outerTheme}>
            <Checkbox checked={concentrationscheckedValue} onChange={this.concentrationsCheckboxPlots(name)} value={name} />
          </MuiThemeProvider>
          <div className="output-box_des">
            <Typography gutterBottom>{hydratedConcentration.name}</Typography>
          </div>
        </div>
      )
    }
    if (hydratedRates) {
      const defaultChecked = this.state.ratestoPlot[name]
      return (
        <div className="output-box">
          <MuiThemeProvider theme={outerTheme}>
            <Checkbox checked={this.state.ratestoPlot[name]} onChange={this.ratesCheckboxPlots(name)} value={name} defaultChecked={defaultChecked} />
          </MuiThemeProvider>
          <div className="output-box_des">
            <Typography gutterBottom>{hydratedRates.name}</Typography>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  // Components
  concentrationsCharts = props => {
    const concentrationstoPlot = this.state.concentrationstoPlot
    return (
      <ResponsiveContainer height={this.state.concentrationsPlotHeight}>
        <LineChart data={this.state.dataModel} style={{ overflow: 'unset' }} syncId="metaProfiles">
          <XAxis dataKey="time" tickFormatter={number => this.dataFormaterTime(number)} scale={this.state.concentrationXAxis}>
            <Label value="Time (hours)" offset={0} position="bottom" />
          </XAxis>
          <YAxis
            domain={[dataMin => dataMin * 0.997, dataMax => dataMax * 1.003]}
            label={{ value: 'Concentration  (mmol)', position: 'left', angle: -90, dx: -10, dy: -70 }}
            tickFormatter={number => this.dataFormaterY(number)}
            scale={this.state.concentrationYAxis}
          />
          <Tooltip />
          {concentrationstoPlot &&
            Object.entries(concentrationstoPlot).map(input => {
              if (input[1] === true) {
                const color = randomColor()
                return <Line type="monotone" dataKey={input[0]} stroke={color} />
              }
            })}
        </LineChart>
      </ResponsiveContainer>
    )
  }

  ratesCharts = props => {
    const ratestoPlot = this.state.ratestoPlot

    return (
      <ResponsiveContainer height={this.state.ratesPlotHeight}>
        <LineChart data={this.state.dataModel} style={{ overflow: 'unset' }} syncId="metaProfiles">
          <XAxis dataKey="time" tickFormatter={number => this.dataFormaterTime(number)} scale={this.state.ratesXAxis}>
            <Label value="Time (hours)" offset={0} position="bottom" />
          </XAxis>
          <YAxis
            domain={[dataMin => dataMin * 0.997, dataMax => dataMax * 1.003]}
            label={{ value: 'Flux (mmol/hour)', position: 'left', angle: -90, dx: -10, dy: -50 }}
            tickFormatter={number => this.dataFormaterY(number)}
            scale={this.state.ratesYAxis}
          />
          <Tooltip />
          {ratestoPlot &&
            Object.entries(ratestoPlot).map(input => {
              if (input[1] === true) {
                const color = randomColor()
                return <Line type="monotone" dataKey={input[0]} stroke={color} />
              }
            })}
        </LineChart>
      </ResponsiveContainer>
    )
  }

  bigButton = props => {
    const ischecked = `this.state.${props.name}`
    return (
      <div className="buttonRow">
        <input name={props.name} type="checkbox" onChange={this.hidden.bind(this)} checked={props.checked} />
        <h4>{props.displayName}</h4>
      </div>
    )
  }

  concentrationsplotOptions = props => {
    const selectedConcentrations = this.state.selectedConcentrations
    return (
      <div>
        <div className="optionsContainers">
          <div>
            <h3 className="plotOptionsTitle">PLOT OPTIONS</h3>
            <div className="plotOptions">
              <div className="plotOptions-row">
                <div className="fixFormat">
                  <h3>X Axis</h3>

                  <RadioGroup
                    aria-label={props.name}
                    name={props.XAxis}
                    value={this.state[props.XAxis]}
                    onChange={this.handleChangeRadio}
                    id="radioGroup"
                  >
                    <FormControlLabel value="Linear" control={<Checkbox />} label="Linear" />
                    <FormControlLabel value="Logarithmic" control={<Checkbox />} label="Logarithmic" />
                  </RadioGroup>
                </div>
              </div>

              <div className="plotOptions-row">
                <div className="fixFormat">
                  <h3>Y Axis</h3>
                  <RadioGroup
                    aria-label={props.name}
                    name={props.YAxis}
                    value={this.state[props.YAxis]}
                    onChange={this.handleChangeRadio}
                    id="radioGroup"
                  >
                    <FormControlLabel value="Linear" control={<Checkbox />} label="Linear" />
                    <FormControlLabel value="Logarithmic" control={<Checkbox />} label="Logarithmic" />
                  </RadioGroup>
                </div>
              </div>
              <div className="plotHeightSelect">
                <FormControl>
                  {/* <Select value={this.state.concentrationsPlotHeight} onChange={this.handleChangeRadio} name="concentrationsPlotHeight"> */}
                  <FormHelperText>Plot Height</FormHelperText>
                  <Select
                    value={this.state.concentrationsPlotHeight}
                    onChange={this.handleChangeRadio}
                    input={<OutlinedInput name="concentrationsPlotHeight" id="outlined-age-simple" />}
                  >
                    <MenuItem value={200}>200 pixels</MenuItem>
                    <MenuItem value={300}>300 pixels</MenuItem>
                    <MenuItem value={400}>400 pixels</MenuItem>
                    <MenuItem value={500}>500 pixels</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
        <div className="optionsContainers">
          <div>
            <h3 className="plotOptionsTitle">SIGNALS TO PLOT</h3>
            {selectedConcentrations &&
              Object.entries(selectedConcentrations).map(input => {
                if (input[1] === true) {
                  return <this.signalsToPlot data={input} />
                }
              })}
          </div>
        </div>
      </div>
    )
  }

  ratesplotOptions = props => {
    const ratesSelected = this.state.ratesSelected
    return (
      <div>
        <div className="optionsContainers">
          <div>
            <h3 className="plotOptionsTitle">PLOT OPTIONS</h3>
            <div className="plotOptions">
              <div className="plotOptions-row">
                <div className="fixFormat">
                  <h3>X Axis</h3>

                  <RadioGroup
                    aria-label={props.name}
                    name={props.XAxis}
                    value={this.state[props.XAxis]}
                    onChange={this.handleChangeRadio}
                    id="radioGroup"
                  >
                    <FormControlLabel value="Linear" control={<Checkbox />} label="Linear" />
                    <FormControlLabel value="Logarithmic" control={<Checkbox />} label="Logarithmic" />
                  </RadioGroup>
                </div>
              </div>

              <div className="plotOptions-row">
                <div className="fixFormat">
                  <h3>Y Axis</h3>

                  <RadioGroup
                    aria-label={props.name}
                    name={props.YAxis}
                    value={this.state[props.YAxis]}
                    onChange={this.handleChangeRadio}
                    id="radioGroup"
                  >
                    <FormControlLabel value="Linear" control={<Checkbox />} label="Linear" />
                    <FormControlLabel value="Logarithmic" control={<Checkbox />} label="Logarithmic" />
                  </RadioGroup>
                </div>
              </div>
              <div className="plotHeightSelect">
                <FormControl>
                  {/* <Select value={this.state.concentrationsPlotHeight} onChange={this.handleChangeRadio} name="concentrationsPlotHeight"> */}
                  <FormHelperText>Plot Height</FormHelperText>
                  <Select
                    value={this.state.ratesPlotHeight}
                    onChange={this.handleChangeRadio}
                    input={<OutlinedInput name="ratesPlotHeight" id="outlined-age-simple" />}
                  >
                    <MenuItem value={200}>200 pixels</MenuItem>
                    <MenuItem value={300}>300 pixels</MenuItem>
                    <MenuItem value={400}>400 pixels</MenuItem>
                    <MenuItem value={500}>500 pixels</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
        <div className="optionsContainers">
          <div>
            <h3 className="plotOptionsTitle">SIGNALS TO PLOT</h3>
            {ratesSelected &&
              Object.entries(ratesSelected).map(input => {
                if (input[1] === true) {
                  return <this.signalsToPlot data={input} />
                }
              })}
          </div>
        </div>
      </div>
    )
  }

  // Actions

  checkValue(data, value) {
    let name = data.id
    const props = this.props.simDataRoot.metadata.inputs[name]
    if (Number.isInteger(value) === true) {
      if (props.min <= value && value <= props.max) {
        const name = data.name
        const value = true
        const nextState = {}
        nextState[name] = value
        this.setState(nextState)
      } else {
        const name = data.name
        const value = false
        const nextState = {}
        nextState[name] = value
        this.setState(nextState)
      }
    } else {
      const name = data.name
      const value = null
      const nextState = {}
      nextState[name] = value
      this.setState(nextState)
    }
  }

  concentrationsCheckbox = name => event => {
    if (!this.state.concentrationsInitialCheck) {
      this.setState({ concentrationsInitialCheck: true })
      let state = this.state.concentrationstoPlot
      const concentrationstoPlot = Object.assign({}, state, {
        [name]: true
      })
      this.setState({ concentrationstoPlot })
    }
    let state = this.state.selectedConcentrations
    const selectedConcentrations = Object.assign({}, state, {
      [name]: event.target.checked
    })
    this.setState({ selectedConcentrations })
  }

  ratesCheckbox = name => event => {
    if (!this.state.ratesInitialCheck) {
      this.setState({ ratesInitialCheck: true })
      let state = this.state.ratestoPlot
      const ratestoPlot = Object.assign({}, state, {
        [name]: true
      })
      this.setState({ ratestoPlot })
    }
    let state = this.state.ratesSelected
    const ratesSelected = Object.assign({}, state, {
      [name]: event.target.checked
    })
    this.setState({ ratesSelected })
  }

  concentrationsCheckboxPlots = name => event => {
    let state = this.state.concentrationstoPlot
    const concentrationstoPlot = Object.assign({}, state, {
      [name]: event.target.checked
    })
    this.setState({ concentrationstoPlot })
  }

  ratesCheckboxPlots = name => event => {
    let state = this.state.ratestoPlot
    const ratestoPlot = Object.assign({}, state, {
      [name]: event.target.checked
    })
    this.setState({ ratestoPlot })
  }

  handleChangeRadio = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleChange = event => {
    let value
    if (event.target.value != '') {
      value = Number(event.target.value)
    } else {
    }
    this.checkValue(event.target, value)
    this.setState({
      [event.target.id]: value
    })
  }

  handleChangeTime = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  // Test Buttons
  submit(evt) {
    evt.preventDefault()
    const { dispatchFetchSimData } = this.props
    const inputs = this.inputs(this.props.simDataRoot.metadata.inputs)
    const concentrations = this.concentrations(this.props.simDataRoot.metadata.outputs.concentrations)
    const flux = this.flux(this.props.simDataRoot.metadata.outputs.rates)
    const data = {
      inputs: inputs,
      time: {
        t0: Number(this.state.t0),
        t_end: Number(this.state.t_end)
      },
      desired_outputs: {
        concentrations: concentrations,
        flux: flux,
        computed: []
      }
    }
    dispatchFetchSimData(data)
    this.setState({
      dataModel: null,
      hasUpdated: false
    })
  }

  inputs(data) {
    let inputs = {}
    let count = Object.keys(data).length
    let keys = Object.keys(data)
    let i
    for (i = 0; i < count; i++) {
      if (this.state[data[keys[i]].name] === true) {
        const name = keys[i]
        const value = this.state[keys[i]]
        inputs[keys[i]] = value
      }
    }
    return inputs
  }

  concentrations(data) {
    let concentrations = []
    let count = data.length
    let i
    for (i = 0; i < count; i++) {
      if (this.state.selectedConcentrations[data[i].variable] === true) {
        concentrations.push(data[i].variable)
      }
    }
    return concentrations
  }

  flux(data) {
    let flux = []
    let count = data.length
    let i
    for (i = 0; i < count; i++) {
      if (this.state.ratesSelected[data[i].variable] === true) {
        flux.push(data[i].variable)
      }
    }
    return flux
  }

  create(evt) {
    const time = this.props.simDataRoot.simData.time
    const HEX1 = this.props.simDataRoot.simData.fluxHEX1
    // const PYK = this.props.simDataRoot.simData.fluxPYK
    const GLC = this.props.simDataRoot.simData.GLC
    const data = []
    let i
    for (i = 0; i < time.length; i++) {
      data.push({ time: time[i], HEX1: HEX1[i], GLC: GLC[i] })
    }
    this.setState({
      dataModel: data
    })
  }

  // Needed For Prod
  dataFormaterTime = number => {
    const newNumber = number.toFixed(2)
    return newNumber
  }

  dataFormaterY = number => {
    const newNumber = number.toFixed(2)
    return newNumber
  }

  hidden(evt) {
    const name = evt.target.name
    const nameCheckBox = `${evt.target.name}`
    const value = evt.target.checked
    const nextState2 = {}
    nextState2[nameCheckBox] = value
    this.setState(nextState2)
  }

  initalData(simData) {
    var size = Object.keys(simData)

    let stateData = []
    for (let i = 0; i < simData.time.length; i++) {
      let prevObject = {}
      function buildObject(workingObject, name, data) {
        const newObject = Object.assign({}, workingObject, {
          [name]: data
        })
        prevObject = newObject
      }

      Object.entries(simData).map(input => {
        const name = input[0]
        const dataSet = input[1]
        const data = dataSet[i]
        const workingObject = prevObject
        buildObject(workingObject, name, data)
      })
      const superObject = prevObject
      stateData.push(superObject)
    }
    this.setState({
      dataModel: stateData,
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

// REDUX Container Component
const mapStateToProps = state => {
  return {
    simDataRoot: state.simDataRoot
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchFetchSimData: data => dispatch(fetchSimData(data)),
    dispatchFetchMetadata: () => dispatch(fetchMetadata())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Simulator)

class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue)
  }

  handleListItemClick = value => {
    this.props.onClose(value)
  }

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <div className="progress">
          <DialogTitle id="simple-dialog-title">Running Simulation</DialogTitle>
          <h6 />
          <CircularDeterminate />
          <h6 />
          <Timer>
            <Timer.Minutes /> Minutes <Timer.Seconds /> Seconds
          </Timer>
          <h1 />
        </div>
      </Dialog>
    )
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string
}

class CircularDeterminate extends React.Component {
  state = {
    completed: 0
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  progress = () => {
    const { completed } = this.state
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 })
  }

  render() {
    return (
      <div className="circle">
        <CircularProgress variant="determinate" value={this.state.completed} />
      </div>
    )
  }
}

CircularDeterminate.propTypes = {
  classes: PropTypes.object.isRequired
}
