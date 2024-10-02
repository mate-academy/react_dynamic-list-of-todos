/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [originalTodos, setOriginalTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false); //
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    setIsLoaderActive(true);
    getTodos()
      .then(res => {
        setOriginalTodos(res);
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

  const applyFilters = () => {
    // status: string, query: string
    let filteredTodos: Todo[] = [];

    if (filterStatus === 'active') {
      filteredTodos = originalTodos.filter(todo => !todo.completed);
    } else if (filterStatus === 'completed') {
      filteredTodos = originalTodos.filter(todo => todo.completed);
    } else {
      filteredTodos = [...originalTodos];
    }

    if (query) {
      const lowerQuery = query.toLowerCase();

      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(lowerQuery),
      );
    }

    setTodos(filteredTodos);
  };

  // const filterChangeHandler = (data: { status: string; query: string }) => {
  //   applyFilters(data.status, data.query);
  //   // console.log(data);
  // };

  useEffect(() => {
    applyFilters();
  }, [query, filterStatus]);

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
                // filterChange={filterChangeHandler}
              />
            </div>

            <div className="block">
              {isLoaderActive ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
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
