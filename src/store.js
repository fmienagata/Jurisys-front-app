import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux'

import { userReducer, postReducer, changeStateReducer } from './userReducer'
import { dossiersReducer } from './dossiersReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const rootReducer = combineReducers({
  dataDossiers: dossiersReducer,
  dataUsers: userReducer,
  post: postReducer,
  changeState: changeStateReducer,

  // Add more reducers if needed
})

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(/* middleware */),
    // Ajoutez d'autres améliorations du magasin si nécessaire
  ),
)

export default store
