import { get, post } from '../../../../utils/api'
import config from '../../../../configuration/index'
import { object } from 'prop-types'

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
    dispatch(fetchMetadataRequest())
    get({
      path: `${config.gateway.baseUrl}/metadata`
    }).then(responseMetadata => {
      dispatch(fetchMetadataSuccess(responseMetadata))
    })
  }
}

export const fetchSimData = data => {
  return dispatch => {
    dispatch(fetchSimDataRequest())
    post({
      path: `${config.gateway.baseUrl}/simulate`,
      body: data
    })
      .then(responseSimData => {
        const flux = Object.entries(responseSimData.flux)
        const concentrations = Object.entries(responseSimData.concentrations)
        const computed = Object.entries(responseSimData.computed)
        const timeData = responseSimData.time
        
        let prevObject = {}
        let i

        filterData(flux)
        filterData(concentrations)
        filterData(computed)
        buildObject(prevObject, "time", timeData)

        function filterData(input) {
          for (i = 0; i < input.length; i++) {
            console.log('-------------HERE----------------')
            const working = input[i]
            const name = working[0]
            const data = working[1]
            const workingObject = prevObject
            buildObject(workingObject, name, data)
          }
        }

        function buildObject(workingObject, name, data) {
          const newObject = Object.assign({}, workingObject, {
            [name]: data
          })
          prevObject = newObject
        }
        dispatch(fetchSimDataSuccess(prevObject))
      })
      .catch(err => {
        dispatch(fetchSimDataReject(err))
      })
  }
}
