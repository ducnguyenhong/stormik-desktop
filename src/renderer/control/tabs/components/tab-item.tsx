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
  const { id, title, url, isActive, isLoading } = item;

  const onClickTab = useCallback(
    (id: string) => {
      window.electronAPI.changeTab(id);
    },
    [tabs]
  );

  return (
    <div
      className={clsx(
        'h-[35px] relative flex items-center px-2 gap-2.5 cursor-default rounded-t-xl w-[230px] justify-between',
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
        {isLoading ? (
          <p className="w-5 h-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
              <radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
                <stop offset="0" stop-color="#38A643"></stop>
                <stop offset=".3" stop-color="#38A643" stop-opacity=".9"></stop>
                <stop offset=".6" stop-color="#38A643" stop-opacity=".6"></stop>
                <stop offset=".8" stop-color="#38A643" stop-opacity=".3"></stop>
                <stop offset="1" stop-color="#38A643" stop-opacity="0"></stop>
              </radialGradient>
              <circle
                transform-origin="center"
                fill="none"
                stroke="url(#a12)"
                stroke-width="26"
                stroke-linecap="round"
                stroke-dasharray="200 1000"
                stroke-dashoffset="0"
                cx="100"
                cy="100"
                r="70"
              >
                <animateTransform
                  type="rotate"
                  attributeName="transform"
                  calcMode="spline"
                  dur="1.5"
                  values="360;0"
                  keyTimes="0;1"
                  keySplines="0 0 1 1"
                  repeatCount="indefinite"
                ></animateTransform>
              </circle>
              <circle
                transform-origin="center"
                fill="none"
                opacity=".2"
                stroke="#38A643"
                stroke-width="26"
                stroke-linecap="round"
                cx="100"
                cy="100"
                r="70"
              ></circle>
            </svg>
          </p>
        ) : (
          <img src={`https://www.google.com/s2/favicons?domain=${url}&sz=128`} className="w-4 h-4" />
        )}

        <p className="font-medium text-[12px] line-clamp-1">{title}</p>
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
          'bg-[#e6e6e6]': !isActive
        })}
      >
        <div className="relative w-full h-full">
          <div className="bg-[#e6e6e6] w-full h-full rounded-br-full" />
        </div>
      </div>

      <div
        className={clsx('absolute bottom-0 right-[-8px] w-[8px] h-[8px]', {
          'bg-white': isActive,
          'bg-[#e6e6e6]': !isActive
        })}
      >
        <div className="relative w-full h-full">
          <div className="bg-[#e6e6e6] w-full h-full rounded-bl-full" />
        </div>
      </div>
    </div>
  );
};

export default memo(TabItem);
