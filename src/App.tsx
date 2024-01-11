import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { Filter } from './types/Filter';
import { User } from './types/User';

function getFilteredTodos(items: Todo[], filter: string, query: string) {
  let copy = [...items];

  if (query) {
    copy = copy.filter(el => {
      const title = el.title.toLowerCase();
      const smallQuery = query.toLowerCase().trim();

      return title.includes(smallQuery);
    });
  }

  copy = copy.filter(item => {
    switch (filter) {
      case Filter.ALL:
        return item;

      case Filter.ACTIVE:
        return !item.completed;

      case Filter.COMPLETED:
        return item.completed;

      default:
        return 0;
    }
  });

  return copy;
}

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterSelect, setFilterSelect] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [isOpenTodo, setIsOpenTodo] = useState(false);
  const [userId, setUserId] = useState(0);
  const [user, setUser] = useState<User>(Object);
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(todos => setTodosList(todos));
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    getUser(userId).then(u => setUser(u));
  }, [userId]);

  const filteredTodos = getFilteredTodos(todosList, filterSelect, searchValue);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectValue={filterSelect}
                onSelect={setFilterSelect}
                searchValue={searchValue}
                onSearch={setSearchValue}
              />
            </div>

            <div className="block">
              {isLoading
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={filteredTodos}
                    currentTodo={todo}
                    setIsOpenTodo={setIsOpenTodo}
                    setUserId={setUserId}
                    setTodo={setTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {isOpenTodo && (
        <TodoModal
          user={user}
          todo={todo}
          setIsOpenTodo={setIsOpenTodo}
          setTodo={setTodo}
        />
      )}
    </>
  );
};
