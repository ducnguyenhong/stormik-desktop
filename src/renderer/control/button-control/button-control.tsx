import { memo } from 'react';
import NextButton from './buttons/next-button';
import PrevButton from './buttons/prev-button';
import RefreshButton from './buttons/refresh-button';

const ButtonControl: React.FC = () => {
  return (
    <div className="h-full flex items-center px-2">
      <div className="h-full flex items-center gap-1">
        <PrevButton />
        <NextButton />
        <RefreshButton />
      </div>
    </div>
  );
};

export default memo(ButtonControl);
