import rs from 'random-string'

/**
 * Action types
 */

const SET_PAUSED = 'SET_PAUSED'
const SET_MILLIS = 'SET_MILLIS'
const ADD_TIMER = 'ADD_TIMER'
const DELETE_TIMER = 'DELETE_TIMER'

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
    id: rs(),
  }
}

export function deleteTimer(id) {
  return {
    type: DELETE_TIMER,
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

const initialTimers = {
  [rs()]: timer(undefined, {})
}

function timers(state = initialTimers, action) {
  switch(action.type) {
    case ADD_TIMER:
      return {
        ...state,
        [action.id]: timer(undefined, action)
      }
    case SET_PAUSED:
    case SET_MILLIS:
      const timerState = state[action.id]
      return {
        ...state,
        [action.id]: timer(timerState, action)
      }
    case DELETE_TIMER:
      // Filter off the old key
      // eslint-disable-next-line
      const { [action.id]: _, ...newState } = state
      return newState
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

export function getMillis(state, id) {
  const t = getTimer(state, id)
  return t && t.millis
}

export function getPaused(state, id) {
  const t = getTimer(state, id)
  return t && t.paused
}

export function getTimer(state, id) {
  return getTimers(state)[id]
}

export function getTimers(state) {
  return state.timers
}
