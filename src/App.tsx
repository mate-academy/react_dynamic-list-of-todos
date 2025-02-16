import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoProvider } from './components/Todocontext/TodoContext';
import { TodoApp } from './components/TodoApp/TodoApp';

export const App = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};
