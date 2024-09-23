import clsx from 'clsx';
import { memo, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isIncognitoAtom, isNewTabAtom, tabsAtom } from '../control.recoil';
import ManageTab from './components/manage-tab';
import NewTab from './components/new-tab';
import TabItem from './components/tab-item';

const Tabs: React.FC = () => {
  const tabs = useRecoilValue(tabsAtom);
  const setIsNewTab = useSetRecoilState(isNewTabAtom);
  const isIncognito = useRecoilValue(isIncognitoAtom);
  // const [isDropping, setIsDropping] = useState<boolean>(false);

  useEffect(() => {
    window.electronAPI.effectNewTab((newTab: boolean) => {
      setIsNewTab(newTab);
    });
  }, [setIsNewTab]);

  return (
    <div
      id="draggable-window"
      className={clsx('flex items-center justify-between h-full pl-2 pr-[140px]', {
        'bg-[#e6e6e6]': !isIncognito,
        'bg-[#4f4f4f]': isIncognito
      })}
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
