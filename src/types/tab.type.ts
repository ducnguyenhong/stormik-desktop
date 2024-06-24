import { WebContentsView } from 'electron';

export interface Tab {
  title: string;
  url: string;
  id: string;
  isActive: boolean;
  index: number;
  windowId?: string;
  view?: WebContentsView;
  isLoading?: boolean;
}

export interface TabContentView {
  view: WebContentsView;
  tabId: string;
  windowId?: string;
}
