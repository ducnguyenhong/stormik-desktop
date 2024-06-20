export interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  parentId?: string;
  isDefault?: boolean;
}

export interface BookmarkFolder {
  id: string;
  bookmarks?: Bookmark[];
}
