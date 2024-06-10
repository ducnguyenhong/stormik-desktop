import ButtonControl from './button-control';
import InputURL from './input-url';
import TabList from './tabs';

const Control: React.FC = () => {
  return (
    <div className="w-full h-[110px]">
      <div>
        <TabList />
      </div>
      <div className="h-[42px] py-[4px] flex items-center gap-1">
        <ButtonControl />

        <InputURL />
      </div>

      <div className="flex items-center gap-3">
        <img src={`https://cdn-icons-png.flaticon.com/256/1384/1384060.png`} className="w-5 h-5" />
        <img src={`https://www.google.com/s2/favicons?domain=${'https://24h.com.vn'}&sz=128`} className="w-5 h-5" />
      </div>
    </div>
  );
};

export default Control;
