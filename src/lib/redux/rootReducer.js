import { combineReducers } from 'redux'

import simulatorReducer from './entities/simulator/simulator.reducer'

const rootReducer = combineReducers({
  simDataRoot: simulatorReducer
})

export default rootReducer
