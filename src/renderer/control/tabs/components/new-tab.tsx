import { memo, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { isNewTabAtom } from '../../control.recoil';

const NewTab: React.FC = () => {
  const setIsNewTab = useSetRecoilState(isNewTabAtom);

  const onCreateNewTab = useCallback(() => {
    window.electronAPI.newTab();
  }, [setIsNewTab]);

  return (
    <div
      className="rounded-full mx-1 mt-0.5 w-[26px] h-[26px] flex items-center justify-center duration-200 hover:bg-[#f5f5f5]"
      onClick={onCreateNewTab}
      title="Thẻ mới"
    >
      <p className="w-[16px] h-[16px]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#4f4f4f">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </p>
    </div>
  );
};

export default memo(NewTab);
