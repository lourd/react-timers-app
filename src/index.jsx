import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import TimerList from './TimerList'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <TimerList />
  </Provider>,
  document.getElementById('root')
)
