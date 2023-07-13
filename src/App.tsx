import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getAllTodos } from './api';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [getOption, setGetOption] = useState<Promise<Todo[]>>(getAllTodos);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleTodos = (getTodos: () => Promise<Todo[]>) => {
    setIsLoading(true);

    getTodos()
      .then(currentTodos => setTodos([...currentTodos]
        .filter(todo => todo.title
          .toLowerCase()
          .includes(query.toLowerCase()))))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    handleTodos(() => getOption);
  }, [query, getOption]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChange={setQuery}
                onSelect={setGetOption}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={todos}
                    selectedTodo={selectedTodo}
                    onOpen={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          close={setSelectedTodo}
        />
      )}
    </>
  );
};
