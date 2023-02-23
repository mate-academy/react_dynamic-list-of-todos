/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { User } from './types/User';
import { FilteredBy } from './types/FilteredBy';

import { getTodos, getUser } from './api';

const filteredTodos = (todos: Todo[], query: string, filter: FilteredBy) => {
  let todosCopy = [...todos];

  if (query) {
    const preparedQuery = query.toLowerCase().trim();

    todosCopy = todosCopy.filter((todo) => todo.title.toLowerCase().includes(preparedQuery));
  }

  switch (filter) {
    case FilteredBy.ACTIVE:
      todosCopy = todosCopy.filter(todo => !todo.completed);
      break;

    case FilteredBy.COMPLETED:
      todosCopy = todosCopy.filter(todo => todo.completed);
      break;

    case FilteredBy.ALL:
    default:
      break;
  }

  return todosCopy;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosisLoaded, settodosisLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(FilteredBy.ALL);

  const visibleTodos = filteredTodos(todos, query, filter);

  const loadUser = async (userId:number) => {
    const userFromServer = await getUser(userId);

    setUser(userFromServer);
    settodosisLoaded(true);
  };

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        settodosisLoaded(true);

        return setTodos(todosFromServer);
      })
      .catch(() => {
        // eslint-disable-next-line no-alert
        alert('Sorry, there is no todos');
      });
  }, []);

  const closeModal = () => {
    setUser(null);
    setCurrentTodo(null);
  };

  const onTodoListBtnClick = (userId: number, todo: Todo) => {
    setCurrentTodo(todo);
    loadUser(userId);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {!todosisLoaded && <Loader />}
              <TodoList
                todos={visibleTodos}
                currentTodo={currentTodo}
                onClick={onTodoListBtnClick}
              />
            </div>
          </div>
        </div>
      </div>
      {currentTodo && (
        <TodoModal
          user={user}
          todo={currentTodo}
          onCloseBtn={closeModal}
        />
      )}
    </>
  );
};
