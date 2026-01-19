/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);
  const [query, setQuery] = React.useState('');
  const [option, setOption] = React.useState('all');

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(query.toLowerCase().trim());

    let matchOption = true;

    if (option === 'active') {
      matchOption = !todo.completed;
    } else if (option === 'completed') {
      matchOption = todo.completed;
    }

    return matchesSearch && matchOption;
  });

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                onOptionChange={setOption}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={filteredTodos}
                onSelectedTodo={setSelectedTodo}
                selectedTodoId={selectedTodo?.id || null}
              />
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
