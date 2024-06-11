import { memo } from 'react';

const ProtectButton: React.FC = () => {
  return (
    <div className="absolute top-[4px] left-[4px] w-[25px] h-[25px] flex justify-center items-center duration-200 bg-[#fff] hover:bg-[#e6e6e6] rounded-full">
      <p className="w-[15px] h-[15px]">
        <svg viewBox="0 0 24 24" fill="#38a643">
          <path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm4 10.723V20h-2v-2.277a1.993 1.993 0 01.567-3.677A2.001 2.001 0 0114 16a1.99 1.99 0 01-1 1.723z" />
        </svg>
      </p>
    </div>
  );
};

export default memo(ProtectButton);
