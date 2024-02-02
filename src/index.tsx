import ReactDOM from 'react-dom';
import { App } from './App';
import { TodosProvider } from './components/TodosContext/TodosContext';
import './index.scss';

ReactDOM.render(
  <TodosProvider>
    <App />
  </TodosProvider>,
  document.getElementById('root'),
);
