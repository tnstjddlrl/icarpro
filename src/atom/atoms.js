import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';


export const networkState = atom({
  key: 'networkState', // unique ID (with respect to other atoms/selectors)
  default: 'hiRecoil', // default value (aka initial value)
});

export const newState = atom({
  key: 'newState', // unique ID (with respect to other atoms/selectors)
  default: 'nwe', // default value (aka initial value)
})

export const fcmToken = atom({
  key: 'fcmToken', // unique ID (with respect to other atoms/selectors)
  default: 'notoken', // default value (aka initial value)
})

export const isCarRace = atom({
  key: 'isCarRace', // unique ID (with respect to other atoms/selectors)
  default: 'nocar', // default value (aka initial value)
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