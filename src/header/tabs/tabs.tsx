import { memo, useCallback, useEffect, useState } from 'react';
import { Tab } from '../../types/tab.type';
import '../styles/tabs.css';

const Tabs: React.FC = () => {
  const newTab = {
    title: 'Thẻ mới',
    url: 'https://stormik.vercel.app',
    isActive: true
  };

  const [tabs, setTabs] = useState<Tab[]>([]);

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

  useEffect(() => {
    window.electronAPI.detectNewTab((id: string) => {
      setTabs([...tabs.map((i) => ({ ...i, isActive: false })), { ...newTab, id }]);
    });
  }, [tabs]);

  return (
    <div className="main-header-tab">
      {tabs.map((item, index) => {
        const { id, title, url, isActive } = item;

        return (
          <div className={isActive ? 'main-header-tab-item active' : 'main-header-tab-item'} key={id}>
            <div
              className="title-wrapper"
              onClick={() => {
                if (isActive) {
                  return;
                }
                onClickTab(id);
              }}
            >
              {/* <img src={`https://www.google.com/s2/favicons?domain=${url}&sz=128`} /> */}
              <p className="icon-favicon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              </p>
              <p className="title">{title}</p>
            </div>
            {tabs.length > 1 && (
              <div
                className="wrapper-close"
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
                <p className="close-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </p>
              </div>
            )}
            {!isActive && <span>|</span>}
          </div>
        );
      })}

      <div className="button-new-tab" onClick={() => window.electronAPI.newTab()} title="Thẻ mới">
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </p>
      </div>
    </div>
  );
};

export default memo(Tabs);
