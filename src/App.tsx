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
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selected, setSelected] = useState<Todo | null>(null);
  const [field, setField] = useState<string>('all');
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (field === 'all') {
      getTodos()
        .then(todo =>
          todo.filter(x => x.title.toLowerCase().includes(value.toLowerCase())),
        )
        .then(todo => setTodos(todo))
        .finally(() => setIsLoading(false));
    } else if (field === 'active') {
      getTodos()
        .then(todo =>
          todo.filter(x => x.title.toLowerCase().includes(value.toLowerCase())),
        )
        .then(todo => todo.filter(x => x.completed !== true))
        .then(todo => setTodos(todo))
        .finally(() => setIsLoading(false));
    } else if (field === 'completed') {
      getTodos()
        .then(todo =>
          todo.filter(x => x.title.toLowerCase().includes(value.toLowerCase())),
        )
        .then(todo => todo.filter(x => x.completed === true))
        .then(todo => setTodos(todo))
        .finally(() => setIsLoading(false));
    }
  }, [value, field]);

  function handleSelection(newSelection: Todo) {
    setSelected(newSelection);
  }

  function handleDeletion() {
    setSelected(null);
  }

  function handleOption(newField: string) {
    setField(newField);
  }

  function handleInputChange(newValue: string) {
    setValue(newValue);
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleSelectOption={handleOption}
                field={field}
                handleInputChange={handleInputChange}
                value={value}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  onChange={handleSelection}
                  selected={selected}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selected && <TodoModal selected={selected} onDelete={handleDeletion} />}
    </>
  );
};
