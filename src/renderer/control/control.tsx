import clsx from 'clsx';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Tab } from '../../types/tab.type';
import Bookmark from './bookmark';
import ButtonControl from './button-control';
import { isIncognitoAtom, tabsAtom } from './control.recoil';
import InputURL from './input-url';
import MoreAction from './more-action';
import TabList from './tabs';

const Control: React.FC = () => {
  const [tabs, setTabs] = useRecoilState(tabsAtom);
  const [isIncognito, setIsIncognito] = useRecoilState(isIncognitoAtom);
  // const navigate = useNavigate();

  useEffect(() => {
    window.electronAPI.effectTabChange((tabsData: Tab[]) => {
      setTabs(tabsData);
    });
  }, [tabs]);

  useEffect(() => {
    window.electronAPI.effectIncognito((data: boolean) => {
      setIsIncognito(data);
    });
  }, []);

  // useEffect(() => {
  //   window.electronAPI.effectSystemUrl((url: string) => {
  //     if (url === 'stormik://history') {
  //       navigate('/history');
  //     }
  //   });
  // }, [navigate]);

  return (
    <div
      className={clsx('w-full h-[115px] border-b overflow-hidden', {
        'bg-[#595959] border-[#595959]': isIncognito,
        'border-[#e6e6e6]': !isIncognito
      })}
    >
      <div className="h-[40px]">
        <TabList />
      </div>
      <div className="h-[42px] py-[4px] flex items-center gap-1">
        <ButtonControl />

        <InputURL />

        <MoreAction />
      </div>

      <div className="h-[34px]">
        <Bookmark />
      </div>
    </div>
  );
};

export default Control;
