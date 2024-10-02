/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    setIsLoaderActive(true);
    getTodos()
      .then(res => {
        setTodos(res);
      })
      .finally(() => setIsLoaderActive(false));
  }, []);

  const selectTodoHandler = (todo: Todo) => {
    setCurrentTodo(todo);
    setIsModalVisible(true);
  };

  const closeModalHandler = () => {
    setCurrentTodo(null);
    setIsModalVisible(false);
  };

  const selectStatusTodosHandler = (statusValue: string) => {
    setFilterStatus(statusValue);
  };

  const filteredTodos = useMemo(() => {
    const lowerCaseQuery = query.toLowerCase();

    return todos.filter(todo => {
      const filteredByQuery = todo.title.toLowerCase().includes(lowerCaseQuery);

      switch (filterStatus) {
        case 'active':
          return filteredByQuery && !todo.completed;
        case 'completed':
          return filteredByQuery && todo.completed;
        default:
          return filteredByQuery;
      }
    });
  }, [query, todos, filterStatus]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectStatus={selectStatusTodosHandler}
                filtredQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoaderActive ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectTodo={selectTodoHandler}
                  selectedTodoId={currentTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && isModalVisible && (
        <TodoModal currentTodo={currentTodo} closeModal={closeModalHandler} />
      )}
    </>
  );
};
