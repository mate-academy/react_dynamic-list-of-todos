import ReactDOM from 'react-dom';
import { App } from './App';
import { TodoProvider } from './TodoContext/TodoContext';

const wrappedApp = (
  <TodoProvider>
    <App />
  </TodoProvider>
);

ReactDOM.render(
  wrappedApp,
  document.getElementById('root'),
);
