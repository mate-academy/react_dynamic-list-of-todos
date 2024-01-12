import ReactDOM from 'react-dom';
import { App } from './App';
import { StateProvider } from './store/Store';

ReactDOM.render(
  <StateProvider>
    <App />
  </StateProvider>,
  document.getElementById('root'),
);
