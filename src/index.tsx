import ReactDOM from 'react-dom';
import { App } from './App';
import { TodoProvider } from './components/TodoContext/TodoProvider';

ReactDOM.render(
  <TodoProvider>
    <App />
  </TodoProvider>,
  document.getElementById('root'),
);
