import ReactDOM from 'react-dom';
import { App } from './App';
import { GlobalProvider } from './State/State';

ReactDOM.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
  document.getElementById('root'),
);
