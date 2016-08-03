import { take, put, race, call, select } from 'redux-saga/effects'

import { getMillis, setMillis, setPaused } from './reducer'

/**
 * Action types
 */

const START_TIMER = 'START_TIMER'
const PAUSE_TIMER = 'PAUSE_TIMER'

/**
 * Action creators
 */

export function startTimer() {
  return {
    type: START_TIMER,
  }
}

export function pauseTimer() {
  return {
    type: PAUSE_TIMER,
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Sagas
 */

export default function* saga() {
  while (true) {
    yield take(START_TIMER)
    yield put(setPaused(false))
    while (true) {
      const start = Date.now()
      const { pause } = yield race({
        pause: take(PAUSE_TIMER),
        increment: call(delay, 50), // Controls update frequency
      })
      if (pause) {
        yield put(setPaused(true))
        break
      } else {
        const newDiff = Date.now() - start
        const oldMillis = yield select(getMillis)
        yield put(setMillis(oldMillis + newDiff))
      }
    }
  }
}
