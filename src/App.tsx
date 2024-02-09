/* eslint-disable max-len */
import { useEffect, useState, FC } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Sorted } from './types/Sorted';

const preparingTodos = (todos:Todo[], query:string, sorted:Sorted) => {
  switch (sorted) {
    case Sorted.Active:
      return (todos.filter(todo => !todo.completed && todo.title.includes(query.toLowerCase())));
    case Sorted.Completed:
      return (todos.filter(todo => todo.completed && todo.title.includes(query.toLowerCase())));
    default:
      return (todos.filter(todo => todo.title.includes(query.toLowerCase())));
  }
};

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sorted, setSorted] = useState(Sorted.All);
  const [query, setQuery] = useState('');
  const [modalTodo, setModalTodo] = useState<Todo | undefined>();

  useEffect(() => {
    getTodos().then(data => {
      setTodos(data);
    });
  }, []);

  const preparedTodos = preparingTodos(todos, query, sorted);

  const setModalTodoHandler = (value:Todo | undefined) => {
    setModalTodo(value);
  };

  const setQueryHandler = (value:string) => {
    setQuery(value);
  };

  const setSortedHandler = (value:Sorted) => {
    setSorted(value);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter query={query} setQueryHandler={setQueryHandler} setSortedHandler={setSortedHandler} />
            </div>

            <div className="block">
              {
                todos.length === 0 ? (
                  <Loader />
                ) : (
                  <TodoList todos={preparedTodos} setModalTodoHandler={setModalTodoHandler} modalTodo={modalTodo} />
                )
              }
            </div>
          </div>
        </div>
      </div>

      {modalTodo && <TodoModal setModalTodoHandler={setModalTodoHandler} modalTodo={modalTodo} />}
    </>
  );
};
