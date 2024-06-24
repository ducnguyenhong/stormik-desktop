import { memo, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isNewTabAtom, tabsAtom } from '../control.recoil';
import ManageTab from './components/manage-tab';
import NewTab from './components/new-tab';
import TabItem from './components/tab-item';

const Tabs: React.FC = () => {
  const tabs = useRecoilValue(tabsAtom);
  const setIsNewTab = useSetRecoilState(isNewTabAtom);
  // const [isDropping, setIsDropping] = useState<boolean>(false);

  useEffect(() => {
    window.electronAPI.effectNewTab((newTab: boolean) => {
      setIsNewTab(newTab);
    });
  }, [setIsNewTab]);

  return (
    <div
      id="draggable-window"
      className="flex items-center justify-between h-full bg-[#e6e6e6] pl-2 pr-[140px]"
      onDragLeaveCapture={(e) => {
        console.log('ducnh 5555', e);
      }}
      onDragLeave={(e) => {
        console.log('ducnh 6666', e);
      }}
    >
      <div className="flex items-center h-full gap-1 py-1">
        <ManageTab />

        <div className="pt-[4px] flex items-center gap-1">
          {tabs.map((item, index) => {
            return <TabItem key={index} item={item} />;
          })}
        </div>

        <NewTab />
      </div>
    </div>
  );
};

export default memo(Tabs);
