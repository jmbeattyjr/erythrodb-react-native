import React from 'react'

function hidden(evt) {
  console.log(evt.target)
  const name = evt.target.name
  const nameCheckBox = `${evt.target.name}`
  const value = evt.target.checked
  const nextState2 = {}
  nextState2[nameCheckBox] = value
  this.setState(nextState2)
}

function handleOptionChange(evt) {
  const name = evt.target.name
  const value = evt.target.value
  const nextState = {}
  nextState[name] = value
  this.setState(nextState)
}

const BigButton = props => {
  const ischecked = `this.state.${props.name}`
  console.log(props.checked)
  return (
    <div className="buttonRow">
      <input name={props.name} type="checkbox" onChange={hidden.bind(this)} checked={props.checked} />
      <h4>{props.displayName}</h4>
    </div>
  )
}

const PlotOptions = props => {
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
                    onChange={handleOptionChange.bind(this)}
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
                    onChange={handleOptionChange.bind(this)}
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
                    onChange={handleOptionChange.bind(this)}
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
                    onChange={handleOptionChange.bind(this)}
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

module.exports = {
  BigButton,
  PlotOptions
}

// dataModel: [
      //   { time: 0, HEX1: 1.1200003936403289, concentrationsGlcDC: 1.24079, PYK: 2.239974781275909 },
      //   { time: 1.1904761904761905, HEX1: 1.120000410506264, concentrationsGlcDC: 1.2407899999999505, PYK: 2.2399745980164116 },
      //   { time: 2.380952380952381, HEX1: 1.120000426623123, concentrationsGlcDC: 1.240789999999899, PYK: 2.239974423467453 },
      //   { time: 3.571428571428571, HEX1: 1.1200004467815643, concentrationsGlcDC: 1.240789999999831, PYK: 2.2399742056237337 },
      //   { time: 4.761904761904762, HEX1: 1.1200004657630653, concentrationsGlcDC: 1.2407899999997603, PYK: 2.2399740014371834 },
      //   { time: 5.9523809523809526, HEX1: 1.120000483633099, concentrationsGlcDC: 1.2407899999996865, PYK: 2.2399738101183146 },
      //   { time: 7.142857142857142, HEX1: 1.1200005004334221, concentrationsGlcDC: 1.2407899999996101, PYK: 2.2399736311370813 },
      //   { time: 8.333333333333334, HEX1: 1.1200005162434528, concentrationsGlcDC: 1.2407899999995313, PYK: 2.239973463566645 },
      //   { time: 9.523809523809524, HEX1: 1.1200005311177277, concentrationsGlcDC: 1.24078999999945, PYK: 2.2399733067519785 },
      //   { time: 10.714285714285714, HEX1: 1.1200005451139208, concentrationsGlcDC: 1.2407899999993666, PYK: 2.2399731600105746 },
      //   { time: 11.904761904761905, HEX1: 1.120000558274135, concentrationsGlcDC: 1.2407899999992809, PYK: 2.2399730228284125 },
      //   { time: 13.095238095238095, HEX1: 1.1200005706446923, concentrationsGlcDC: 1.2407899999991931, PYK: 2.2399728946513195 },
      //   { time: 14.285714285714285, HEX1: 1.1200005896085214, concentrationsGlcDC: 1.2407899999990435, PYK: 2.2399726997821734 },
      //   { time: 15.476190476190476, HEX1: 1.1200006066918404, concentrationsGlcDC: 1.240789999998889, PYK: 2.2399725261963583 },
      //   { time: 16.666666666666668, HEX1: 1.120000622066464, concentrationsGlcDC: 1.2407899999987304, PYK: 2.2399723718499054 },
      //   { time: 17.857142857142858, HEX1: 1.120000676433732, concentrationsGlcDC: 1.2407899999979182, PYK: 2.239971847796276 },
      //   { time: 19.047619047619047, HEX1: 1.120000681232232, concentrationsGlcDC: 1.2407899999978176, PYK: 2.239971803705395 },
      //   { time: 20.238095238095237, HEX1: 1.1200006857250109, concentrationsGlcDC: 1.2407899999977163, PYK: 2.239971762924233 },
      //   { time: 21.428571428571427, HEX1: 1.1200006899318096, concentrationsGlcDC: 1.2407899999976144, PYK: 2.2399717252211704 },
      //   { time: 22.61904761904762, HEX1: 1.1200006938685154, concentrationsGlcDC: 1.2407899999975118, PYK: 2.2399716904117097 },
      //   { time: 23.80952380952381, HEX1: 1.1200006977129782, concentrationsGlcDC: 1.240789999997404, PYK: 2.2399716569099777 },
      //   { time: 25, HEX1: 1.120000701294686, concentrationsGlcDC: 1.2407899999972956, PYK: 2.239971626195393 },
      //   { time: 26.19047619047619, HEX1: 1.1200007046289944, concentrationsGlcDC: 1.2407899999971865, PYK: 2.239971598090857 },
      //   { time: 27.38095238095238, HEX1: 1.1200007189273347, concentrationsGlcDC: 1.2407899999966063, PYK: 2.2399714837604745 },
      //   { time: 28.57142857142857, HEX1: 1.1200007285276765, concentrationsGlcDC: 1.2407899999960166, PYK: 2.239971417195697 },
      //   { time: 29.761904761904763, HEX1: 1.1200007346271679, concentrationsGlcDC: 1.2407899999954204, PYK: 2.2399713849616414 },
      //   { time: 30.952380952380953, HEX1: 1.1200007394893383, concentrationsGlcDC: 1.2407899999941088, PYK: 2.2399713931321377 },
      //   { time: 32.142857142857146, HEX1: 1.1200007386301372, concentrationsGlcDC: 1.240789999992792, PYK: 2.239971446072041 },
      //   { time: 33.333333333333336, HEX1: 1.120000736338262, concentrationsGlcDC: 1.2407899999914793, PYK: 2.2399715000750575 },
      //   { time: 34.523809523809526, HEX1: 1.1200007340108855, concentrationsGlcDC: 1.2407899999901721, PYK: 2.23997154400093 },
      //   { time: 35.714285714285715, HEX1: 1.1200007319216332, concentrationsGlcDC: 1.2407899999888699, PYK: 2.239971578576218 },
      //   { time: 36.904761904761905, HEX1: 1.1200007300842951, concentrationsGlcDC: 1.2407899999875716, PYK: 2.2399716064757706 },
      //   { time: 38.095238095238095, HEX1: 1.1200007285021922, concentrationsGlcDC: 1.2407899999862761, PYK: 2.239971629663913 },
      //   { time: 39.285714285714285, HEX1: 1.12000072597828, concentrationsGlcDC: 1.2407899999834993, PYK: 2.2399716685767364 },
      //   { time: 40.476190476190474, HEX1: 1.1200007244321932, concentrationsGlcDC: 1.24078999998073, PYK: 2.239971702304017 },
      //   { time: 41.666666666666664, HEX1: 1.1200007234929776, concentrationsGlcDC: 1.2407899999779652, PYK: 2.239971738884942 },
      //   { time: 42.857142857142854, HEX1: 1.1200007228492852, concentrationsGlcDC: 1.2407899999752035, PYK: 2.2399717824766903 },
      //   { time: 44.047619047619044, HEX1: 1.1200007215006744, concentrationsGlcDC: 1.2407899999670222, PYK: 2.2399719530596407 },
      //   { time: 45.23809523809524, HEX1: 1.1200007204133133, concentrationsGlcDC: 1.2407899999588539, PYK: 2.2399721789555778 },
      //   { time: 46.42857142857143, HEX1: 1.120000719437728, concentrationsGlcDC: 1.240789999950697, PYK: 2.2399724424620175 },
      //   { time: 47.61904761904762, HEX1: 1.1200007175569058, concentrationsGlcDC: 1.2407899999338254, PYK: 2.23997306179536 },
      //   { time: 48.80952380952381, HEX1: 1.1200007156918221, concentrationsGlcDC: 1.2407899999169985, PYK: 2.239973709763731 },
      //   { time: 50, HEX1: 1.1200007138675143, concentrationsGlcDC: 1.240789999900214, PYK: 2.2399743425806333 },
      //   { time: 51.19047619047619, HEX1: 1.120000712136325, concentrationsGlcDC: 1.240789999883471, PYK: 2.239974954124599 },
      //   { time: 52.38095238095238, HEX1: 1.1200007079222856, concentrationsGlcDC: 1.240789999840135, PYK: 2.2399764693707067 },
      //   { time: 53.57142857142857, HEX1: 1.1200007040269842, concentrationsGlcDC: 1.2407899997970444, PYK: 2.239977866262642 },
      //   { time: 54.76190476190476, HEX1: 1.1200007003664287, concentrationsGlcDC: 1.2407899997541847, PYK: 2.2399791507519757 },
      //   { time: 55.95238095238095, HEX1: 1.1200006937613844, concentrationsGlcDC: 1.2407899996715661, PYK: 2.2399813593545437 },
      //   { time: 57.14285714285714, HEX1: 1.1200006877269932, concentrationsGlcDC: 1.240789999589695, PYK: 2.239983227945658 },
      //   { time: 58.333333333333336, HEX1: 1.120000682162773, concentrationsGlcDC: 1.2407899995085123, PYK: 2.2399848048425506 },
      //   { time: 59.523809523809526, HEX1: 1.1200006699339662, concentrationsGlcDC: 1.2407899992906823, PYK: 2.2399874645603512 },
      //   { time: 60.714285714285715, HEX1: 1.1200006596702383, concentrationsGlcDC: 1.24078999907619, PYK: 2.2399892517590474 },
      //   { time: 61.904761904761905, HEX1: 1.1200006449398168, concentrationsGlcDC: 1.2407899986673332, PYK: 2.2399909925175883 },
      //   { time: 63.095238095238095, HEX1: 1.120000633989172, concentrationsGlcDC: 1.2407899982654185, PYK: 2.2399918311835796 },
      //   { time: 64.28571428571429, HEX1: 1.1200006225876507, concentrationsGlcDC: 1.240789997642479, PYK: 2.239992283747002 },
      //   { time: 65.47619047619048, HEX1: 1.1200006148845747, concentrationsGlcDC: 1.240789997027247, PYK: 2.2399924243497376 },
      //   { time: 66.66666666666667, HEX1: 1.1200006057401253, concentrationsGlcDC: 1.240789996087817, PYK: 2.2399925360836317 },
      //   { time: 67.85714285714286, HEX1: 1.1200006005997905, concentrationsGlcDC: 1.2407899951587589, PYK: 2.239992553673661 },
      //   { time: 69.04761904761905, HEX1: 1.1200005972232674, concentrationsGlcDC: 1.2407899942366405, PYK: 2.239992611224001 },
      //   { time: 70.23809523809524, HEX1: 1.120000592767338, concentrationsGlcDC: 1.240789992613317, PYK: 2.2399927959290262 },
      //   { time: 71.42857142857143, HEX1: 1.1200005868958833, concentrationsGlcDC: 1.240789991005206, PYK: 2.2399930353947455 },
      //   { time: 72.61904761904762, HEX1: 1.120000578797516, concentrationsGlcDC: 1.240789989414857, PYK: 2.2399932262273756 },
      //   { time: 73.80952380952381, HEX1: 1.1200005693639106, concentrationsGlcDC: 1.2407899878470972, PYK: 2.23999334930985 },
      //   { time: 75, HEX1: 1.1200005416588283, concentrationsGlcDC: 1.2407899838422551, PYK: 2.2399935946839236 },
      //   { time: 76.19047619047619, HEX1: 1.1200005105450734, concentrationsGlcDC: 1.2407899800526516, PYK: 2.2399937672272827 },
      //   { time: 77.38095238095238, HEX1: 1.1200004767633054, concentrationsGlcDC: 1.2407899764972141, PYK: 2.239993906136945 },
      //   { time: 78.57142857142857, HEX1: 1.1200003228422626, concentrationsGlcDC: 1.2407899664930993, PYK: 2.2399944380443264 },
      //   { time: 79.76190476190476, HEX1: 1.1200001804076216, concentrationsGlcDC: 1.2407899609026956, PYK: 2.2399950137001485 },
      //   { time: 80.95238095238095, HEX1: 1.1199999984598388, concentrationsGlcDC: 1.2407899609816069, PYK: 2.2399959761485455 },
      //   { time: 82.14285714285714, HEX1: 1.119999871315596, concentrationsGlcDC: 1.2407899675748446, PYK: 2.2399968530344787 },
      //   { time: 83.33333333333333, HEX1: 1.1199997727500166, concentrationsGlcDC: 1.240789987190152, PYK: 2.23999795482721 },
      //   { time: 84.52380952380952, HEX1: 1.1199997480769894, concentrationsGlcDC: 1.2407900089351362, PYK: 2.239998717176801 },
      //   { time: 85.71428571428571, HEX1: 1.1199998007790195, concentrationsGlcDC: 1.2407900403144994, PYK: 2.239999441027869 },
      //   { time: 86.9047619047619, HEX1: 1.1199998803374964, concentrationsGlcDC: 1.24079005916258, PYK: 2.239999817721029 },
      //   { time: 88.09523809523809, HEX1: 1.1200000026755366, concentrationsGlcDC: 1.2407900583733151, PYK: 2.2400000945278293 },
      //   { time: 89.28571428571429, HEX1: 1.120000080337274, concentrationsGlcDC: 1.2407900346743734, PYK: 2.240000208360932 },
      //   { time: 90.47619047619048, HEX1: 1.1200001247580484, concentrationsGlcDC: 1.2407899697775715, PYK: 2.240000246631228 },
      //   { time: 91.66666666666667, HEX1: 1.120000121949251, concentrationsGlcDC: 1.240789906341855, PYK: 2.2400002255390836 },
      //   { time: 92.85714285714286, HEX1: 1.1200000805560042, concentrationsGlcDC: 1.2407898294637718, PYK: 2.240000155122438 },
      //   { time: 94.04761904761905, HEX1: 1.1200000437136288, concentrationsGlcDC: 1.240789787745962, PYK: 2.2400000980105137 },
      //   { time: 95.23809523809524, HEX1: 1.1200000066359856, concentrationsGlcDC: 1.2407897690363476, PYK: 2.240000034069764 },
      //   { time: 96.42857142857143, HEX1: 1.1199999973388735, concentrationsGlcDC: 1.240789776539171, PYK: 2.2400000094821726 },
      //   { time: 97.61904761904762, HEX1: 1.1199999963510863, concentrationsGlcDC: 1.2407898157591477, PYK: 2.239999985491132 },
      //   { time: 98.80952380952381, HEX1: 1.1199999972201444, concentrationsGlcDC: 1.2407898456381485, PYK: 2.2399999778970243 },
      //   { time: 100, HEX1: 1.1199999991187144, concentrationsGlcDC: 1.2407899061212218, PYK: 2.2399999877289765 }
      // ],
      // checkBox: false,
      // min: 0,
      // max: 14,
      // HEX1Select: false,
