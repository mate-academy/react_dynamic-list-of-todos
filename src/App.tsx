import { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoContext } from './contexts/TodoContext';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [search, setSearch] = useState<string>('');
  const [select, setSelect] = useState<string>('all');

  const resetSelectedTodo = useCallback(() => {
    setSelectedTodo(null);
    setUser(null);
  }, []);

  const handleSelect = useCallback((selectFilter) => {
    setSelect(selectFilter);
  }, []);

  const handleSearch = useCallback((searchFilter) => {
    setSearch(searchFilter);
  }, []);

  const filterTodos = (filterCondition: (todo: Todo) => boolean) => {
    return todos.filter(filterCondition);
  };

  const filteredTodos = useCallback((
    selectFilter: string,
    searchFilter: string,
  ) => {
    return filterTodos((todo: Todo) => {
      const searchCheck = todo.title.toLocaleLowerCase()
        .includes(searchFilter.toLocaleLowerCase());

      switch (selectFilter) {
        case 'all':
          return searchCheck;
        case 'active':
          return searchCheck && !todo.completed;
        case 'completed':
          return searchCheck && todo.completed;
        default:
          return searchCheck;
      }
    });
  }, [todos, search, select]);

  const visibleTodos = filteredTodos(select, search);

  useEffect(() => {
    getTodos().then((data) => setTodos(data));
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId).then((data) => setUser(data));
    }
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                select={select}
                onSelect={handleSelect}
                search={search}
                onSearch={handleSearch}
              />
            </div>

            <div className="block">
              {visibleTodos.length
                ? (
                  <TodoContext.Provider value={{
                    selectedTodo,
                    setSelectedTodo,
                  }}
                  >
                    <TodoList
                      todos={visibleTodos}
                    />
                  </TodoContext.Provider>
                ) : (
                  <Loader />
                )}

            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          user={user}
          todo={selectedTodo}
          onClose={resetSelectedTodo}
        />
      )}
    </>
  );
};
