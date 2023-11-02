import ReactDOM from 'react-dom';
import { App } from './App';
import { TodoContextProvider } from './components/TodoContext';

ReactDOM.render(
  <TodoContextProvider>
    <App />
  </TodoContextProvider>,
  document.getElementById('root'),
);
