import { get, post } from '../../../../utils/api'
import config from '../../../../configuration/index'

export const dataActions = {
  FETCH_SIMDATA_REQUEST: 'FETCH_SIMDATA_REQUEST',
  FETCH_SIMDATA_SUCCESS: 'FETCH_SIMDATA_SUCCESS',
  FETCH_SIMDATA_REJECT: 'FETCH_SIMDATA_REJECT',
  FETCH_METADATA_REQUEST: 'FETCH_METADATA_REQUEST',
  FETCH_METADATA_SUCCESS: 'FETCH_METADATA_SUCCESS',
  FETCH_METADATA_REJECT: 'FETCH_METADATA_REJECT'
}

//ACTION
const fetchSimDataRequest = () => {
  return {
    type: dataActions.FETCH_SIMDATA_REQUEST
  }
}

const fetchSimDataSuccess = simData => {
  return {
    type: dataActions.FETCH_SIMDATA_SUCCESS,
    simData: simData
  }
}

const fetchSimDataReject = error => {
  return {
    type: dataActions.FETCH_SIMDATA_REJECT,
    error: error
  }
}

const fetchMetadataRequest = () => {
  return {
    type: dataActions.FETCH_METADATA_REQUEST
  }
}

const fetchMetadataSuccess = metadata => {
  return {
    type: dataActions.FETCH_METADATA_SUCCESS,
    metadata: metadata
  }
}

const fetchMetadataReject = error => {
  return {
    type: dataActions.FETCH_METADATA_REJECT,
    error: error
  }
}

// REQUEST

export const fetchMetadata = () => {
  return dispatch => {
    console.log('Fetching MetaData')
    dispatch(fetchMetadataRequest())
    get({
      path: `${config.gateway.baseUrl}/metadata`
    }).then(responseMetadata => {
      console.log('MetaDataFetched')
      console.log(responseMetadata)
      dispatch(fetchMetadataSuccess(responseMetadata))
    })
  }
}

export const fetchSimData = data => {
  console.log(data)
  return dispatch => {
    dispatch(fetchSimDataRequest())
    post({
      path: `${config.gateway.baseUrl}/simulate`,
      body: data
    })
      .then(responseSimData => {
        console.log(responseSimData)
        const fluxHEX1 = responseSimData.flux.HEX1
        // const fluxPYK = responseSimData.flux.PYK
        const time = responseSimData.time
        const GLC = responseSimData.concentrations.glc__D_c
        // const computed = responseSimData.computed.glc__D_c/HEX1*0.5
        dispatch(fetchSimDataSuccess({ time: time, fluxHEX1: fluxHEX1, GLC: GLC }))
      })
      .catch(err => {
        dispatch(fetchSimDataReject(err))
      })
  }
}
