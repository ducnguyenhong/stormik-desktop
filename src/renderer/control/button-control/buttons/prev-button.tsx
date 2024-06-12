import clsx from 'clsx';
import { memo, useCallback } from 'react';

const PrevButton: React.FC = () => {
  const isActive = false;

  const onPrevPage = useCallback(() => {
    if (!isActive) {
      return;
    }
    window.electronAPI.prevPage();
  }, [isActive]);

  return (
    <div
      className={clsx('w-[32px] h-[32px] flex justify-center items-center duration-200 rounded-full', {
        'opacity-20': !isActive,
        'hover:bg-[#f2f2f2]': isActive
      })}
      onClick={onPrevPage}
      title="Coming soon"
    >
      <p className="w-[25px] h-[25px]">
        <svg fill="#262626" viewBox="0 0 16 16">
          <path
            fillRule="evenodd"
            d="M12 8a.5.5 0 01-.5.5H5.707l2.147 2.146a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 11.708.708L5.707 7.5H11.5a.5.5 0 01.5.5z"
          />
        </svg>
      </p>
    </div>
  );
};

export default memo(PrevButton);
