/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { SelectType } from './types/SelectType';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [choosenTodoId, setChoosenTodoId] = useState(0);
  const [selectFilter, setSelectFilter] = useState(SelectType.all);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(result => setTodos(result))
      .finally(() => setIsLoading(false));
  }, []);

  const choseenTodo = useMemo(() => {
    return todos.find(todo => todo.id === choosenTodoId);
  }, [choosenTodoId, todos]);

  const visibleTodos = useMemo(() => {
    let filteredTodos = todos;

    switch (selectFilter) {
      case SelectType.active:
        filteredTodos = todos.filter(todo => !todo.completed);
        break;
      case SelectType.completed:
        filteredTodos = todos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    const normalizedQuery = query.trim().toLowerCase();

    return filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(normalizedQuery)
    ));
  }, [todos, selectFilter, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterStatus={selectFilter}
                onFilterStatusChange={setSelectFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList todos={visibleTodos} onSelect={setChoosenTodoId} selectedTodoId={choosenTodoId} />
                )}
            </div>
          </div>
        </div>
      </div>

      {choosenTodoId
        && (
          <TodoModal todo={choseenTodo} onClose={setChoosenTodoId} />
        )}
    </>
  );
};
