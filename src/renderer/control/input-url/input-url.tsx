import clsx from 'clsx';
import { memo, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Tab } from '../../../types/tab.type';
import { HOME_DOMAIN_INCOGNITO, HOME_DOMAIN_NORMAL } from '../../../utils/const';
import { isIncognitoAtom, isNewTabAtom } from '../control.recoil';
import BookmarkButton from './components/bookmark-button';
import ProtectButton from './components/protect-button';

const InputURL: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [isNewTab, setIsNewTab] = useRecoilState(isNewTabAtom);
  const navigate = useNavigate();
  const isIncognito = useRecoilValue(isIncognitoAtom);

  useEffect(() => {
    if (isNewTab) {
      // inputRef?.current?.focus();
      // setIsNewTab(false);
    }
  }, [isNewTab, setIsNewTab]);

  useEffect(() => {
    window.electronAPI.effectTabChange((tabsData: Tab[]) => {
      const currentTab = tabsData.find((i) => i.isActive);
      const url = currentTab?.url;
      if (url) {
        setUrl(url);
      }
      if (url === 'stormik://history') {
        navigate('/history');
      }
    });
  }, [navigate]);

  return (
    <div
      className={clsx('flex relative flex-1 h-full', {
        'bg-[#595959]': isIncognito
      })}
    >
      <input
        ref={inputRef}
        className={clsx(
          'pb-[2px] text-[#595959] text-[14px] flex-1 border rounded-full h-full px-[31px] focus:border focus:bg-white focus:outline-[#38a643]',
          {
            'bg-[#f7f7f8] border-[#e6e6e6]': !isIncognito,
            'bg-[#595959] border-[#808080]': isIncognito
          }
        )}
        type="text"
        value={url === HOME_DOMAIN_NORMAL || url === HOME_DOMAIN_INCOGNITO ? '' : url}
        onFocus={() => inputRef.current?.select()}
        onBlur={() => inputRef.current?.blur()}
        placeholder="Tìm kiếm hoặc nhập một URL"
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (!url) {
              return;
            }

            if (
              url.match(
                /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&=]*)/g
              )
            ) {
              if (!/^.*?:\/\//.test(url)) {
                window.electronAPI.enterUrl(`https://${url}`);
                return;
              }
              window.electronAPI.enterUrl(url);
              return;
            }
            window.electronAPI.enterUrl(`https://stormik.org/search?query=${url}`);
          }
        }}
      />

      <ProtectButton />

      <div className="absolute top-[3px] right-[5px]">
        <BookmarkButton />
      </div>
    </div>
  );
};

export default memo(InputURL);
