import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import map from 'lodash.map'

import Timer from './Timer'
import { getTimers, addTimer } from './reducer'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  addBtn: {
    width: 150,
    height: 150,
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #ddd',
    margin: 5,
    borderRadius: 3,
    fontFamily: 'Helvetica Neue',
    fontSize: 66,
    cursor: 'pointer',
    padding: 0,
  }
}

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
      <div style={styles.container}>
        {map(timers, (timer, id) =>
          <Timer
            id={id}
            key={`timer_${id}`}
          />
        )}

        <button onClick={addTimer} style={styles.addBtn}>
          +
        </button>
      </div>
    )
  }
}
