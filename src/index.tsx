import ReactDOM from 'react-dom';
import { App } from './App';
import { TodoProvider } from './components/TodoContext';
import { UserProvider } from './components/UserContext';

ReactDOM.render(
  <TodoProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </TodoProvider>,
  document.getElementById('root'),
);
