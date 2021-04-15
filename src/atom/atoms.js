import {
  atom, selector
} from 'recoil';

import {client} from '../Client'


export const modemNumber = atom({
  key: 'modemNumber',
  default: '',
});

export const userNumber = atom({
  key: 'userNumber',
  default: '',
})

export const fcmToken = atom({
  key: 'fcmToken',
  default: 'notoken',
})

export const isCarRace = atom({
  key: 'isCarRace',
  default: '',
})

export const bootRestTime = atom({
  key: 'bootRestTime',
  default: '',
})

export const isBootOn = atom({
  key: 'isBootOn',
  default: false,
})

//설정
export const icarSwitch = atom({
  key: 'icarSwitch',
  default: true,
})
export const idoorSwitch = atom({
  key: 'idoorSwitch',
  default: true,
})
export const lowvoltBoot = atom({
  key: 'lowvoltBoot',
  default: false,
})
export const lowvoltAlert = atom({
  key: 'lowvoltAlert',
  default: false,
})
export const actionSound = atom({
  key: 'actionSound',
  default: false,
})
export const alertSound = atom({
  key: 'alertSound',
  default: false,
})

//설정 상세 값
export const voltValue = atom({
  key: 'voltValue',
  default: '12.0',
})//저전압 설정
export const voltValueLimit = atom({
  key: 'voltValueLimit',
  default: false,
})//저전압 설정

export const bootTimeValue = atom({
  key: 'bootTimeValue',
  default: '10',
})//원격시동시간
export const bootTimeValueLimt = atom({
  key: 'bootTimeValueLimt',
  default: false,
})//원격시동시간


export const lastHeatTimeValue = atom({
  key: 'lastHeatTimeValue',
  default: '1:30',
})//후열시간
export const lastHeatTimeValueLimit = atom({
  key: 'lastHeatTimeValueLimit',
  default: false,
})//후열시간


export const startTimeValue = atom({
  key: 'startTimeValue',
  default: '1',
})//스타트 시간
export const startTimeValueLimit = atom({
  key: 'startTimeValueLimit',
  default: false,
})//스타트 시간


//차량 상태 값(서버와 연동된 값이 계속 여기에 저장되어야 함)

export const StateCarAlert = atom({
  key: 'StateCarAlert',
  default: 'ON',
})

export const StateDoorLock = atom({
  key: 'StateDoorLock',
  default: 'OFF',
})

export const StateDoor = atom({
  key: 'StateDoor',
  default: 'OFF',
})

export const StateTrunk = atom({
  key: 'StateTrunk',
  default: 'OFF',
})

export const StateEngineHood = atom({
  key: 'StateEngineHood',
  default: 'OFF',
})

export const StateEngineState = atom({
  key: 'StateEngineState',
  default: 'OFF',
})

export const StateCarVolt = atom({
  key: 'StateCarVolt',
  default: '00.0',
})