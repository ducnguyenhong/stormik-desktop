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
  systemTab?: string;
}

export interface TabContentView {
  view: WebContentsView;
  tabId: string;
  windowId?: string;
}
