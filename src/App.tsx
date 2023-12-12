/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loadedData, isLoadedData] = useState(false);
  const [todoChosen, setTodoChosen] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then((todos) => {
        setTodosFromAPI(todos);
        setFilteredTodos(todos);
      })
      .finally(() => isLoadedData(true));
  }, []);

  const filterTodos = (newQuery: string, newStatus: string) => {
    let todosToProceed = [...todosFromAPI];

    if (newQuery) {
      todosToProceed = todosToProceed.filter((todo) => todo.title.includes(newQuery.toLowerCase()));
    }

    if (newStatus) {
      switch (newStatus) {
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

    setFilteredTodos(todosToProceed);
  };

  const handleQuery = (newQuery: string) => {
    setQuery(newQuery);
    filterTodos(newQuery, status);
  };

  const handleSelect = (givenStatus: string) => {
    setStatus(givenStatus);
    filterTodos(query, givenStatus);
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
              />
            </div>

            <div className="block">
              {loadedData ? (
                <TodoList todos={filteredTodos} onSelectTodo={setTodoChosen} />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {todoChosen && <TodoModal />}
    </>
  );
};
