/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos, getUser } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Todo } from './types/Todo';

type FullTodo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
};

type CurrentFilter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<FullTodo | null>(null);
  const [filter, setFilter] = useState<CurrentFilter>('all');
  const [query, setQuery] = useState<string>('');

  const [fullTodos, setFullTodos] = useState<FullTodo[]>([]);

  const getFullTodos = (todos: Todo[], user: User) => {
    let result = [...todos.map(todo => ({ ...todo, user: user }))].sort(
      (a, b) => a.id - b.id,
    );

    if (query) {
      result = result.filter(item =>
        item.title.includes(query.toLocaleLowerCase().trim()),
      );
    }

    if (filter === 'completed') {
      return result.filter(item => item.completed);
    }

    if (filter === 'active') {
      return result.filter(item => !item.completed);
    }

    return result;
  };

  useEffect(() => {
    if (!query) {
      setLoader(true);
    }

    getTodos().then(responses => {
      responses.forEach(respons => {
        getUser(respons.userId)
          .then(user => {
            setFullTodos(getFullTodos(responses, user));
          })
          .finally(() => setLoader(false));
      });
    });
  }, [filter, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterValue={newValue => setFilter(newValue)}
                query={query}
                changeQuery={setQuery}
              />
            </div>

            <div className="block">
              {loader && <Loader />}

              {!loader && (
                <TodoList
                  todos={fullTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={modal => setSelectedTodo(modal)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={modal => setSelectedTodo(modal)}
        />
      )}
    </>
  );
};
