import ReactDOM from 'react-dom';
import { App } from './App';
import { TodosProvider } from './TodosProvider';

ReactDOM.render(
  <TodosProvider>
    <App />
  </TodosProvider>,
  document.getElementById('root'),
);
