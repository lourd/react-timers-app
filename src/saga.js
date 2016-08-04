import { take, put, call, select, fork, cancel } from 'redux-saga/effects'

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
const RESET_TIMER = 'RESET_TIMER'

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
    type: PAUSE_TIMER + id,
    id,
  }
}

export function removeTimer(id) {
  return {
    type: REMOVE_TIMER,
    id,
  }
}

export function resetTimer(id) {
  return {
    type: RESET_TIMER,
    id,
  }
}

/**
 * Sagas
 */

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function* updateTimer(id, interval) {
  let ms = yield select(getMillis, id)
  while (true) {
    const start = Date.now()
    yield call(delay, interval)
    const delta = Date.now() - start
    ms += delta
    yield put(setMillis(id, ms))
  }
}

function* startTimerSaga(id) {
  yield put(setPaused(id, false))
  const updating = yield fork(updateTimer, id, 100)
  // while (true) {
  //   const { id: pausedId } = yield take(PAUSE_TIMER)
  //   if (pausedId === id) break
  // }
  yield take(PAUSE_TIMER + id)
  yield cancel(updating)
  yield put(setPaused(id, true))
}

function* runTimersSaga() {
  while (true) {
    const { id } = yield take(START_TIMER)
    yield fork(startTimerSaga, id)
  }
}

function* deleteTimerSaga() {
  while (true) {
    const { id } = yield take(REMOVE_TIMER)
    yield put(pauseTimer(id))
    yield put(deleteTimer(id))
  }
}

function* resetTimerSaga() {
  while (true) {
    const { id } = yield take(RESET_TIMER)
    yield put(pauseTimer(id))
    yield put(setMillis(id, 0))
  }
}

export default function* saga() {
  yield fork(runTimersSaga)
  yield fork(deleteTimerSaga)
  yield fork(resetTimerSaga)
}
