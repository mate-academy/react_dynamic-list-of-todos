import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [query, setQuery] = useState('');
  const [input, setInput] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const prepareTodos = useCallback(() => {
    let preparedToods = [...todos];

    if (input) {
      const modifiedInput = input.trim().toLowerCase();

      preparedToods = preparedToods.filter(movie =>
        movie.title.toLowerCase().includes(modifiedInput),
      );
    }

    if (query) {
      switch (query) {
        case 'active':
          return preparedToods.filter(todo => !todo.completed);
        case 'all':
          return preparedToods;
        case 'completed':
          return preparedToods.filter(todo => todo.completed);
        default:
          return preparedToods;
      }
    }

    return preparedToods;
  }, [todos, query, input]);

  const preparedTodos = prepareTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilter={value => setQuery(value)}
                onInput={value => setInput(value)}
                input={input}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={preparedTodos}
                  onModalButton={value => setSelectedTodo(value)}
                  clicked={value => setClicked(value)}
                  resultClick={clicked}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        todo={selectedTodo}
        clicked={clicked}
        onClose={() => setClicked(false)}
      />
    </>
  );
};
