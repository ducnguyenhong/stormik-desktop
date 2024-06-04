import { useEffect } from 'react';
import HomeButton from './components/home-button';
import InputURL from './components/input-url';
import MoreButton from './components/more-button';
import NextButton from './components/next-button';
import PrevButton from './components/prev-button';
import ReloadButton from './components/reload-button';
import './header.css';

const Header: React.FC = () => {
  window.electronAPI.detectUrlChange((data: string) => {
    console.log('ducnh123456', data);

    // setUrl(data);
  });

  useEffect(() => {
    window.electronAPI.detectUrlChange((data: string) => {
      console.log('ducnh12345', data);

      // setUrl(data);
    });

    // window.electronAPI.receive('url-change', (data: string) => {
    //   console.log(`Received ${data} from main process`);
    // });

    // window.addEventListener(
    //   'message',
    //   (event) => {
    //     console.log('ducnh e', event.data);
    //   },
    //   false
    // );
  }, []);

  return (
    <div className="main-header">
      <div className="main-header-top">
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
