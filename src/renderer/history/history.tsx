import { memo } from 'react';
import Control from '../control';

const History: React.FC = () => {
  return (
    <div className="w-full h-[1000px]">
      <Control />
      <div>aaaa</div>
    </div>
  );
};

export default memo(History);
