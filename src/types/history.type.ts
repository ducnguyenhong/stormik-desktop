export interface History {
  title: string;
  type: 'URL' | 'SEARCH';
  url: string;
  domain: string;
  id: string;
  accessedAt: number;
  isActive?: boolean;
}

export interface HistoryCreate {
  title: string;
  type: 'URL' | 'SEARCH';
  url: string;
  domain: string;
}
