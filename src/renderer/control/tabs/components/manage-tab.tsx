import { memo } from 'react';
// import Logo from '../../../images/logo.png';

const ManageTab: React.FC = () => {
  return (
    <div className="mx-1 flex items-center justify-center">
      <img src="https://stormik.org/images/logo.png" className="w-[25px] h-[25px]" />
    </div>
  );
};

export default memo(ManageTab);
