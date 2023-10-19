import ReactDOM from 'react-dom';
import { App } from './App';
import { TodosProvider } from './components/TodosContext';

ReactDOM.render(
  <TodosProvider>
    <App />
  </TodosProvider>,
  document.getElementById('root'),
);
