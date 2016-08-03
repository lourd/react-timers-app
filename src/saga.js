import { take, put, race, call, select, fork } from 'redux-saga/effects'

import {
  getMillis,
  setMillis,
  setPaused,
  deleteTimer,
} from './reducer'

/**
 * Action types
 */

const START_TIMER = 'START_TIMER'
const PAUSE_TIMER = 'PAUSE_TIMER'
const REMOVE_TIMER = 'REMOVE_TIMER'

/**
 * Action creators
 */

export function startTimer(id) {
  return {
    type: START_TIMER,
    id,
  }
}

export function pauseTimer(id) {
  return {
    type: PAUSE_TIMER,
    id,
  }
}

export function removeTimer(id) {
  return {
    type: REMOVE_TIMER,
    id,
  }
}

/**
 * Sagas
 */

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function* timerSaga(id) {
  yield put(setPaused(id, false))
  while (true) {
    const start = Date.now()
    const { pause } = yield race({
      pause: take(PAUSE_TIMER),
      increment: call(delay, 50), // Controls update frequency
    })
    if (pause && pause.id === id) {
      yield put(setPaused(id, true))
      break
    } else {
      const newDiff = Date.now() - start
      const oldMillis = yield select(getMillis, id)
      yield put(setMillis(id, oldMillis + newDiff))
    }
  }
}

function* timersSaga() {
  while (true) {
    const { id } = yield take(START_TIMER)
    yield fork(timerSaga, id)
  }
}

function* deleteTimerSaga() {
  while (true) {
    const { id } = yield take(REMOVE_TIMER)
    yield put(pauseTimer(id))
    yield put(deleteTimer(id))
  }
}

export default function* saga() {
  yield fork(timersSaga)
  yield fork(deleteTimerSaga)
}
