import { memo, useCallback, useEffect, useState } from 'react';
import { Tab } from '../../types/tab.type';
import '../styles/tabs.css';

const Tabs: React.FC = () => {
  const newTab = {
    title: 'Thẻ mới',
    url: 'https://stormik.vercel.app',
    isActive: true,
    id: '2'
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
      {tabs.map((item) => {
        const { id, title, url, isActive } = item;

        return (
          <div
            className={isActive ? 'main-header-tab-item active' : 'main-header-tab-item'}
            key={id}
            onClick={() => onClickTab(id)}
          >
            <img src={`https://www.google.com/s2/favicons?domain=${url}&sz=128`} />
            <p>{title}</p>
            {!isActive && <span>|</span>}
          </div>
        );
      })}

      <div className="button-new-tab" onClick={() => window.electronAPI.newTab()}>
        <p title="Thẻ mới">
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
