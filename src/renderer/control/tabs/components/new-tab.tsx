import clsx from 'clsx';
import { memo, useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isIncognitoAtom, isNewTabAtom } from '../../control.recoil';

const NewTab: React.FC = () => {
  const setIsNewTab = useSetRecoilState(isNewTabAtom);
  const isIncognito = useRecoilValue(isIncognitoAtom);

  const onCreateNewTab = useCallback(() => {
    window.electronAPI.newTab();
  }, [setIsNewTab]);

  return (
    <div
      className={clsx('rounded-full mx-1 mt-0.5 w-[26px] h-[26px] flex items-center justify-center duration-200', {
        'bg-[#737373]': isIncognito,
        'hover:bg-[#f5f5f5]': !isIncognito,
        'hover:bg-[#999]': isIncognito
      })}
      onClick={onCreateNewTab}
      title="Thẻ mới"
    >
      <p className="w-[16px] h-[16px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={isIncognito ? '#e6e6e6' : '#4f4f4f'}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </p>
    </div>
  );
};

export default memo(NewTab);
