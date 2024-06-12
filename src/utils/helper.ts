import dayjs from 'dayjs';
import { v4 as uuidV4 } from 'uuid';
import { History, HistoryCreate } from '../types/history.type';
import { HISTORY_STORE_KEY } from './const';

export const addHistory = (store: any, data: HistoryCreate) => {
  const oldHistoryList: History[] = store.get(HISTORY_STORE_KEY) || [];

  const newData: History = {
    ...data,
    accessedAt: dayjs().valueOf(),
    id: uuidV4(),
    isActive: true
  };

  if (!oldHistoryList.length) {
    store.set(HISTORY_STORE_KEY, [newData]);
    return;
  }

  const existsHistory = oldHistoryList.find((i) => i.url === data.url);
  const existsActiveHistory = oldHistoryList.find((i) => !!i.isActive);

  if (existsHistory) {
    const newHistoryList: History[] = [
      {
        ...existsHistory,
        isActive: true
      }
    ];
    if (existsActiveHistory && existsActiveHistory.id !== existsHistory.id) {
      newHistoryList.push({ ...existsActiveHistory, isActive: false });
    }
    const remainingHistoryList = oldHistoryList
      .filter((i) => i.id !== existsHistory.id)
      .filter((i) => i.id !== existsActiveHistory.id);
    const finalHistoryList = [...newHistoryList, ...remainingHistoryList];

    store.set(HISTORY_STORE_KEY, finalHistoryList);
    return;
  }

  const newHistoryList: History[] = [newData];
  if (existsActiveHistory) {
    newHistoryList.push({ ...existsActiveHistory, isActive: false });
  }
  const remainingHistoryList = oldHistoryList.filter((i) => i.id !== existsActiveHistory.id);
  const finalHistoryList = [...newHistoryList, ...remainingHistoryList];

  store.set(HISTORY_STORE_KEY, finalHistoryList);
};

export const getHistoryList = (store: any) => {
  return (store.get(HISTORY_STORE_KEY) || []) as History[];
};

export const getLastHistory = (store: any) => {
  const currentHistoryList: History[] = store.get(HISTORY_STORE_KEY) || [];
  const currentHistoryIndex = currentHistoryList.findIndex((i) => i.isActive);
  return currentHistoryList?.[currentHistoryIndex + 1];
};

export const updateWhenPrevHistory = (store: any) => {
  const oldHistoryList: History[] = store.get(HISTORY_STORE_KEY) || [];
  const currentHistoryIndex = oldHistoryList.findIndex((i) => i.isActive);
  const nextHistory = oldHistoryList?.[currentHistoryIndex + 1];

  const newHistoryList = oldHistoryList.map((item) => {
    if (item.id === nextHistory.id) {
      return { ...item, isActive: true };
    }
    return { ...item, isActive: false };
  });

  store.set(HISTORY_STORE_KEY, newHistoryList);
};

export const deleteHistory = (store: any, option?: { clearAll?: boolean; id?: string }) => {
  const { clearAll, id } = option || {};

  if (clearAll) {
    store.delete(HISTORY_STORE_KEY);
    return;
  }

  // const oldAllHistory: History[] = store.get(HISTORY_ALL_STORE_KEY) || [];
  // const newAllHistory = oldAllHistory.filter((i) => i.id !== id);
  // store.set(HISTORY_ALL_STORE_KEY, newAllHistory);

  // const oldPrimaryHistory: History[] = store.get(HISTORY_PRIMARY_STORE_KEY) || [];
  // const newPrimaryHistory = oldPrimaryHistory.filter((i) => i.id !== id);
  // store.set(HISTORY_PRIMARY_STORE_KEY, newPrimaryHistory);
};

export const getDomainName = (url: string) => {
  url = url.replace(/(https?:\/\/)?(www.)?/i, '');

  if (url.indexOf('/') !== -1) {
    return url.split('/')[0];
  }

  return url;
};
