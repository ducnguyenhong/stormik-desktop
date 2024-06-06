import HomeButton from './components/home-button';
import InputURL from './components/input-url';
import MoreButton from './components/more-button';
import NextButton from './components/next-button';
import PrevButton from './components/prev-button';
import ReloadButton from './components/reload-button';
import './header.css';
import HeaderTabs from './tabs';

const Header: React.FC = () => {
  return (
    <div className="main-header">
      <HeaderTabs />
      <div className="main-header-control">
        <div className="button-control">
          <HomeButton />
          <PrevButton />
          <NextButton />
          <ReloadButton />
        </div>

        <InputURL />

        <MoreButton />
      </div>

      <div className="main-header-bookmark">Bookmark</div>
    </div>
  );
};

export default Header;
