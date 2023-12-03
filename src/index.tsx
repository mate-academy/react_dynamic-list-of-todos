import ReactDOM from 'react-dom';
import { App } from './App';
import { GlobalStateProvider } from './Store';

ReactDOM.render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
  document.getElementById('root'),
);
