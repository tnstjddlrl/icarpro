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
})
export const voltValueSC = atom({
  key: 'voltValueSC',
  default: 140,
})

export const bootTimeValue = atom({
  key: 'bootTimeValue',
  default: '10',
})
export const bootTimeValueSC = atom({
  key: 'bootTimeValueSC',
  default: 150,
})


export const lastHeatTimeValue = atom({
  key: 'lastHeatTimeValue',
  default: '1:30',
})
export const lastHeatTimeValueSC = atom({
  key: 'lastHeatTimeValueSC',
  default: 7,
})

export const preHeatTimeValue = atom({
  key: 'preHeatTimeValue',
  default: 0,
})

export const startTimeValue = atom({
  key: 'startTimeValue',
  default: '1',
})
export const startTimeValueSC = atom({
  key: 'startTimeValueSC',
  default: 3,
})

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