import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import {
  getActiveTodos,
  getCompletedTodos,
  getTodos,
} from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [userTodos, setUserTodos] = useState<Todo[]>([]);
  const [filterSelection, setFilterSelection] = useState('all');
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [selectTodo, setSelectTodo] = useState<Todo>();
  const [activeTodoID, setActiveTodoID] = useState(0);

  const filteredTodos = () => {
    switch (filterSelection) {
      case 'active':
        return getActiveTodos();

      case 'completed':
        return getCompletedTodos();

      default:
        return getTodos();
    }
  };

  useEffect((() => {
    filteredTodos().then(todos => setUserTodos(todos));
  }), [filterSelection]);

  const visibleTodos = useMemo(() => {
    return userTodos.filter(todo => (todo.title).toLowerCase().includes(query));
  }, [userTodos, query]);

  const handleClick = (todo: Todo) => {
    setIsActive(true);
    setSelectTodo(todo);
    setActiveTodoID(todo.id);
  };

  const closeWindow = useCallback(() => {
    setIsActive(false);
    setActiveTodoID(0);
  }, []);

  const clearInput = useCallback(() => {
    setQuery('');
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeSelector={setFilterSelection}
                selectorValue={filterSelection}
                onChangeInput={setQuery}
                inputValue={query}
                clear={clearInput}
              />
            </div>

            <div className="block">
              {userTodos.length === 0
                ? (<Loader />)
                : (
                  <TodoList
                    todos={visibleTodos}
                    handleClick={handleClick}
                    activeID={activeTodoID}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {isActive && selectTodo && (
        <TodoModal
          todo={selectTodo}
          reset={closeWindow}
        />
      )}
    </>
  );
};
