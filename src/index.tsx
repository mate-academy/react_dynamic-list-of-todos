import ReactDOM from 'react-dom';
import { App } from './App';
import { TodosProvider } from './services/Store';

ReactDOM.render(
  <TodosProvider>
    <App />
  </TodosProvider>,
  document.getElementById('root'),
);
