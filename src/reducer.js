/**
 * Action types
 */

const SET_PAUSED = 'SET_PAUSED'
const SET_MILLIS = 'SET_MILLIS'
const INIT = '@@INIT'
const ADD_TIMER = 'ADD_TIMER'
const REMOVE_TIMER = 'REMOVE_TIMER'

/**
 * Action creators
 */

export function setPaused(id, paused) {
  return {
    type: SET_PAUSED,
    paused,
    id,
  }
}

export function setMillis(id, millis) {
  return {
    type: SET_MILLIS,
    millis,
    id,
  }
}

export function addTimer() {
  return {
    type: ADD_TIMER,
  }
}

export function removeTimer(id) {
  return {
    type: REMOVE_TIMER,
    id,
  }
}

/**
 * Reducers
 */

function timer(state = {
  paused: true,
  millis: 0,
}, action) {
  switch (action.type) {
    case SET_PAUSED:
      return {
        ...state,
        paused: action.paused,
      }
    case SET_MILLIS:
      return {
        ...state,
        millis: action.millis,
      }
    default:
      return state
  }
}

function timers(state = [], action) {
  switch(action.type) {
    case INIT:
    case ADD_TIMER:
      return [...state, timer(undefined, action)]
    case SET_PAUSED:
    case SET_MILLIS:
      return state.map((timerState, i) => {
        if (i !== action.id) return timerState
        else return timer(timerState, action)
      })
    default:
      return state
  }
}

export default function reducer(state = {}, action) {
  return {
    timers: timers(state.timers, action),
  }
}

/**
 * Selectors
 */

export function getMillis(state, i) {
  const t = getTimer(state, i)
  return t && t.millis
}

export function getPaused(state, i) {
  const t = getTimer(state, i)
  return t && t.paused
}

export function getTimer(state, i) {
  return getTimers(state)[i]
}

export function getTimers(state) {
  return state.timers
}
