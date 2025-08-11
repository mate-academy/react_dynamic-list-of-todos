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

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedValue, setSelectedValue] = useState('all');

  const onQueryChange = (value: string) => {
    setQuery(value);
  };

  const onSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  const onReset = () => {
    setQuery('');
    setSelectedValue('all');
  };

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((todos: Todo[]) => {
        let filtered = todos;

        if (selectedValue === 'active') {
          filtered = filtered.filter(todo => !todo.completed);
        } else if (selectedValue === 'completed') {
          filtered = filtered.filter(todo => todo.completed);
        }

        if (query.trim() !== '') {
          filtered = filtered.filter(todo =>
            todo.title.toLowerCase().includes(query.toLowerCase()),
          );
        }

        setTodosFromServer(filtered);
      })
      .finally(() => setIsLoading(false));
  }, [selectedValue, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                selectedValue={selectedValue}
                onQueryChange={onQueryChange}
                onSelectChange={onSelectChange}
                onReset={onReset}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todosFromServer}
                  selectedTodoId={selectedTodo?.id}
                  onSelectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
