import { memo, useCallback } from 'react';

const NextButton: React.FC = () => {
  const onNextPage = useCallback(() => {
    window.electronAPI.nextPage();
  }, []);

  return (
    <div
      className="w-[32px] h-[32px] flex justify-center items-center duration-200 hover:bg-[#f2f2f2] rounded-full"
      onClick={onNextPage}
      title="Tiến lên"
    >
      <p className="w-[25px] h-[25px]">
        <svg fill="#262626" viewBox="0 0 16 16">
          <path
            fillRule="evenodd"
            d="M4 8a.5.5 0 01.5-.5h5.793L8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.293 8.5H4.5A.5.5 0 014 8z"
          />
        </svg>
      </p>
    </div>
  );
};

export default memo(NextButton);
