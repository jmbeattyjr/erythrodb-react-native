import { dataActions } from './simulator.actions'

const initalState = {
  metaisFetching: false,
  metahasFetched: false,
  simisFetching: false,
  simhasFetched: false,
  simData: [],
  metadata: {
    concentrations: [],
    rates: [],
  },
  error: null
}

export default (prevState = initalState, action) => {
  switch (action.type) {
    case dataActions.FETCH_SIMDATA_REQUEST: {
      const nextState = Object.assign({}, prevState, {
        simisFetching: true,
        simData: [],
      })
      return nextState
    }
    case dataActions.FETCH_SIMDATA_SUCCESS: {
      const nextState = Object.assign({}, prevState, {
        simisFetching: false,
        simhasFetched: true,
        simData: action.simData,
        error: null
      })
      return nextState
    }
    case dataActions.FETCH_SIMDATA_REJECT: {
      const nextState = Object.assign({}, prevState, {
        simisFetching: false,
        error: action.error
      })
      return nextState
    }
    case dataActions.FETCH_METADATA_REQUEST: {
      const nextState = Object.assign({}, prevState, {
        metaisFetching: true,
        metadata: {
          concentrations: [],
          rates: [],
        },
      })
      return nextState
    }
    case dataActions.FETCH_METADATA_SUCCESS: {
      const nextState = Object.assign({}, prevState, {
        metaisFetching: false,
        metahasFetched: true,
        metadata: action.metadata,
        error: null
      })
      return nextState
    }
    case dataActions.FETCH_METADATA_REJECT: {
      const nextState = Object.assign({}, prevState, {
        metaisFetching: false,
        error: action.error
      })
      return nextState
    }
    default:
      return Object.assign({}, prevState)
  }
}
