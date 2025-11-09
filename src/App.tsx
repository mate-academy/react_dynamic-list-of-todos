/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [query, setQuery] = useState('');
  const [option, setOption] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .then(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId).then(setUser);
    }
  }, [selectedTodo]);

  const visibleGoods = useMemo(() => {
    const currentList = [...todos].filter(todo => {
      switch (option) {
        case 'active':
          return todo.completed === false;
        case 'completed':
          return todo.completed === true;
        default:
          return true;
      }
    });

    if (query.trim().length > 0) {
      return currentList.filter(todo =>
        todo.title.trim().toLowerCase().includes(query.trim().toLowerCase()),
      );
    }

    return currentList;
  }, [option, todos, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                value={query}
                filterOption={option}
                onChange={setQuery}
                onSelect={setOption}
              />
            </div>

            <div className="block">
              {!isLoaded && <Loader />}

              {isLoaded && (
                <TodoList
                  todos={visibleGoods}
                  selectedTodo={selectedTodo}
                  onSelected={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          onCloseUser={setUser}
          onCloseTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
