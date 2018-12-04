import { get, post } from '../../../../utils/api'
import config from '../../../../configuration/index'

export const simDataActions = {
  FETCH_SIMDATA_REQUEST: 'FETCH_SIMDATA_REQUEST',
  FETCH_SIMDATA_SUCCESS: 'FETCH_SIMDATA_SUCCESS',
  FETCH_SIMDATA_REJECT: 'FETCH_SIMDATA_REJECT'
}

//ACTION
const fetchSimDataRequest = () => {
  return {
    type: simDataActions.FETCH_SIMDATA_REQUEST
  }
}

const fetchSimDataSuccess = simData => {
  return {
    type: simDataActions.FETCH_SIMDATA_SUCCESS,
    simData: simData
  }
}

const fetchSimDataReject = error => {
  return {
    type: simDataActions.FETCH_SIMDATA_REJECT,
    error: error
  }
}

// REQUEST

export const fetchSimData = () => {
  return dispatch => {
    console.log('did it get here')
    dispatch(fetchSimDataRequest())
    post({
      path: `${config.gateway.baseUrl}/simulate`,
      body: {
        inputs: {
          glc_pulse: 0,
          kf_atp: 0,
          kf_pfk: 0,
          rl_shunt: 0
        },
        time: {
          t0: 0,
          t_end: 100
        },
        desired_outputs: {
          concentrations: ['glc__D_c'],
          flux: ['HEX1', 'PYK'],
          computed: ['glc__D_c/HEX1*0.5']
        }
      }
    })
      .then(responseSimData => {
        console.log(responseSimData)
        const fluxHEX1 = responseSimData.flux.HEX1
        const fluxPYK = responseSimData.flux.PYK
        const time = responseSimData.time
        const concentrationsGlcDC = responseSimData.concentrations.glc__D_c
        // const computed = responseSimData.computed.glc__D_c/HEX1*0.5
        dispatch(fetchSimDataSuccess({ time: time, fluxHEX1: fluxHEX1, concentrationsGlcDC: concentrationsGlcDC, fluxPYK: fluxPYK }))
      })
      .catch(err => {
        dispatch(fetchSimDataReject(err))
      })
  }
}
