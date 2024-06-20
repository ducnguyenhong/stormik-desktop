export interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  parentId?: string;
}

export interface BookmarkFolder {
  id: string;
  bookmarks?: Bookmark[];
}
