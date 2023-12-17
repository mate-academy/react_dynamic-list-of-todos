/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/filterBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [todoChosenId, setTodoChosenId] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(Filter.All);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filterTodos: Todo[] = useMemo(() => {
    let filteredTodos = [...todos];

    if (query) {
      filteredTodos = filteredTodos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    switch (filter) {
      case Filter.Active:
        return filteredTodos.filter(todo => !todo.completed);

      case Filter.Completed:
        return filteredTodos.filter(todo => todo.completed);

      default:
        return filteredTodos;
    }
  }, [query, filter, todos]);

  const saveTodoId = (todoId: number | null) => {
    setTodoChosenId(todoId);
  };

  const onQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  // const onChange = (event: string) => {
  //   setFilter(event);
  // };

  const chosenTodo = todos.find(todo => todo.id === todoChosenId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={onQueryChange}
                setOption={setFilter}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={filterTodos}
                onEyeClick={saveTodoId}
                selectedTodoId={todoChosenId}
              />
            </div>
          </div>
        </div>
      </div>

      {todoChosenId && (
        <TodoModal
          viewTodo={chosenTodo || null}
          onClose={saveTodoId}
        />
      )}
    </>
  );
};
