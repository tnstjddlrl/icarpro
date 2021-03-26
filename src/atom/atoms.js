import {
  atom
} from 'recoil';


export const modemNumber = atom({
  key: 'modemNumber', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

export const userNumber = atom({
  key: 'userNumber', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})

export const fcmToken = atom({
  key: 'fcmToken', // unique ID (with respect to other atoms/selectors)
  default: 'notoken', // default value (aka initial value)
})

export const isCarRace = atom({
  key: 'isCarRace', // unique ID (with respect to other atoms/selectors)
  default: 'SEDAN1', // default value (aka initial value)
})

export const bootRestTime = atom({
  key: 'bootRestTime', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})

export const isBootOn = atom({
  key: 'isBootOn', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

//설정
export const icarSwitch = atom({
  key: 'icarSwitch', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
})
export const idoorSwitch = atom({
  key: 'idoorSwitch', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
})
export const lowvoltBoot = atom({
  key: 'lowvoltBoot', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})
export const lowvoltAlert = atom({
  key: 'lowvoltAlert', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})
export const actionSound = atom({
  key: 'actionSound', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})
export const alertSound = atom({
  key: 'alertSound', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

//설정 상세 값
export const voltValue = atom({
  key: 'voltValue', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
})
export const bootTimeValue = atom({
  key: 'bootTimeValue', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
})
export const lastHeatTimeValue = atom({
  key: 'lastHeatTimeValue', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
})
export const preHeatTimeValue = atom({
  key: 'preHeatTimeValue', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
})
export const startTimeValue = atom({
  key: 'startTimeValue', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
})


