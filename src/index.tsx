import ReactDOM from 'react-dom';
import { App } from './App';
import { ToDoProvider } from './components/ToDoContext';

ReactDOM.render(
  <ToDoProvider>
    <App />
  </ToDoProvider>,
  document.getElementById('root'),
);
