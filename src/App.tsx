/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number>(0);
  const [query, setQuery] = useState('');
  const [option, setOption] = useState('all');

  const closeModal = useCallback(
    () => {
      setSelectedTodoId(0);
    },
    [],
  );

  useEffect(() => {
    getTodos().then((todo) => setTodos(todo));
  }, []);

  let visibleTodos = todos;

  visibleTodos = useMemo(() => visibleTodos.filter((todo) => {
    const queryLowerCase = query.toLocaleLowerCase().trim();
    const filterByTitle = todo.title.toLocaleLowerCase().includes(queryLowerCase);

    switch (option) {
      case 'active':
        return !todo.completed && filterByTitle;

      case 'completed':
        return todo.completed && filterByTitle;

      default:
        return todo && filterByTitle;
    }
  }), [option, visibleTodos, query]);

  const selectedTodo = useMemo(
    () => visibleTodos.find((todo) => todo.id === selectedTodoId),
    [selectedTodoId, visibleTodos],
  );

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
                option={option}
                setOption={setOption}
              />
            </div>

            <div className="block">
              {todos.length ? (
                <TodoList
                  todos={visibleTodos}
                  onUserId={setSelectedTodoId}
                  selectedId={selectedTodoId}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal onCloseModal={closeModal} todo={selectedTodo} />
      )}
    </>
  );
};
