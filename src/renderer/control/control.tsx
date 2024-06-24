import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Tab } from '../../types/tab.type';
import Bookmark from './bookmark';
import ButtonControl from './button-control';
import { tabsAtom } from './control.recoil';
import InputURL from './input-url';
import TabList from './tabs';

const Control: React.FC = () => {
  const [tabs, setTabs] = useRecoilState(tabsAtom);

  useEffect(() => {
    window.electronAPI.effectTabChange((tabsData: Tab[]) => {
      setTabs(tabsData);
    });
  }, [tabs]);

  return (
    <div className="w-full h-[115px] border-b border-[#e6e6e6] overflow-hidden">
      <div className="h-[40px]">
        <TabList />
      </div>
      <div className="h-[42px] py-[4px] flex items-center gap-1">
        <ButtonControl />

        <InputURL />
      </div>

      <div className="h-[34px]">
        <Bookmark />
      </div>
    </div>
  );
};

export default Control;
