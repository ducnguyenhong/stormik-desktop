import dayjs from 'dayjs';
import { v4 as uuidV4 } from 'uuid';
import { History, HistoryCreate } from '../types/history';
import { HISTORY_STORE_KEY } from './const';

export const addHistory = (store: any, data: HistoryCreate) => {
  const oldHistory: History[] = store.get(HISTORY_STORE_KEY) || [];
  const newData: History = {
    ...data,
    accessedAt: dayjs().valueOf(),
    id: uuidV4()
  };
  const newHistory = [newData, ...oldHistory];
  store.set(HISTORY_STORE_KEY, newHistory);
};

export const getHistory = (store: any) => {
  return (store.get(HISTORY_STORE_KEY) || []) as History[];
};

export const deleteHistory = (store: any, option?: { clearAll?: boolean; id?: string }) => {
  const { clearAll, id } = option || {};

  if (clearAll) {
    store.delete(HISTORY_STORE_KEY);
    return;
  }

  const oldHistory: History[] = store.get(HISTORY_STORE_KEY) || [];
  const newHistory = oldHistory.filter((i) => i.id !== id);
  store.set(HISTORY_STORE_KEY, newHistory);
};
