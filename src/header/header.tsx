import InputURL from './components/input-url';
import NextButton from './components/next-button';
import PrevButton from './components/prev-button';
import ReloadButton from './components/reload-button';
import './header.css';

const Header: React.FC = () => {
  return (
    <div className="main-header">
      <div className="main-header-top">
        <div className="button-control">
          <PrevButton />
          <NextButton />
          <ReloadButton />
        </div>

        <InputURL />
      </div>

      <div>Bookmark</div>
    </div>
  );
};

export default Header;
