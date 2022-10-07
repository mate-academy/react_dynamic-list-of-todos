/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [responseFilter, setResponseFilter] = useState('');

  const addData = async () => {
    const getTodosFromServer = await getTodos();

    setTodos(getTodosFromServer);
    setIsLoaded(true);
  };

  useEffect(() => {
    addData();
  }, []);

  const filterParams = (title: string, input: string) => {
    return title.toLowerCase().includes(input.toLowerCase());
  };

  const filteredTodos = useMemo(() => {
    switch (filterBy) {
      case 'active':
        return (todos.filter(({ title, completed }) => !completed && filterParams(title, responseFilter)));
      case 'completed':
        return (todos.filter(({ title, completed }) => completed && filterParams(title, responseFilter)));
      default:
        return (todos.filter(({ title }) => filterParams(title, responseFilter)));
    }
  }, [filterBy, todos, responseFilter]);

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
                responseFilter={responseFilter}
                setResponseFilter={setResponseFilter}
              />
            </div>

            <div className="block">
              {
                !isLoaded
                  ? <Loader />
                  : (
                    <TodoList
                      todos={filteredTodos}
                      selectedTodo={selectedTodo}
                      setSelectedTodo={setSelectedTodo}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>

      {selectedTodo?.userId && (
        <TodoModal
          todo={selectedTodo}
          setTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
