import { WebContentsView } from 'electron';

export interface Tab {
  title: string;
  url: string;
  id: string;
  isActive: boolean;
  index: number;
  view?: WebContentsView;
  isLoading?: boolean;
}
