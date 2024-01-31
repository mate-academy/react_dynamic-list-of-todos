import ReactDOM from 'react-dom';
import { App } from './App';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoModal } from './components/TodoModal/TodoModal';
import { TodoList } from './components/TodoList/TodoList';
import { Loader } from './components/Loader/Loader';

ReactDOM.render(
  <App />,
  <TodoFilter />,
  <TodoModal />,
  <TodoList />,
  <Loader />,
  document.getElementById('root'),
);
