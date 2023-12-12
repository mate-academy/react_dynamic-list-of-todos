/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Select } from './types/Select';

export const App: React.FC = () => {
  const [todosFromAPI, setTodosFromAPI] = useState<Todo[]>([]);
  const [loadedData, isLoadedData] = useState(false);
  const [todoChosen, setTodoChosen] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then((todos) => {
        setTodosFromAPI(todos);
      })
      .finally(() => isLoadedData(true));
  }, []);

  const todosToRender: Todo[] = useMemo(() => {
    let todosToProceed = [...todosFromAPI];

    if (query) {
      todosToProceed = todosToProceed.filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase().trim()));
    }

    if (status) {
      switch (status) {
        case Select.ALL: {
          break;
        }

        case Select.ACTIVE: {
          todosToProceed = todosToProceed.filter((todo) => !todo.completed);
          break;
        }

        case Select.COMPLETED: {
          todosToProceed = todosToProceed.filter((todo) => todo.completed);
          break;
        }

        default:
          break;
      }
    }

    return todosToProceed;
  }, [todosFromAPI, query, status]);

  const handleQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleSelect = (givenStatus: string) => {
    setStatus(givenStatus);
  };

  const todoReset = () => {
    setTodoChosen(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQuery={handleQuery}
                query={query}
                onStatus={handleSelect}
                status={status}
              />
            </div>

            <div className="block">
              {loadedData ? (
                <TodoList
                  todos={todosToRender}
                  onSelectTodo={setTodoChosen}
                  todoSelected={todoChosen}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {todoChosen && (
        <TodoModal
          todo={todoChosen}
          onClose={todoReset}
        />
      )}
    </>
  );
};
