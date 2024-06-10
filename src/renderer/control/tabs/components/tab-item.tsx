import clsx from 'clsx';
import { memo, useCallback } from 'react';
import { Tab } from '../../../../types/tab.type';

interface TabItemProps {
  item: Tab;
  tabs: Tab[];
  setTabs: (tabs: Tab[]) => void;
}

const TabItem: React.FC<TabItemProps> = (props) => {
  const { item, tabs, setTabs } = props;
  const { id, title, url, isActive } = item;

  const onClickTab = useCallback(
    (id: string) => {
      const newTabList = tabs.map((tab) => {
        if (tab.id === id) {
          return { ...tab, isActive: true };
        }
        return { ...tab, isActive: false };
      });
      setTabs(newTabList);
      window.electronAPI.changeTab(id);
    },
    [tabs]
  );

  return (
    <div
      className={clsx(
        'h-[33px] relative flex items-center px-2 gap-2.5 cursor-default rounded-t-xl w-[230px] justify-between',
        {
          'bg-white': isActive
        }
      )}
      key={id}
    >
      <div
        className={clsx('flex items-center gap-2 flex-1 h-full', {
          'overflow-hidden': isActive
        })}
        onClick={() => {
          if (isActive) {
            return;
          }
          onClickTab(id);
        }}
      >
        {/* <img src={`https://www.google.com/s2/favicons?domain=${url}&sz=128`} /> */}
        <p className="w-[16px] h-[16px]">
          <svg viewBox="0 0 960 1000" fill="#828282" height="1em" width="1em">
            <path d="M480 20c133.333 0 246.667 47 340 141s140 207 140 339c0 133.333-46.667 246.667-140 340S613.333 980 480 980c-132 0-245-46.667-339-140S0 633.333 0 500c0-132 47-245 141-339S348 20 480 20m410 480c0-88-26-167.667-78-239S692.667 140 610 112c-12 16-17.333 26.667-16 32 2.667 25.333 8.667 42.333 18 51 9.333 8.667 19.333 11 30 7l32-12 20-2c14.667 16 14.667 31.667 0 47-14.667 15.333-29.667 34-45 56-15.333 22-15.667 47.667-1 77 22.667 42.667 54.667 64 96 64 18.667 1.333 33 13.333 43 36s15.667 44.667 17 66c6.667 53.333 2 100-14 140-14.667 29.333-10 54.667 14 76 57.333-74.667 86-158 86-250M424 96c-74.667 9.333-141 37.333-199 84S124.667 284.667 98 354c4 0 11.333.667 22 2s20 2.333 28 3c8 .667 16.667 2 26 4 9.333 2 17.333 4.667 24 8 6.667 3.333 10.667 7.667 12 13 2.667 8-2 23-14 45s-18 42.333-18 61c0 20 12.667 38.667 38 56s38 32.667 38 46c0 18.667 2.667 41.333 8 68s8 41.333 8 44c0 8 12 26 36 54s41.333 42 52 42c6.667 0 10.333-7.333 11-22 .667-14.667 0-32.667-2-54s-3-34.667-3-40c0-21.333 4.667-46 14-74 8-28 27.667-51.333 59-70s49.667-34 55-46c10.667-22.667 13.667-43 9-61s-10.333-32.333-17-43c-6.667-10.667-18-20-34-28s-29.667-13.667-41-17c-11.333-3.333-23.667-6.333-37-9-13.333-2.667-20.667-4-22-4-10.667-4-24.667-6.333-42-7-17.333-.667-29.333.333-36 3-6.667 2.667-15.667-1-27-11s-17-19.667-17-29c0-6.667 5-15.667 15-27s21.667-23.667 35-37c13.333-13.333 22.667-23.333 28-30 5.333-9.333 11-16.333 17-21 6-4.667 13.333-10 22-16s17.667-13 27-21c2.667-2.667 11-8.333 25-17s23-16.333 27-23m-72 794c44 13.333 86.667 20 128 20 85.333 0 160.667-22.667 226-68-17.333-29.333-56.667-40.667-118-34-16 1.333-37.667 7-65 17s-43 15.667-47 17c-49.333 10.667-74.667 16-76 16-8 1.333-16.667 6-26 14-9.333 8-16.667 14-22 18" />
          </svg>
        </p>
        <p className="font-medium text-[12px]">{title}</p>
      </div>

      {tabs.length > 1 && (
        <div
          className="w-[19px] h-[19px] rounded-full flex items-center justify-center duration-200 hover:bg-red-200"
          title="Đóng thẻ"
          onClick={() => {
            window.electronAPI.closeTab({ id, isCurrentTab: isActive });
            if (isActive) {
              setTabs(tabs.filter((i) => i.id !== id).map((i, idx) => ({ ...i, isActive: idx === 0 })));
              return;
            }
            setTabs(tabs.filter((i) => i.id !== id));
          }}
        >
          <p className="w-[15px] h-[15px]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#4f4f4f">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </p>
        </div>
      )}
      {!isActive && <span className="-mt-1 text-[#a0c0f8]">|</span>}

      <div
        className={clsx('absolute bottom-0 left-[-8px] w-[8px] h-[8px]', {
          'bg-white': isActive,
          'bg-[#d5e3fc]': !isActive
        })}
      >
        <div className="relative w-full h-full">
          <div className="bg-[#d5e3fc] w-full h-full rounded-br-full" />
        </div>
      </div>

      <div
        className={clsx('absolute bottom-0 right-[-8px] w-[8px] h-[8px]', {
          'bg-white': isActive,
          'bg-[#d5e3fc]': !isActive
        })}
      >
        <div className="relative w-full h-full">
          <div className="bg-[#d5e3fc] w-full h-full rounded-bl-full" />
        </div>
      </div>
    </div>
  );
};

export default memo(TabItem);
