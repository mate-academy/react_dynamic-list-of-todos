/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

function filterTodos(todos: Todo[], todosActivityFilter: string, todosQuery: string) {
  let resultTodos = [...todos];
  const query = todosQuery.toLowerCase();

  switch (todosActivityFilter) {
    case 'completed':
      resultTodos = resultTodos.filter(todo => todo.completed
      && todo.title.toLowerCase().includes(query));
      break;
    case 'active':
      resultTodos = resultTodos.filter(todo => !todo.completed
      && todo.title.toLowerCase().includes(query));
      break;
    default:
      resultTodos = resultTodos.filter(todo => todo.title.toLowerCase().includes(query));
      break;
  }

  return resultTodos;
}

export const App: React.FC = () => {
  const [todoShown, setTodoShown] = useState<Todo>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosActivityFilter, setTodosActivityFilter] = useState('All');
  const [todosQuery, setTodosQuery] = useState('');
  const [loadingDone, setLoadingDone] = useState(false);

  const setActivityFilter = (filterValue: string) => {
    setTodosActivityFilter(filterValue);
  };

  const setQuery = (value: string) => {
    setTodosQuery(value);
  };

  const focusOnTodo = (todo: Todo) => {
    setTodoShown(todo);
  };

  const unFocusOnTodo = () => {
    setTodoShown(undefined);
  };

  useEffect(() => {
    const loadTodos = async () => {
      const data = await getTodos();

      setTodos(data);
      setLoadingDone(true);
    };

    loadTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setActivityFilter={setActivityFilter}
                setQuery={setQuery}
                query={todosQuery}
              />
            </div>

            <div className="block">
              {!loadingDone
              && (<Loader />)}
              <TodoList
                todos={filterTodos(todos, todosActivityFilter, todosQuery)}
                todoFocusedOn={todoShown}
                focusOnTodo={focusOnTodo}
              />
            </div>
          </div>
        </div>
      </div>
      { todoShown !== undefined && (<TodoModal todo={todoShown} unFocus={unFocusOnTodo} />)}
    </>
  );
};
