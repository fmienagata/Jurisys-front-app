import { legacy_createStore as createStore, combineReducers, compose } from 'redux'

import { userReducer, postReducer, changeStateReducer } from './userReducer'
import { dossiersReducer } from './dossiersReducer'
const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  dataDossiers: dossiersReducer,
  dataUsers: userReducer,
  post: postReducer,
  changeState: changeStateReducer,
})

const store = createStore(rootReducer, composerEnhancer())

export default store
