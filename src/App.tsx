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
import { TodoFilterStatrs } from './types/TodoFilterStatrs';

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
  const [todoFilterState, setTodoFilterState] = useState<TodoFilterStatrs>(
    TodoFilterStatrs.All,
  );
  const [qeury, setQeury] = useState<string>('');

  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();

  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(false);

  const filtratedTodos = useMemo(() => {
    return todoFilter<Todo>(
      todos,
      ({ completed }: Todo) => {
        switch (todoFilterState) {
          case TodoFilterStatrs.All:
            return true;
          case TodoFilterStatrs.Active:
            return completed === false;
          case TodoFilterStatrs.Complited:
            return completed === true;
        }
      },
      ({ title }: Todo) =>
        title.toLowerCase().includes(qeury.trim().toLowerCase()),
    );
  }, [qeury, todoFilterState, todos]);

  useEffect(() => {
    setIsLoadingTodos(true);
    getTodos()
      .then(setTodos)
      .finally(() => {
        setIsLoadingTodos(false);
      });
  }, []);

  const hendlSetTodoFilterState = (newState: TodoFilterStatrs) => {
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
                query={qeury}
                setQuery={setQeury}
                setTodoFilter={value => hendlSetTodoFilterState(value)}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filtratedTodos}
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
