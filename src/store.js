import { legacy_createStore as createStore, combineReducers } from 'redux'

import { userReducer, postReducer, changeStateReducer } from './userReducer'
import { dossiersReducer } from './dossiersReducer'

const rootReducer = combineReducers({
  dataDossiers: dossiersReducer,
  dataUsers: userReducer,
  post: postReducer,
  changeState: changeStateReducer,
})

const store = createStore(rootReducer)

export default store
