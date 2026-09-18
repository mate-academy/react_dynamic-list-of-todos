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
import { TodoFilterStatus } from './types/TodoFilterStatus';

function todoFilter<T>(
  items: T[],
  ...predicates: ((item: T) => boolean)[]
): T[] {
  return items.filter(item => {
    for (const predicat of predicates) {
      if (!predicat(item)) {
        return false;
      }
    }

    return true;
  });
}

export const App: React.FC = () => {
  const [todoFilterState, setTodoFilterState] = useState<TodoFilterStatus>(
    TodoFilterStatus.All,
  );
  const [query, setQuery] = useState<string>('');

  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();

  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(false);

  const filteredTodos = useMemo(() => {
    return todoFilter<Todo>(
      todos,
      ({ completed }: Todo) => {
        switch (todoFilterState) {
          case TodoFilterStatus.All:
            return true;
          case TodoFilterStatus.Active:
            return completed === false;
          case TodoFilterStatus.Completed:
            return completed === true;
        }
      },
      ({ title }: Todo) =>
        title.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }, [query, todoFilterState, todos]);

  useEffect(() => {
    setIsLoadingTodos(true);
    getTodos()
      .then(setTodos)
      .finally(() => {
        setIsLoadingTodos(false);
      });
  }, []);

  const handleSetTodoFilterState = (newState: TodoFilterStatus) => {
    setTodoFilterState(newState);
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
                setQuery={setQuery}
                setTodoFilter={value => handleSetTodoFilterState(value)}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedId={selectedTodo?.id || -1}
                  onDetalClic={setSelectedTodo}
                />
              )}{' '}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onCloseClic={() => {
            setSelectedTodo(undefined);
          }}
        />
      )}
    </>
  );
};
