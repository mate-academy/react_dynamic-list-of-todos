import { createRoot } from 'react-dom/client';

import { App } from './App';
import {
  EyeClickProvider,
  ModalIdProvider,
  ShowModalProvider,
} from './components/context/stateContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <ModalIdProvider>
    <ShowModalProvider>
      <EyeClickProvider>
        <App />
      </EyeClickProvider>
    </ShowModalProvider>
  </ModalIdProvider>,
);
