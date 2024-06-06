import dayjs from 'dayjs';
import { v4 as uuidV4 } from 'uuid';
import { History, HistoryCreate } from '../types/history.type';
import { HISTORY_ALL_STORE_KEY, HISTORY_PRIMARY_STORE_KEY } from './const';

export const addHistory = (store: any, data: HistoryCreate) => {
  const oldPrimaryHistory: History[] = store.get(HISTORY_PRIMARY_STORE_KEY) || [];
  const oldAllHistory: History[] = store.get(HISTORY_ALL_STORE_KEY) || [];
  const lastPrimaryHistory = oldPrimaryHistory?.[1];

  if (lastPrimaryHistory?.url === data.url) {
    return;
  }

  const newData: History = {
    ...data,
    accessedAt: dayjs().valueOf(),
    id: uuidV4()
  };

  if (!oldPrimaryHistory.length && !oldAllHistory.length) {
    store.set(HISTORY_PRIMARY_STORE_KEY, [newData]);
    store.set(HISTORY_ALL_STORE_KEY, [{ ...newData, isActive: true }]);
    return;
  }

  const historyExists = oldPrimaryHistory.find((i) => i.url === data.url);

  if (historyExists) {
    const newPrimaryHistoryList = [historyExists, oldPrimaryHistory.filter((i) => i.url !== data.url)];
    const newAllHistoryList = oldAllHistory.map((i) => {
      if (i.url !== data.url) {
        return { ...i, isActive: false };
      }
      return { ...i, isActive: true };
    });
    store.set(HISTORY_PRIMARY_STORE_KEY, newPrimaryHistoryList);
    store.set(HISTORY_ALL_STORE_KEY, newAllHistoryList);
    return;
  }

  const newPrimaryHistoryList = [newData, ...oldPrimaryHistory];
  const newAllHistoryList = [{ ...newData, isActive: true }, ...oldPrimaryHistory];
  store.set(HISTORY_PRIMARY_STORE_KEY, newPrimaryHistoryList);
  store.set(HISTORY_ALL_STORE_KEY, newAllHistoryList);
};

export const getPrimaryHistory = (store: any) => {
  return (store.get(HISTORY_PRIMARY_STORE_KEY) || []) as History[];
};

export const getLastHistory = (store: any) => {
  const oldAllHistory: History[] = store.get(HISTORY_ALL_STORE_KEY) || [];
  const currentHistoryIndex = oldAllHistory.findIndex((i) => i.isActive);
  return oldAllHistory?.[currentHistoryIndex + 1];
};

export const deleteHistory = (store: any, option?: { clearAll?: boolean; id?: string }) => {
  const { clearAll, id } = option || {};

  if (clearAll) {
    store.delete(HISTORY_PRIMARY_STORE_KEY);
    store.delete(HISTORY_ALL_STORE_KEY);
    return;
  }

  const oldAllHistory: History[] = store.get(HISTORY_ALL_STORE_KEY) || [];
  const newAllHistory = oldAllHistory.filter((i) => i.id !== id);
  store.set(HISTORY_ALL_STORE_KEY, newAllHistory);

  const oldPrimaryHistory: History[] = store.get(HISTORY_PRIMARY_STORE_KEY) || [];
  const newPrimaryHistory = oldPrimaryHistory.filter((i) => i.id !== id);
  store.set(HISTORY_PRIMARY_STORE_KEY, newPrimaryHistory);
};

export const getDomainName = (url: string) => {
  url = url.replace(/(https?:\/\/)?(www.)?/i, '');

  if (url.indexOf('/') !== -1) {
    return url.split('/')[0];
  }

  return url;
};
