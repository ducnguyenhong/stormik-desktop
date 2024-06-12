import { memo, useEffect, useState } from 'react';
import { Tab } from '../../../types/tab.type';
import ManageTab from './components/manage-tab';
import NewTab from './components/new-tab';
import TabItem from './components/tab-item';

const Tabs: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);

  console.log('ducnh tabs', tabs);

  useEffect(() => {
    window.electronAPI.effectTabChange((tabsData: Tab[]) => {
      setTabs(tabsData);
    });
  }, [tabs]);

  return (
    <div className="flex items-center justify-between h-full bg-[#e6e6e6] pl-2 pr-[140px]">
      <div className="flex items-center h-full gap-1 py-1">
        <ManageTab />

        <div className="pt-[4px] flex items-center gap-1">
          {tabs.map((item, index) => {
            return <TabItem key={index} item={item} tabs={tabs} />;
          })}
        </div>

        <NewTab />
      </div>
    </div>
  );
};

export default memo(Tabs);
