import { atom } from 'recoil';

export const isNewTabAtom = atom<boolean>({
  default: false,
  key: 'IS_NEW_TAB_ATOM'
});
