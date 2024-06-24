import { atom } from 'recoil';
import { Tab } from '../../types/tab.type';

export const isNewTabAtom = atom<boolean>({
  default: false,
  key: 'IS_NEW_TAB_ATOM'
});

export const tabsAtom = atom<Tab[]>({
  default: [],
  key: 'TABS_ATOM'
});
