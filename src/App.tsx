/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

enum SortType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setViewTodos] = useState<Todo[]>(todos);
  const [userId, setUserId] = useState<number>(0);
  const [selectedTodo, setSelectedTodo] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [filteredBy, setFilterBy] = useState<string>(SortType.ALL);
  const [query, setQuery] = useState<string>('');
  const [selectedUser, isUserSelected] = useState<boolean>(false);

  useEffect(() => {
    const loadTodos = async () => {
      const todosFromServer = await getTodos();

      setLoading(true);
      setTodos(todosFromServer);
      setViewTodos(todosFromServer);
    };

    loadTodos();
    setLoading(false);
  }, []);

  const changeFilteredBy = (filterType: string) => {
    setFilterBy(filterType);
  };

  const changeQuery = (input: string) => {
    setQuery(input);
  };

  const handleFilter = (title: string) => {
    return title.toLowerCase().includes(query.toLowerCase());
  };

  useEffect(() => {
    switch (filteredBy) {
      case SortType.ALL:
        setViewTodos(todos.filter(todo => handleFilter(todo.title)));
        break;

      case SortType.ACTIVE:
        setViewTodos(todos.filter(todo => !todo.completed
          && handleFilter(todo.title)));
        break;

      case SortType.COMPLETED:
        setViewTodos(todos.filter(todo => todo.completed
          && handleFilter(todo.title)));
        break;

      default:
        break;
    }
  }, [filteredBy, query]);

  const selectUser = (id: number, todoId: number) => {
    setUserId(id);
    isUserSelected(!selectedUser);
    setSelectedTodo(todoId);
  };

  const usersTodo = todos.find(todo => todo.id === selectedTodo);

  return (
    <>
      <div className="App">
        <div className="App__conteiner">

          {!loading ? <Loader /> : (
            <>
              <div className="App__title">
                <strong>{`Todos: ${filteredBy}`}</strong>
              </div>

              <div className="App__filter Box">
                <TodoFilter
                  changeFilteredCondition={changeFilteredBy}
                  changeQuery={changeQuery}
                  query={query}
                />
              </div>

              <div className="App__list Field">
                <TodoList
                  todos={visibleTodos}
                  selectUser={selectUser}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {selectedUser && (
        <TodoModal
          todo={usersTodo}
          selectedUser={userId}
          selectUser={selectUser}
        />
      )}
    </>
  );
};

export default App;
