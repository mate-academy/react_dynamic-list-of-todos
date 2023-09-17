import ReactDOM from 'react-dom';
import { App } from './App';
import { ContextTodo } from './context/ContextTodo';

ReactDOM.render(
  <ContextTodo>
    <App />
  </ContextTodo>,
  document.getElementById('root'),
);
