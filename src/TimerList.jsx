import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Timer from './Timer'
import { getTimers, addTimer } from './reducer'

function mapStateToProps(state) {
  return {
    timers: getTimers(state),
  }
}

const mapDispatchToProps = {
  addTimer,
}

@connect(mapStateToProps, mapDispatchToProps)
export default class TimerList extends Component {
  static propTypes = {
    timers: PropTypes.array.isRequired,
    addTimer: PropTypes.func.isRequired,
  }

  render() {
    const { timers, addTimer } = this.props
    return (
      <div>
        {timers.map((timer, i) =>
          <Timer
            id={i}
            key={`timer_${i}`}
          />
        )}

        <button onClick={addTimer}>
          Add another timer
        </button>
      </div>
    )
  }
}
