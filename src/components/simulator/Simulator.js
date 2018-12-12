import React from 'react'
import { connect } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from 'recharts'
//
import randomColor from 'randomcolor'

//Material UI
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Clear from '@material-ui/icons/Clear'
import Done from '@material-ui/icons/Done'
import Search from '@material-ui/icons/Search'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'

import ListItemText from '@material-ui/core/ListItemText'

import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'

import InputAdornment from '@material-ui/core/InputAdornment'
import Input from '@material-ui/core/Input'

import './simulator.css'
import { fetchSimData, fetchMetadata } from '../../lib/redux/entities/simulator/simulator.actions'

import { OutlinedInput, FormControlLabel, Checkbox, RadioGroup } from '@material-ui/core'

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
      concentrationstoPlot: {},
      ratestoPlot: {},
      kf_atp: 2,
      kf_pfk: 3,
      glc_pulse: 1,
      t0: 4,
      t_end: 5
    }
  }

  render() {
    console.log(this.state)
    //console.log(this.props)
    const { simDataRoot } = this.props

    console.log(simDataRoot)

    if (this.props.simDataRoot.simhasFetched === true && this.props.simDataRoot.metahasFetched === true && this.state.hasUpdated === false) {
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

    let concentrations
    let rates
    const selectedConcentrations = this.state.selectedConcentrations

    const { inputs } = this.props.simDataRoot.metadata
    if (this.props.simDataRoot.metahasFetched === true) {
      concentrations = this.props.simDataRoot.metadata.outputs.concentrations
      rates = this.props.simDataRoot.metadata.outputs.rates
    }
    return (
      <div className="simulator-body">
        <h1>SIMULATION SETUP</h1>
        <div className="mainDashboard">
          <div className="mainDashboard-leftSide">
            <Card className="simInputs">
              <CardContent>
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
                    return <this.inputParameters data={inputData} jsonName={inputJsonName} />
                  })}
              </CardContent>
            </Card>
            <Card className="parameters">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  SIMULATION PARAMETERS
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  General Simulation parameters and settings
                </Typography>
                <List>
                  <ListItem>
                    <FormControl className="border">
                      <OutlinedInput
                        id="input-with-icon-adornment"
                        name="t0"
                        value={this.state.name}
                        onChange={this.handleChangeRadio.bind(this)}
                        placeholder="Time Start"
                        startAdornment={
                          <InputAdornment position="start">
                            <Search fontSize="small" />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </ListItem>
                  <ListItem>
                    <FormControl className="border">
                      <OutlinedInput
                        id="input-with-icon-adornment"
                        name="t_end"
                        value={this.state.name}
                        onChange={this.handleChangeRadio.bind(this)}
                        placeholder="Time End"
                        startAdornment={
                          <InputAdornment position="start">
                            <Search fontSize="small" />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </div>
          <div className="mainDashboard-rightSide">
            <Card className="parameters">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  OUTPUTS
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Select the outputs below that should be included in the simulation.
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Concentrations
                </Typography>
                {concentrations &&
                  concentrations.map(input => {
                    return <this.outputParametersConcentrations data={input} />
                  })}
                <Typography color="textSecondary" gutterBottom>
                  Rates
                </Typography>
                {rates &&
                  rates.map(input => {
                    return <this.outputParametersRates data={input} />
                  })}
              </CardContent>
            </Card>
          </div>
        </div>
        <Button variant="contained" size="large" id="simButton" onClick={this.submit.bind(this)}>
          SIMULATE
        </Button>
        <div className="chartContainers">
          <div className="chartSubContainers">
            <this.concentrationsCharts />
          </div>
          <div className="selectionPane">
            <Card className="parameters">
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
            <Card className="parameters">
              <CardContent>
                {/* <Typography gutterBottom>PLOT OPTIONS</Typography> */}
                <this.ratesplotOptions name="rates" XAxis="ratesXAxis" YAxis="ratesYAxis" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Material UI Components

  ratesLines = data => {
    //console.log(data)
    return <Line type="monotone" dataKey="GLC" stroke="#8884d8" />
  }

  inputParameters = data => {
    const props = data.data

    const jsonName = this.state[data.jsonName]
    return (
      <div className="input-box">
        <Typography gutterBottom>{props.name}</Typography>
        <Typography gutterBottom>{props.description}</Typography>
        <FormControl>
          <List>
            <ListItem style={{ padding: 0 }}>
              <ListItemIcon>
                {!jsonName && <Clear style={{ color: 'red' }} />}
                {jsonName && <Done style={{ color: '#28FF49' }} />}
              </ListItemIcon>
              <Input id={data.jsonName} type="phone" name={props.name} value={this.state.name} onChange={this.handleChange.bind(this)} />
              <ListItemText primary={props.unit} />
            </ListItem>
            {!jsonName && (
              <FormHelperText id="component-helper-text">
                Input must be between {props.min} and {props.max}
              </FormHelperText>
            )}
          </List>
        </FormControl>
      </div>
    )
  }

  outputParametersConcentrations = data => {
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
          <Checkbox onChange={this.concentrationsCheckbox(data.data.id)} value={data.data.id} />
        </MuiThemeProvider>
        <div className="output-box_des">
          <Typography color="textSecondary" gutterBottom>
            {data.data.name}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {data.data.description}
          </Typography>
        </div>
      </div>
    )
  }

  outputParametersRates = data => {
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
          <Checkbox onChange={this.ratesCheckbox(data.data.id)} value={data.data.id} />
        </MuiThemeProvider>
        <div className="output-box_des">
          <Typography color="textSecondary" gutterBottom>
            {data.data.name}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {data.data.description}
          </Typography>
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
        obj[item.id] = item
        return obj
      }, {})

    const concentrationsObject = arrayToObject(concentrations)
    const ratesObject = arrayToObject(rates)

    const hydratedConcentration = concentrationsObject[data.data[0]]
    const hydratedRates = ratesObject[data.data[0]]
    //console.log(data.data[0])
    //console.log(hydratedConcentration)

    if (hydratedConcentration) {
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
      return (
        <div className="output-box">
          <MuiThemeProvider theme={outerTheme}>
            <Checkbox checked={ratescheckedValue} onChange={this.ratesCheckboxPlots(name)} value={name} />
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
    const color = randomColor()
    return (
      <div className="chartSubContainers">
        <ResponsiveContainer height={200}>
          <LineChart data={this.state.dataModel} style={{ overflow: 'unset' }} syncId="metaProfiles">
            <XAxis dataKey="time" tickFormatter={number => this.dataFormaterTime(number)} scale={this.state.concentrationXAxis}>
              <Label value="Time (hours)" offset={0} position="bottom" />
            </XAxis>
            <YAxis
              domain={['auto', 'auto']}
              label={{ value: 'Metabolite  Concentration  (mmol)', position: 'top', dx: 50, dy: -10 }}
              tickFormatter={number => this.dataFormaterY(number)}
              scale={this.state.concentrationYAxis}
            />
            <Tooltip />
            {concentrationstoPlot &&
              Object.entries(concentrationstoPlot).map(input => {
                //console.log(input)
                if (input[1] === true) {
                  return <Line type="monotone" dataKey={input[0]} stroke={color} />
                }
              })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

  ratesCharts = props => {
    const ratestoPlot = this.state.ratestoPlot
    const color = randomColor()
    return (
      <div className="chartSubContainers">
        <ResponsiveContainer height={200}>
          <LineChart data={this.state.dataModel} style={{ overflow: 'unset' }} syncId="metaProfiles">
            <XAxis dataKey="time" tickFormatter={number => this.dataFormaterTime(number)} scale={this.state.ratesXAxis}>
              <Label value="Time (hours)" offset={0} position="bottom" />
            </XAxis>
            <YAxis
              domain={['auto', 'auto']}
              label={{ value: 'Flux (mmol/hour)', position: 'top', dx: 50, dy: -10 }}
              tickFormatter={number => this.dataFormaterY(number)}
              scale={this.state.ratesYAxis}
            />
            <Tooltip />
            {ratestoPlot &&
              Object.entries(ratestoPlot).map(input => {
                //console.log(input)
                if (input[1] === true) {
                  return <Line type="monotone" dataKey={input[0]} stroke={color} />
                }
              })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

  bigButton = props => {
    const ischecked = `this.state.${props.name}`
    // //console.log(props.checked)
    return (
      <div className="buttonRow">
        <input name={props.name} type="checkbox" onChange={this.hidden.bind(this)} checked={props.checked} />
        <h4>{props.displayName}</h4>
      </div>
    )
  }

  concentrationsplotOptions = props => {
    const selectedConcentrations = this.state.selectedConcentrations
    console.log(props)
    return (
      <div>
        <div className="optionsContainers">
          <div>
            <h3 className="plotOptionsTitle">PLOT OPTIONS</h3>
            <div className="plotOptions">
              <div className="plotOptions-row">
                <h3>X Axis</h3>
                <RadioGroup
                  aria-label={props.name}
                  name={props.XAxis}
                  value={this.state[props.XAxis]}
                  onChange={this.handleChangeRadio}
                  class="radioGroup"
                >
                  <FormControlLabel value="Linear" control={<Checkbox />} label="Linear" />
                  <FormControlLabel value="Logarithmic" control={<Checkbox />} label="Logarithmic" />
                </RadioGroup>
              </div>

              <div className="plotOptions-row">
                <h3>Y Axis</h3>
                <RadioGroup
                  aria-label={props.name}
                  name={props.YAxis}
                  value={this.state[props.YAxis]}
                  onChange={this.handleChangeRadio}
                  class="radioGroup"
                >
                  <FormControlLabel value="Linear" control={<Checkbox />} label="Linear" />
                  <FormControlLabel value="Logarithmic" control={<Checkbox />} label="Logarithmic" />
                </RadioGroup>
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
    console.log(props)
    return (
      <div>
        <div className="optionsContainers">
          <div>
            <h3 className="plotOptionsTitle">PLOT OPTIONS</h3>
            <div className="plotOptions">
              <div className="plotOptions-row">
                <h3>X Axis</h3>
                <RadioGroup
                  aria-label={props.name}
                  name={props.XAxis}
                  value={this.state[props.XAxis]}
                  onChange={this.handleChangeRadio}
                  class="radioGroup"
                >
                  <FormControlLabel value="Linear" control={<Checkbox />} label="Linear" />
                  <FormControlLabel value="Logarithmic" control={<Checkbox />} label="Logarithmic" />
                </RadioGroup>
              </div>

              <div className="plotOptions-row">
                <h3>Y Axis</h3>
                <RadioGroup
                  aria-label={props.name}
                  name={props.YAxis}
                  value={this.state[props.YAxis]}
                  onChange={this.handleChangeRadio}
                  class="radioGroup"
                >
                  <FormControlLabel value="Linear" control={<Checkbox />} label="Linear" />
                  <FormControlLabel value="Logarithmic" control={<Checkbox />} label="Logarithmic" />
                </RadioGroup>
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
      const value = false
      const nextState = {}
      nextState[name] = value
      this.setState(nextState)
    }
  }

  concentrationsCheckbox = name => event => {
    let state = this.state.selectedConcentrations
    const selectedConcentrations = Object.assign({}, state, {
      [name]: event.target.checked
    })
    this.setState({ selectedConcentrations })
  }

  ratesCheckbox = name => event => {
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
    //console.log(event.target)
    this.setState({ [event.target.name]: event.target.value })
  }

  handleChange = event => {
    //console.log(typeof event.target.value)
    //console.log(event.target.value)
    let value
    if (event.target.value != '') {
      value = Number(event.target.value)
    } else {
    }
    //console.log(typeof value)
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
        t_end: Number(this.state.t_end),
      },
      desired_outputs: {
        concentrations: concentrations,
        flux: flux,
        computed: []
      }
    }
    dispatchFetchSimData(data)
  }

  inputs(data) {
    let inputs = {}
    let count = Object.keys(data).length
    let keys = Object.keys(data)
    //console.log(keys)
    let i
    for (i = 0; i < count; i++) {
      if (this.state[data[keys[i]].name] === true) {
        const name = keys[i]
        //console.log(name)
        const value = this.state[keys[i]]
        //console.log(value)
        inputs[keys[i]] = value
      }
    }
    return inputs
  }

  concentrations(data) {
    let concentrations = []
    let count = data.length
    //console.log(count)
    let i
    for (i = 0; i < count; i++) {
      //console.log(data[i].variable)
      //console.log(this.state.selectedConcentrations[data[i].id])
      if (this.state.selectedConcentrations[data[i].id] === true) {
        concentrations.push(data[i].variable)
      }
    }
    //console.log(concentrations)
    return concentrations
  }

  flux(data) {
    let flux = []
    let count = data.length
    //console.log(count)
    let i
    for (i = 0; i < count; i++) {
      //console.log(data[i].variable)
      //console.log(this.state.ratesSelected[data[i].id])
      if (this.state.ratesSelected[data[i].id] === true) {
        flux.push(data[i].variable)
      }
    }
    //console.log(flux)
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
    //console.log(this.state)
  }

  // Needed For Prod
  dataFormaterTime = number => {
    const newNumber = Math.round(number * 1) / 1
    return newNumber
  }

  dataFormaterY = number => {
    const newNumber = Math.round(number * 10000000) / 10000000
    return newNumber
  }

  hidden(evt) {
    //console.log(evt.target)
    const name = evt.target.name
    const nameCheckBox = `${evt.target.name}`
    const value = evt.target.checked
    const nextState2 = {}
    nextState2[nameCheckBox] = value
    this.setState(nextState2)
  }

  initalData(simDataRoot) {
    console.log(simDataRoot)
    const time = simDataRoot.simData.time
    const HEX1 = simDataRoot.simData.fluxHEX1
    // const PYK = simDataRoot.simData.fluxPYK
    const GLC = simDataRoot.simData.GLC
    // const computed = simDataRoot.simData.computed
    const data = []
    let i
    for (i = 0; i < time.length; i++) {
      data.push({ time: time[i], HEX: HEX1[i], GLC: GLC[i] })
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
