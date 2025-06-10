/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { SelectStatusTodos } from './types/SelectStatusTodos';

interface FilterTodos {
  searchByTitle: string;
  selectStatusTodos: SelectStatusTodos;
}

const prepareTodos = (todos: Todo[], filter: FilterTodos): Todo[] => {
  let preparedTodos = [...todos];

  if (filter.searchByTitle !== '') {
    const normalizeSearch = filter.searchByTitle.trim().toLowerCase();

    preparedTodos = todos.filter(todo =>
      todo.title.toLowerCase().includes(normalizeSearch),
    );
  }

  switch (filter.selectStatusTodos) {
    case SelectStatusTodos.Active:
      preparedTodos = preparedTodos.filter(todo => todo.completed === false);
      break;
    case SelectStatusTodos.Completed:
      preparedTodos = preparedTodos.filter(todo => todo.completed);
      break;
  }

  return preparedTodos;
};

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [todos, setTodos] = useState<Todo[]>([]);

  const [userId, setUserId] = useState(0);
  const [todo, setTodo] = useState<Todo | null>(null);

  const [searchByTitle, setSearchByTitle] = useState('');
  const [selectStatusTodos, setSelectStatusTodos] = useState(
    SelectStatusTodos.All,
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = prepareTodos(todos, {
    searchByTitle,
    selectStatusTodos,
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                search={searchByTitle}
                onChangeInput={setSearchByTitle}
                chooseStatus={setSelectStatusTodos}
              />
            </div>

            <div className="block">
              {!isLoading ? (
                <TodoList
                  todos={visibleTodos}
                  setSelectedUserId={setUserId}
                  setSelectedTodo={setTodo}
                  selectedTodo={todo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {todo && (
        <TodoModal userId={userId} todo={todo} closeModalWindow={setTodo} />
      )}
    </>
  );
};
