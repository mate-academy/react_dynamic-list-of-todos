import ReactDOM from 'react-dom';
import { App } from './App';
import { TodosProvider } from './TodosContext';

ReactDOM.render(
  <TodosProvider>
    <App />
  </TodosProvider>,
  document.getElementById('root'),
);
