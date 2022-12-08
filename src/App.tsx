import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState('all');
  const [searchInput, setSearchInput] = useState('');

  const changeStatus = (newStatus: string) => {
    if (newStatus !== status) {
      setStatus(newStatus);
    }
  };

  const changeInput = (newInput: string) => {
    if (newInput !== searchInput) {
      setSearchInput(newInput);
    }
  };

  const visibleTodos = useMemo(() => {
    return allTodos.filter((todo: Todo) => {
      let statusFilter = true;
      let inputFilter = true;

      if (status === 'active') {
        statusFilter = todo.completed === false;
      }

      if (status === 'completed') {
        statusFilter = todo.completed === true;
      }

      if (searchInput !== '') {
        inputFilter = (
          todo.title.toLowerCase().includes(searchInput.toLowerCase().trim())
        );
      }

      return inputFilter && statusFilter;
    });
  }, [status, searchInput, allTodos]);

  const handleClose = useCallback(() => {
    return setActiveTodo(null);
  }, []);

  useEffect(() => {
    getTodos().then(todos => {
      setAllTodos(todos);
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchInput={searchInput}
                status={status}
                changeStatus={changeStatus}
                changeInput={changeInput}
              />
            </div>

            <div className="block">
              {allTodos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    setActiveTodo={setActiveTodo}
                    activeTodo={activeTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {activeTodo && (
        <TodoModal
          activeTodo={activeTodo}
          onClose={handleClose}
        />
      )}
    </>
  );
};
