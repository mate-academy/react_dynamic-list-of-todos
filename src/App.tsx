/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { SelectOptions } from './types/SelectOptions';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [shownTodos, setShownTodos] = useState<SelectOptions>(SelectOptions.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos: Todo[] = useMemo(() => {
    let copiedTodos = [...todos];

    if (query) {
      copiedTodos = copiedTodos.filter(
        (todo) => todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    switch (shownTodos) {
      case SelectOptions.Active:
        return copiedTodos.filter(todo => !todo.completed);
      case SelectOptions.Completed:
        return copiedTodos.filter(todo => todo.completed);
      default:
        return copiedTodos;
    }
  }, [query, todos, shownTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setSelect={setShownTodos}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={filteredTodos}
                onTodoSelect={setSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />}
    </>
  );
};
