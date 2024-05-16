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
import { Select } from './types/Select';

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);

  useEffect(() => {
    getTodos()
      .then(response => setTodos(response))
      .catch(error => {
        throw new Error(`${error.message}, ${error.status}`);
      })
      .finally(() => setIsLoadingTodos(false));
  }, []);

  return { todos, isLoadingTodos };
};

export const App: React.FC = () => {
  const { todos, isLoadingTodos } = useTodos();

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [query, setQuery] = useState('');
  const [completeFilter, setCompleteFilter] = useState<Select>('all');

  const filtering = (todoList: Todo[]) => {
    let filteredTodos = [...todoList];

    filteredTodos = filteredTodos.filter(todo => {
      if (completeFilter === 'active') {
        return todo.completed === false;
      }

      if (completeFilter === 'completed') {
        return todo.completed === true;
      }

      return todo;
    });

    filteredTodos = filteredTodos.filter((todo: Todo) => {
      const normalizeQuery = query.toLowerCase().trim();
      const normalizeTitle = todo.title.toLowerCase();

      return normalizeTitle.includes(normalizeQuery);
    });

    return filteredTodos;
  };

  const filteredTodos = filtering(todos);

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
                setCompleteFilter={setCompleteFilter}
              />
            </div>

            <div className="block">
              {isLoadingTodos && <Loader />}

              {!isLoadingTodos && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} setTodo={setSelectedTodo} />
      )}
    </>
  );
};
