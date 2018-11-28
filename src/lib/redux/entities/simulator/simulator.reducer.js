import { simDataActions } from './simulator.actions'

const initalState = {
  isFetching: false,
  hasFetched: false,
  simData: [],
  error: null
}

export default (prevState = initalState, action) => {
  switch (action.type) {
    case simDataActions.FETCH_SIMDATA_REQUEST: {
      const nextState = Object.assign({}, prevState, {
        isFetching: true
      })
      return nextState
    }
    case simDataActions.FETCH_SIMDATA_SUCCESS: {
      const nextState = Object.assign({}, prevState, {
        isFetching: false,
        hasFetched: true,
        simData: action.simData,
        error: null
      })
      return nextState
    }
    case simDataActions.FETCH_SIMDATA_REJECT: {
      const nextState = Object.assign({}, prevState, {
        isFetching: false,
        error: action.error
      })
      return nextState
    }
    default:
      return Object.assign({}, prevState)
  }
}
