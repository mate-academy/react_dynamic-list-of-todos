import ReactDOM from 'react-dom';
import { App } from './App';
import { TodoContextProvider } from './management/TodoContextProvider';

ReactDOM.render(
  <TodoContextProvider>
    <App />
  </TodoContextProvider>,
  document.getElementById('root'),
);
