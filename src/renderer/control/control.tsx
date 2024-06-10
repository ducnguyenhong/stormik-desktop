import Bookmark from './bookmark';
import ButtonControl from './button-control';
import InputURL from './input-url';
import TabList from './tabs';

const Control: React.FC = () => {
  return (
    <div className="w-full h-[115px] border-b border-[#e6e6e6]">
      <div className="h-[38px]">
        <TabList />
      </div>
      <div className="h-[42px] py-[4px] flex items-center gap-1">
        <ButtonControl />

        <InputURL />
      </div>

      <div className="h-[34px]">
        <Bookmark />
      </div>
    </div>
  );
};

export default Control;
