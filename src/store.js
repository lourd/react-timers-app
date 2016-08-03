import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducer'
import saga from './saga'

const sagaMiddleware = createSagaMiddleware()

const enhancedCreateStore = compose(
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
)(createStore)

const store = enhancedCreateStore(reducer)

sagaMiddleware.run(saga)

export default store
