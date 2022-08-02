import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
// eslint-disable-next-line import/no-cycle
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export enum SortOption {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState(0);
  const [selectedUser, setSelectedUser] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredBy, setFilteredBy] = useState<string>(SortOption.ALL);

  useEffect(() => {
    const loadTodos = async () => {
      const todosFromServer = await getTodos();

      setLoading(false);
      setTodos(todosFromServer);
      setVisibleTodos(todosFromServer);
    };

    loadTodos();
    setLoading(true);
  }, []);

  const changeFilteredBy = (filterType: string) => {
    setFilteredBy(filterType);
  };

  const handleChangeQuery = (input: string) => {
    setQuery(input);
  };

  const handleFilter = (title: string) => {
    return title.toLowerCase().includes(query.toLowerCase());
  };

  useEffect(() => {
    switch (filteredBy) {
      case SortOption.ALL:
        setVisibleTodos(todos.filter(todo => handleFilter(todo.title)));
        break;

      case SortOption.ACTIVE:
        setVisibleTodos(todos.filter(todo => handleFilter(todo.title))
          .filter(todo => !todo.completed));
        break;

      case SortOption.COMPLETED:
        setVisibleTodos(todos.filter(todo => handleFilter(todo.title))
          .filter(todo => todo.completed));
        break;

      default:
        break;
    }
  }, [filteredBy, query]);

  const selectUser = (id: number, todoId: number) => {
    setUserId(id);
    setSelectedUser(!selectedUser);
    setSelectedTodo(todoId);
  };

  const userTodo = todos.find(todo => todo.id === selectedTodo);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {loading
              ? <Loader />
              : (
                <>
                  <h1 className="title">Todos:</h1>

                  <div className="block">
                    <TodoFilter
                      changeFilteredType={changeFilteredBy}
                      handlechangeQuery={handleChangeQuery}
                      query={query}
                    />
                  </div>

                  <div className="block">
                    <TodoList
                      todos={visibleTodos}
                      selectUser={selectUser}
                      selectedTodo={selectedTodo}
                    />
                  </div>
                </>
              )}
          </div>
        </div>
      </div>

      {selectedUser && (
        <TodoModal
          todo={userTodo}
          selectedUser={userId}
          selectUser={selectUser}
        />
      )}
    </>
  );
};
