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
    console.log('are we doing this?')
  }

  constructor(props) {
    super(props)
    this.state = {
      dataModel: [
        { time: 0, HEX1: 1.1200003936403289, GLC: 1.24079, PYK: 2.239974781275909 },
        { time: 1.1904761904761905, HEX1: 1.120000410506264, GLC: 1.2407899999999505, PYK: 2.2399745980164116 },
        { time: 2.380952380952381, HEX1: 1.120000426623123, GLC: 1.240789999999899, PYK: 2.239974423467453 },
        { time: 3.571428571428571, HEX1: 1.1200004467815643, GLC: 1.240789999999831, PYK: 2.2399742056237337 },
        { time: 4.761904761904762, HEX1: 1.1200004657630653, GLC: 1.2407899999997603, PYK: 2.2399740014371834 },
        { time: 5.9523809523809526, HEX1: 1.120000483633099, GLC: 1.2407899999996865, PYK: 2.2399738101183146 },
        { time: 7.142857142857142, HEX1: 1.1200005004334221, GLC: 1.2407899999996101, PYK: 2.2399736311370813 },
        { time: 8.333333333333334, HEX1: 1.1200005162434528, GLC: 1.2407899999995313, PYK: 2.239973463566645 },
        { time: 9.523809523809524, HEX1: 1.1200005311177277, GLC: 1.24078999999945, PYK: 2.2399733067519785 },
        { time: 10.714285714285714, HEX1: 1.1200005451139208, GLC: 1.2407899999993666, PYK: 2.2399731600105746 },
        { time: 11.904761904761905, HEX1: 1.120000558274135, GLC: 1.2407899999992809, PYK: 2.2399730228284125 },
        { time: 13.095238095238095, HEX1: 1.1200005706446923, GLC: 1.2407899999991931, PYK: 2.2399728946513195 },
        { time: 14.285714285714285, HEX1: 1.1200005896085214, GLC: 1.2407899999990435, PYK: 2.2399726997821734 },
        { time: 15.476190476190476, HEX1: 1.1200006066918404, GLC: 1.240789999998889, PYK: 2.2399725261963583 },
        { time: 16.666666666666668, HEX1: 1.120000622066464, GLC: 1.2407899999987304, PYK: 2.2399723718499054 },
        { time: 17.857142857142858, HEX1: 1.120000676433732, GLC: 1.2407899999979182, PYK: 2.239971847796276 },
        { time: 19.047619047619047, HEX1: 1.120000681232232, GLC: 1.2407899999978176, PYK: 2.239971803705395 },
        { time: 20.238095238095237, HEX1: 1.1200006857250109, GLC: 1.2407899999977163, PYK: 2.239971762924233 },
        { time: 21.428571428571427, HEX1: 1.1200006899318096, GLC: 1.2407899999976144, PYK: 2.2399717252211704 },
        { time: 22.61904761904762, HEX1: 1.1200006938685154, GLC: 1.2407899999975118, PYK: 2.2399716904117097 },
        { time: 23.80952380952381, HEX1: 1.1200006977129782, GLC: 1.240789999997404, PYK: 2.2399716569099777 },
        { time: 25, HEX1: 1.120000701294686, GLC: 1.2407899999972956, PYK: 2.239971626195393 },
        { time: 26.19047619047619, HEX1: 1.1200007046289944, GLC: 1.2407899999971865, PYK: 2.239971598090857 },
        { time: 27.38095238095238, HEX1: 1.1200007189273347, GLC: 1.2407899999966063, PYK: 2.2399714837604745 },
        { time: 28.57142857142857, HEX1: 1.1200007285276765, GLC: 1.2407899999960166, PYK: 2.239971417195697 },
        { time: 29.761904761904763, HEX1: 1.1200007346271679, GLC: 1.2407899999954204, PYK: 2.2399713849616414 },
        { time: 30.952380952380953, HEX1: 1.1200007394893383, GLC: 1.2407899999941088, PYK: 2.2399713931321377 },
        { time: 32.142857142857146, HEX1: 1.1200007386301372, GLC: 1.240789999992792, PYK: 2.239971446072041 },
        { time: 33.333333333333336, HEX1: 1.120000736338262, GLC: 1.2407899999914793, PYK: 2.2399715000750575 },
        { time: 34.523809523809526, HEX1: 1.1200007340108855, GLC: 1.2407899999901721, PYK: 2.23997154400093 },
        { time: 35.714285714285715, HEX1: 1.1200007319216332, GLC: 1.2407899999888699, PYK: 2.239971578576218 },
        { time: 36.904761904761905, HEX1: 1.1200007300842951, GLC: 1.2407899999875716, PYK: 2.2399716064757706 },
        { time: 38.095238095238095, HEX1: 1.1200007285021922, GLC: 1.2407899999862761, PYK: 2.239971629663913 },
        { time: 39.285714285714285, HEX1: 1.12000072597828, GLC: 1.2407899999834993, PYK: 2.2399716685767364 },
        { time: 40.476190476190474, HEX1: 1.1200007244321932, GLC: 1.24078999998073, PYK: 2.239971702304017 },
        { time: 41.666666666666664, HEX1: 1.1200007234929776, GLC: 1.2407899999779652, PYK: 2.239971738884942 },
        { time: 42.857142857142854, HEX1: 1.1200007228492852, GLC: 1.2407899999752035, PYK: 2.2399717824766903 },
        { time: 44.047619047619044, HEX1: 1.1200007215006744, GLC: 1.2407899999670222, PYK: 2.2399719530596407 },
        { time: 45.23809523809524, HEX1: 1.1200007204133133, GLC: 1.2407899999588539, PYK: 2.2399721789555778 },
        { time: 46.42857142857143, HEX1: 1.120000719437728, GLC: 1.240789999950697, PYK: 2.2399724424620175 },
        { time: 47.61904761904762, HEX1: 1.1200007175569058, GLC: 1.2407899999338254, PYK: 2.23997306179536 },
        { time: 48.80952380952381, HEX1: 1.1200007156918221, GLC: 1.2407899999169985, PYK: 2.239973709763731 },
        { time: 50, HEX1: 1.1200007138675143, GLC: 1.240789999900214, PYK: 2.2399743425806333 },
        { time: 51.19047619047619, HEX1: 1.120000712136325, GLC: 1.240789999883471, PYK: 2.239974954124599 },
        { time: 52.38095238095238, HEX1: 1.1200007079222856, GLC: 1.240789999840135, PYK: 2.2399764693707067 },
        { time: 53.57142857142857, HEX1: 1.1200007040269842, GLC: 1.2407899997970444, PYK: 2.239977866262642 },
        { time: 54.76190476190476, HEX1: 1.1200007003664287, GLC: 1.2407899997541847, PYK: 2.2399791507519757 },
        { time: 55.95238095238095, HEX1: 1.1200006937613844, GLC: 1.2407899996715661, PYK: 2.2399813593545437 },
        { time: 57.14285714285714, HEX1: 1.1200006877269932, GLC: 1.240789999589695, PYK: 2.239983227945658 },
        { time: 58.333333333333336, HEX1: 1.120000682162773, GLC: 1.2407899995085123, PYK: 2.2399848048425506 },
        { time: 59.523809523809526, HEX1: 1.1200006699339662, GLC: 1.2407899992906823, PYK: 2.2399874645603512 },
        { time: 60.714285714285715, HEX1: 1.1200006596702383, GLC: 1.24078999907619, PYK: 2.2399892517590474 },
        { time: 61.904761904761905, HEX1: 1.1200006449398168, GLC: 1.2407899986673332, PYK: 2.2399909925175883 },
        { time: 63.095238095238095, HEX1: 1.120000633989172, GLC: 1.2407899982654185, PYK: 2.2399918311835796 },
        { time: 64.28571428571429, HEX1: 1.1200006225876507, GLC: 1.240789997642479, PYK: 2.239992283747002 },
        { time: 65.47619047619048, HEX1: 1.1200006148845747, GLC: 1.240789997027247, PYK: 2.2399924243497376 },
        { time: 66.66666666666667, HEX1: 1.1200006057401253, GLC: 1.240789996087817, PYK: 2.2399925360836317 },
        { time: 67.85714285714286, HEX1: 1.1200006005997905, GLC: 1.2407899951587589, PYK: 2.239992553673661 },
        { time: 69.04761904761905, HEX1: 1.1200005972232674, GLC: 1.2407899942366405, PYK: 2.239992611224001 },
        { time: 70.23809523809524, HEX1: 1.120000592767338, GLC: 1.240789992613317, PYK: 2.2399927959290262 },
        { time: 71.42857142857143, HEX1: 1.1200005868958833, GLC: 1.240789991005206, PYK: 2.2399930353947455 },
        { time: 72.61904761904762, HEX1: 1.120000578797516, GLC: 1.240789989414857, PYK: 2.2399932262273756 },
        { time: 73.80952380952381, HEX1: 1.1200005693639106, GLC: 1.2407899878470972, PYK: 2.23999334930985 },
        { time: 75, HEX1: 1.1200005416588283, GLC: 1.2407899838422551, PYK: 2.2399935946839236 },
        { time: 76.19047619047619, HEX1: 1.1200005105450734, GLC: 1.2407899800526516, PYK: 2.2399937672272827 },
        { time: 77.38095238095238, HEX1: 1.1200004767633054, GLC: 1.2407899764972141, PYK: 2.239993906136945 },
        { time: 78.57142857142857, HEX1: 1.1200003228422626, GLC: 1.2407899664930993, PYK: 2.2399944380443264 },
        { time: 79.76190476190476, HEX1: 1.1200001804076216, GLC: 1.2407899609026956, PYK: 2.2399950137001485 },
        { time: 80.95238095238095, HEX1: 1.1199999984598388, GLC: 1.2407899609816069, PYK: 2.2399959761485455 },
        { time: 82.14285714285714, HEX1: 1.119999871315596, GLC: 1.2407899675748446, PYK: 2.2399968530344787 },
        { time: 83.33333333333333, HEX1: 1.1199997727500166, GLC: 1.240789987190152, PYK: 2.23999795482721 },
        { time: 84.52380952380952, HEX1: 1.1199997480769894, GLC: 1.2407900089351362, PYK: 2.239998717176801 },
        { time: 85.71428571428571, HEX1: 1.1199998007790195, GLC: 1.2407900403144994, PYK: 2.239999441027869 },
        { time: 86.9047619047619, HEX1: 1.1199998803374964, GLC: 1.24079005916258, PYK: 2.239999817721029 },
        { time: 88.09523809523809, HEX1: 1.1200000026755366, GLC: 1.2407900583733151, PYK: 2.2400000945278293 },
        { time: 89.28571428571429, HEX1: 1.120000080337274, GLC: 1.2407900346743734, PYK: 2.240000208360932 },
        { time: 90.47619047619048, HEX1: 1.1200001247580484, GLC: 1.2407899697775715, PYK: 2.240000246631228 },
        { time: 91.66666666666667, HEX1: 1.120000121949251, GLC: 1.240789906341855, PYK: 2.2400002255390836 },
        { time: 92.85714285714286, HEX1: 1.1200000805560042, GLC: 1.2407898294637718, PYK: 2.240000155122438 },
        { time: 94.04761904761905, HEX1: 1.1200000437136288, GLC: 1.240789787745962, PYK: 2.2400000980105137 },
        { time: 95.23809523809524, HEX1: 1.1200000066359856, GLC: 1.2407897690363476, PYK: 2.240000034069764 },
        { time: 96.42857142857143, HEX1: 1.1199999973388735, GLC: 1.240789776539171, PYK: 2.2400000094821726 },
        { time: 97.61904761904762, HEX1: 1.1199999963510863, GLC: 1.2407898157591477, PYK: 2.239999985491132 },
        { time: 98.80952380952381, HEX1: 1.1199999972201444, GLC: 1.2407898456381485, PYK: 2.2399999778970243 },
        { time: 100, HEX1: 1.1199999991187144, GLC: 1.2407899061212218, PYK: 2.2399999877289765 }
      ],
      checkBox: false,
      min: 0,
      max: 14,
      HEX1Select: false,
      hasUpdated: false,
      mcpXAxis: 'linear',
      mcpYAxis: 'linear',
      rvpXAxis: 'linear',
      rvpYAxis: 'linear'
    }
  }

  render() {
    console.log(this.state)
    console.log(this.props)
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
                <this.bigButton name="GLC" checked={this.state.GLC} displayName="Glucose (GLC)" />
                <this.bigButton name="LAC" checked={this.state.LAC} displayName="Lactate (LAC)" />
                <this.bigButton name="G3P" checked={this.state.G3P} displayName="Glycerol-3-phosphate (G3P)" />
                <this.bigButton name="ATP" checked={this.state.ATP} displayName="Adenosine triphosphate (ATP)" />
                <this.bigButton name="ADP" checked={this.state.ADP} displayName="Adenosine diphosphate (ADP)" />
                <this.bigButton name="AMP" checked={this.state.AMP} displayName="Adenosine monophosphate (AMP)" />
                <this.bigButton
                  name="NADH"
                  checked={this.state.NADH}
                  displayName="Reduced nicotinamideadenine dinucleotide (NADH)"
                />
                <this.bigButton
                  name="NAD"
                  checked={this.state.NAD}
                  displayName="Nicotinamide adeninedinucleotide (NAD)"
                />
              </div>
            </div>
            <this.plotOptions name="mcp" XAxis={this.state.mcpXAxis} YAxis={this.state.mcpYAxis} />
            {this.state.GLC && <this.mcpCharts name="GLC" />}
            {this.state.LAC && <this.mcpCharts name="LAC" />}
            {this.state.G3P && <this.mcpCharts name="G3P" />}
            {this.state.ATP && <this.mcpCharts name="ATP" />}
            {this.state.ADP && <this.mcpCharts name="ADP" />}
            {this.state.AMP && <this.mcpCharts name="AMP" />}
            {this.state.NADH && <this.mcpCharts name="NADH" />}
            {this.state.NAD && <this.mcpCharts name="NAD" />}
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
            {this.state.HEX1 && <this.rvpCharts name="HEX1" lineColor="green" />}
            {this.state.PYK && <this.rvpCharts name="PYK" lineColor="blue" />}
          </div>
        </div>
      </div>
    )
  }

  // Components
  mcpCharts = props => {
    return (
      <div className="chartSubContainers">
        <ResponsiveContainer height={200}>
          <LineChart data={this.state.dataModel} style={{ overflow: 'unset' }} syncId="metaProfiles">
            <XAxis dataKey="time" tickFormatter={number => this.dataFormaterTime(number)} scale={this.state.mcpXAxis}>
              <Label value="Time (hours)" offset={0} position="bottom" />
            </XAxis>
            <YAxis
              domain={['auto', 'auto']}
              label={{ value: 'Metabolite  Concentration  (mmol)', position: 'top', dx: 50, dy: -10 }}
              tickFormatter={number => this.dataFormaterY(number)}
              scale={this.state.mcpYAxis}
            />
            <Tooltip />
            <Line type="monotone" dataKey={props.name} stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

  rvpCharts = props => {
    return (
      <div className="chartSubContainers">
        <ResponsiveContainer height={200}>
          <LineChart data={this.state.dataModel} style={{ overflow: 'unset' }} syncId="velProfiles">
            <XAxis dataKey="time" tickFormatter={number => this.dataFormaterTime(number)} scale={this.state.rvpXAxis}>
              <Label value="Time (hours)" offset={0} position="bottom" />
            </XAxis>
            <YAxis
              allowDataOverflow={true}
              domain={['auto', 'auto']}
              label={{ value: 'Reaction Flux (mmol/hour)', position: 'top', dx: 50, dy: -10 }}
              type="number"
              yAxisId="1"
              tickFormatter={number => this.dataFormaterY(number)}
              scale={this.state.rvpYAxis}
            />
            <Tooltip />
            <Line yAxisId="1" type="monotone" dataKey={props.name} stroke={props.lineColor} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

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
      <div className="optionsContainers">
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

  // Test Buttons
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
    const GLC = this.props.simDataRoot.simData.GLC
    const data = []
    let i
    for (i = 0; i < time.length; i++) {
      data.push({ time: time[i], HEX1: HEX1[i], GLC: GLC[i], PYK: PYK[i] })
    }
    this.setState({
      dataModel: data
    })
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
    const GLC = simDataRoot.simData.GLC
    // const computed = simDataRoot.simData.computed
    const data = []
    let i
    for (i = 0; i < time.length; i++) {
      data.push({ time: time[i], HEX1: HEX1[i], GLC: GLC[i], PYK: PYK[i] })
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
    dispatchFetchSimData: () => dispatch(fetchSimData())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Simulator)
