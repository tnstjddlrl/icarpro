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