/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Filter, filterTodos } from './components/utils';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterBy, setFilterBy] = useState<Filter | string>('all');
  const [query, setQuery] = useState<string>('');
  const [isHide, setIsHide] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      const data = await getTodos();

      setTodos(data);
      setIsLoading(false);
    };

    loadTodos();
  }, []);

  const filteredTodos = filterTodos(todos, filterBy, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {
                isLoading
                  ? <Loader />
                  : todos
                  && (
                    <TodoList
                      todos={filteredTodos}
                      setIsHide={setIsHide}
                      selectedTodo={selectedTodo}
                      setSelectedTodo={setSelectedTodo}
                      setIsLoading={setIsLoading}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>

      {
        !isHide
        && selectedTodo
        && (
          <TodoModal
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setIsHide={setIsHide}
            selectedTodo={selectedTodo}
            setSelectedTodo={setSelectedTodo}
          />
        )
      }
    </>
  );
};
