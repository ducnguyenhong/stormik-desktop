import { memo } from 'react';

const ManageTab: React.FC = () => {
  return (
    <div className="mx-1 w-[26px] h-[26px] bg-[#f2f2f2] flex items-center justify-center rounded-md duration-200 hover:bg-[#f8f8f8]">
      <p>
        <span>
          <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
            <path d="M16.293 9.293L12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z" />
          </svg>
        </span>
      </p>
    </div>
  );
};

export default memo(ManageTab);
