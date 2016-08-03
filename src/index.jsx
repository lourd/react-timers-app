import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Timer from './Timer'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <Timer />
  </Provider>,
  document.getElementById('root')
)
