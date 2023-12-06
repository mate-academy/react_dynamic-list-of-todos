import ReactDOM from 'react-dom';
import { App } from './App';
import { GlobalStateProvider } from './components/Provider/Context';

ReactDOM.render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
  document.getElementById('root'),
);
