/**
 * Action types
 */

const SET_PAUSED = 'SET_PAUSED'
const SET_MILLIS = 'SET_MILLIS'

/**
 * Action creators
 */

export function setPaused(paused) {
  return {
    type: SET_PAUSED,
    paused,
  }
}

export function setMillis(millis) {
  return {
    type: SET_MILLIS,
    millis,
  }
}

/**
 * Reducer
 */

export default function reducer(state = {
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

/**
 * Selectors
 */

export function getMillis(state) {
  return state.millis
}

export function getPaused(state) {
  return state.paused
}
