export interface History {
  title: string;
  type: 'URL' | 'SEARCH';
  url: string;
  domain: string;
  id: string;
  accessedAt: number;
}

export interface HistoryCreate {
  title: string;
  type: 'URL' | 'SEARCH';
  url: string;
  domain: string;
}
