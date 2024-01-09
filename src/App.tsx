/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Options } from './types/FilteredOption';

function getFilteredTodos(todos: Todo[], filteredBy: string) {
  switch (filteredBy) {
    case Options.all:
      return todos;
    case Options.active:
      return todos.filter((todo) => !todo.completed);
    case Options.completed:
      return todos.filter((todo) => todo.completed);

    default:
      return todos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>();
  const [filter, setField] = useState(Options.all);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const filteredTodos = getFilteredTodos(todos, filter).filter((todo) => (
    todo.title.toLowerCase().includes(title.toLowerCase())));

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                title={title}
                setTitle={setTitle}
                setFilter={setField}
              />
            </div>

            <div className="block">

              {!loading && (
                <TodoList
                  todos={filteredTodos}
                  selected={selectedTodo}
                  selectTodo={setSelectedTodo}
                />
              )}
            </div>
            {loading && <Loader />}
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
