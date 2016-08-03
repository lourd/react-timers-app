import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import { getMillis, getPaused } from './reducer'
import { startTimer, pauseTimer } from './saga'

function mapStateToProps(state) {
  return {
    millis: getMillis(state),
    isPaused: getPaused(state),
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     startTimer() {
//       dispatch(startTimer())
//     },
//     pauseTimer() {
//       dispatch(pauseTimer())
//     },
//   }
// }

const mapDispatchToProps = {
  startTimer,
  pauseTimer,
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Timer extends Component {
  static propTypes = {
    startTimer: PropTypes.func.isRequired,
    pauseTimer: PropTypes.func.isRequired,
    millis: PropTypes.number.isRequired,
    isPaused: PropTypes.bool.isRequired,
  }

  render() {
    const {
      millis,
      startTimer,
      pauseTimer,
      isPaused,
    } = this.props
    return (
      <div>
        <h1>
          {Math.round(millis/1000)}
          <small>{millis % 1000}</small>
        </h1>
        {isPaused && <div>Timer paused</div>}
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Pause</button>
      </div>
    )
  }
}
