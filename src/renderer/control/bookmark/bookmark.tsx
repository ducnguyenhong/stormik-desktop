import { memo, useCallback } from 'react';

const Bookmark: React.FC = () => {
  const DATA = [
    {
      title: 'Youtube',
      url: 'https://youtube.com'
    },
    {
      title: 'Facebook',
      url: 'https://facebook.com'
    },
    {
      title: 'Gmail',
      url: 'https://mail.google.com'
    },
    {
      title: 'Google Drive',
      url: 'https://drive.google.com'
    },
    {
      title: 'Google Dịch',
      url: 'https://translate.google.com'
    }
  ];

  const onLoadBookmark = useCallback((url: string) => {
    window.electronAPI.loadBookmarkUrl(url);
  }, []);

  return (
    <div className="flex items-center gap-2 h-full px-2.5 pb-[2px]">
      {DATA.map((item) => {
        const { title, url } = item;
        return (
          <div
            key={url}
            title={title}
            onClick={() => onLoadBookmark(url)}
            className="flex pl-1 pr-2 cursor-default items-center gap-0.5 duration-300 rounded-full hover:bg-[#f2f2f2]"
          >
            <div className="w-[28px] h-[28px] flex justify-center items-center">
              <img src={`https://www.google.com/s2/favicons?domain=${url}&sz=128`} className="w-4 h-4" />
            </div>
            <p className="text-[12px]">{title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Bookmark);
