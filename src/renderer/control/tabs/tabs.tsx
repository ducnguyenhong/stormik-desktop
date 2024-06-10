import { memo, useEffect, useState } from 'react';
import { Tab } from '../../../types/tab.type';
import ManageTab from './components/manage-tab';
import NewTab from './components/new-tab';
import TabItem from './components/tab-item';

const Tabs: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);

  useEffect(() => {
    window.electronAPI.effectTabChange((tabsData: Tab[]) => {
      setTabs(tabsData);
    });
  }, [tabs]);

  return (
    <div className="flex items-center gap-1 py-1 h-full bg-[#d5e3fc] px-2">
      <ManageTab />

      <div className="pt-[4px] flex items-center gap-1">
        {tabs.map((item, index) => {
          return <TabItem key={index} item={item} tabs={tabs} setTabs={setTabs} />;
        })}
      </div>

      <NewTab />
    </div>
  );
};

export default memo(Tabs);
