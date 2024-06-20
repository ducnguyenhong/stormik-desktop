import { WebContentsView } from 'electron';
import { Bookmark } from '../types/bookmark.type';
import { BOOKMARK_STORE_KEY } from '../utils/const';

export const DEFAULT_BOOKMARK_LIST = [
  {
    id: 'youtube',
    title: 'Youtube',
    url: 'https://youtube.com'
  },
  {
    id: 'facebook',
    title: 'Facebook',
    url: 'https://facebook.com'
  },
  {
    id: 'gmail',
    title: 'Gmail',
    url: 'https://mail.google.com'
  },
  {
    id: 'google-drive',
    title: 'Google Drive',
    url: 'https://drive.google.com'
  }
];

export const setBookmarkList = (store: any, bookmarkList: Bookmark[]) => {
  store.set(BOOKMARK_STORE_KEY, bookmarkList);
};

export const getBookmarkList = (store: any) => {
  return (store.get(BOOKMARK_STORE_KEY) || []) as Bookmark[];
};

export const effectChangeBookmarks = (controlView: WebContentsView, data: Bookmark[]) => {
  controlView.webContents.send('effect-bookmark-change', data);
};
