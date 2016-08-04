import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import { getMillis, getPaused } from './reducer'
import { startTimer, pauseTimer, removeTimer, resetTimer } from './saga'

const styles = {
  container: {
    border: '1px solid #ddd',
    width: 150,
    height: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    fontFamily: '"Helvetica Neue", "Helvetica"',
    borderRadius: 3,
    boxShadow: '1px 1px 14px rgba(0,0,0,0.2)',
    margin: 5,
  },
  btns: {
    position: 'absolute',
    bottom: 3,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  btn: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: 16,
    cursor: 'pointer',
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
    const ms = String(millis % 1000).padStart(3, '0').slice(0, 3)
    return (
      <div style={styles.container}>
        <h1>
          {Math.floor(millis/1000)}
          <small style={styles.small}>{ms}</small>
        </h1>
        <div style={styles.btns}>
          {isPaused
            ? <button
                onClick={startTimer}
                style={styles.btn}
              >
                ▶️
              </button>
            : <button
                onClick={pauseTimer}
                style={styles.btn}
              >
                ⏸
              </button>
          }
          <button onClick={reset} style={styles.btn}>
            🔄
          </button>
          <button onClick={remove} style={styles.btn}>
            🗑
          </button>
        </div>
      </div>
    )
  }
}
