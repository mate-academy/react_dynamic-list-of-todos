/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Values } from './types/Values';

function preparedVisibleTodos(
  todos: Todo[],
  query: string,
  selected: Values,
): Todo[] {
  const normalizedQuery = query.trim().toLowerCase();
  let visibleTodos = [...todos];

  if (query) {
    visibleTodos = visibleTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  if (selected === Values.Active) {
    visibleTodos = visibleTodos.filter(todo => !todo.completed);
  }

  if (selected === Values.Completed) {
    visibleTodos = visibleTodos.filter(todo => todo.completed);
  }

  return visibleTodos;
}

export const App: React.FC = () => {
  const [loader, setLoader] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(Values.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [pressedId, setPressedId] = useState<null | number>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoader(false));
  }, []);

  const visibleTodos: Todo[] = preparedVisibleTodos(todos, query, selected);

  const getSelectedTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQuery={setQuery}
                selected={selected}
                onSelected={setSelected}
              />
            </div>

            <div className="block">
              {loader && <Loader />}

              <TodoList
                todos={visibleTodos}
                onSelectedTodo={getSelectedTodo}
                pressedId={pressedId}
                onPressed={setPressedId}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSelectedTodo={setSelectedTodo}
          onPressed={setPressedId}
        />
      )}
    </>
  );
};
