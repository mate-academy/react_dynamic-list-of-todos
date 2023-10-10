import ReactDOM from 'react-dom';
import { App } from './App';
import { GlobalStateProvider } from './components/TodosContext';

ReactDOM.render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
  document.getElementById('root'),
);
