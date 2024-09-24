import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import '../../index.css';
import History from './history';

const root = createRoot(document.getElementById('history'));
root.render(
  <RecoilRoot>
    <History />
  </RecoilRoot>
);
