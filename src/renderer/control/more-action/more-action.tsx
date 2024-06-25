import { memo } from 'react';

const MoreAction: React.FC = () => {
  return (
    <div className="pr-3 pl-1">
      <div
        onClick={() => {
          window.electronAPI.openCustomize();
        }}
        className="w-[30px] h-[30px] flex justify-center items-center duration-200 rounded-full hover:bg-[#f2f2f2]"
        title="Tùy chỉnh Stormik"
      >
        <p className="w-[19px] h-[19px]">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M13 12 A1 1 0 0 1 12 13 A1 1 0 0 1 11 12 A1 1 0 0 1 13 12 z" />
            <path d="M13 19 A1 1 0 0 1 12 20 A1 1 0 0 1 11 19 A1 1 0 0 1 13 19 z" />
            <path d="M13 5 A1 1 0 0 1 12 6 A1 1 0 0 1 11 5 A1 1 0 0 1 13 5 z" />
          </svg>
        </p>
      </div>
    </div>
  );
};

export default memo(MoreAction);
