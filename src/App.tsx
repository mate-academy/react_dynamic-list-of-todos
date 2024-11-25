/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedOption, setSelectedOption] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await getTodos();

      const filteredResult = result
        .filter(
          todo =>
            selectedOption === 'all' ||
            (selectedOption === 'active' ? !todo.completed : todo.completed),
        )
        .filter(
          todo =>
            !query ||
            todo.title
              .trim()
              .toLowerCase()
              .includes(query.trim().toLowerCase()),
        );

      setTodos(filteredResult);
      setLoaded(true);
    };

    fetchTodos();
  }, [selectedOption, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onSelect={setSelectedOption} onChange={setQuery} />
            </div>

            <div className="block">
              {!loaded ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  selectedTodo={selectedTodo}
                  onSelect={setSelectedTodo}
                />
              )}
              {selectedTodo && (
                <TodoModal onClose={setSelectedTodo} post={selectedTodo} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
