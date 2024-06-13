/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { SelectOpts } from './types/SelectOpts';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [choice, setChoice] = useState<SelectOpts>(SelectOpts.All);
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<Todo | null>(null);

  function separateTodos(type: SelectOpts) {
    switch (type) {
      case SelectOpts.Active:
        return todos.filter(todo => !todo.completed);
      case SelectOpts.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  const todoList = separateTodos(choice).filter(todo =>
    todo.title.trim().toLowerCase().includes(query.trim().toLowerCase()),
  );

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                choice={choice}
                setChoice={setChoice}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todoList}
                  selected={selected}
                  onSelect={setSelected}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selected && <TodoModal selected={selected} onClosure={setSelected} />}
    </>
  );
};
