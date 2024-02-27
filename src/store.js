import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { thunk } from 'redux-thunk'
import { userReducer, changeStateReducer } from './userReducer'
import { dossiersReducer } from './dossiersReducer'
import { dataMessagesTypesReducer } from 'src/MessagesTypesReducer'

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = applyMiddleware(thunk)

const rootReducer = combineReducers({
  dataDossiers: dossiersReducer,
  dataUsers: userReducer,
  dataMessagesTypes: dataMessagesTypesReducer,
  changeState: changeStateReducer,
})

const store = createStore(rootReducer, composerEnhancer(middleware))

export default store
