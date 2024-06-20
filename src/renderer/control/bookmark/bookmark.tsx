import { memo, useCallback, useEffect, useState } from 'react';
import { Bookmark } from '../../../types/bookmark.type';

const Bookmark: React.FC = () => {
  const [bookmarkList, setBookmarkList] = useState<Bookmark[]>([]);

  useEffect(() => {
    window.electronAPI.effectChangeBookmarks((data: Bookmark[]) => {
      setBookmarkList(data);
    });
  }, [bookmarkList]);

  const onLoadBookmark = useCallback((url: string) => {
    window.electronAPI.loadBookmarkUrl(url);
  }, []);

  const onRemoveBookmark = useCallback((id: string) => {
    window.electronAPI.removeBookmark(id);
  }, []);

  const compactTitle = useCallback((title: string) => {
    if (title.length < 15) {
      return title;
    }
    return title.slice(0, 15) + '...';
  }, []);

  return (
    <div className="flex items-center gap-1 h-full px-2.5 pb-[2px]">
      {bookmarkList.map((item) => {
        const { title, url, id, isDefault } = item;
        return (
          <div
            key={id}
            title={title}
            onClick={() => onLoadBookmark(url)}
            className="group flex relative pl-1 pr-2 cursor-default items-center gap-0.5 duration-300 rounded-full hover:bg-[#f2f2f2]"
          >
            <div className="w-[28px] h-[28px] flex justify-center items-center">
              <img src={`https://www.google.com/s2/favicons?domain=${url}&sz=128`} className="w-4 h-4" />
            </div>
            {!isDefault && <p className="text-[12px]">{compactTitle(title)}</p>}

            <div
              className="absolute hidden opacity-0 -top-1 -right-1 w-[15px] h-[15px] rounded-full items-center justify-center duration-200 hover:bg-red-200 group-hover:opacity-100 group-hover:visible group-hover:flex"
              onClick={() => onRemoveBookmark(id)}
            >
              <p className="w-[12px] h-[12px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#4f4f4f"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Bookmark);
