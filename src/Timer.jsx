import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import { getMillis, getPaused } from './reducer'
import { startTimer, pauseTimer, removeTimer, resetTimer } from './saga'

const styles = {
  container: {
    border: '1px dashed #222',
    display: 'inline-block',
    width: 150,
    textAlign: 'center',
  },
  small: {
    marginLeft: 3,
    fontSize: 14,
  },
}

function mapStateToProps(state, { id }) {
  return {
    millis: getMillis(state, id),
    isPaused: getPaused(state, id),
  }
}

function mapDispatchToProps(dispatch, { id }) {
  return {
    startTimer() {
      dispatch(startTimer(id))
    },
    pauseTimer() {
      dispatch(pauseTimer(id))
    },
    remove() {
      dispatch(removeTimer(id))
    },
    reset() {
      dispatch(resetTimer(id))
    },
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Timer extends Component {
  static propTypes = {
    startTimer: PropTypes.func.isRequired,
    pauseTimer: PropTypes.func.isRequired,
    millis: PropTypes.number.isRequired,
    isPaused: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    remove: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }

  render() {
    const {
      millis,
      startTimer,
      pauseTimer,
      isPaused,
      remove,
      reset,
    } = this.props
    let ms = (millis % 1000)
    ms = '' + ms
    ms = ('00' + ms).substring(ms.length)
    return (
      <div style={styles.container}>
        <h1>
          {Math.floor(millis/1000)}
          <small style={styles.small}>{ms}</small>
        </h1>
        {isPaused
          ? <button onClick={startTimer}>Start</button>
          : <button onClick={pauseTimer}>Pause</button>
        }
        <button onClick={reset}>Reset</button>
        <button onClick={remove}>Remove</button>
      </div>
    )
  }
}
