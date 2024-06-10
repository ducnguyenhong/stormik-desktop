import { memo, useEffect, useState } from 'react';
import { Tab } from '../../../types/tab.type';
import { HOME_DOMAIN } from '../../../utils/const';
import ManageTab from './components/manage-tab';
import NewTab from './components/new-tab';
import TabItem from './components/tab-item';

const Tabs: React.FC = () => {
  const newTab = {
    title: 'Thẻ mới',
    url: HOME_DOMAIN,
    isActive: true
  };

  const [tabs, setTabs] = useState<Tab[]>([]);

  useEffect(() => {
    window.electronAPI.detectNewTab((id: string) => {
      setTabs([...tabs.map((i) => ({ ...i, isActive: false })), { ...newTab, id }]);
    });
  }, [tabs]);

  return (
    <div className="flex items-center gap-1 py-1 h-full bg-[#d5e3fc] px-2">
      <ManageTab />

      <div className="pt-[4px] flex items-center gap-1 h-[33px]">
        {tabs.map((item, index) => {
          return <TabItem key={index} item={item} tabs={tabs} setTabs={setTabs} />;
        })}
      </div>

      <NewTab />
    </div>
  );
};

export default memo(Tabs);
