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
import { StatusEnum } from './types/servises/StatusEmum';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[] | []>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(StatusEnum.all);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getTodos().then(todos => {
      setAllTodos(todos);
      setIsLoading(false);
    });
  }, []);

  function filterTodos() {
    let filteredTodos = [...allTodos];

    if (query) {
      filteredTodos = allTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    switch (status) {
      case StatusEnum.active:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case StatusEnum.completed:
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    return filteredTodos;
  }

  const visibleTodos = filterTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                status={status}
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                  setIsModalOpen={setIsModalOpen}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setSelectedTodo={setSelectedTodo}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
