/* eslint-disable max-len */

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import React, { useCallback, useEffect, useState } from 'react';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { TodosStatus } from './types/TodosStatus';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodosStatus, setSelectedTodosStatus] = useState<TodosStatus>(
    TodosStatus.All,
  );
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setIsTodosLoaded(true);
      })
      .catch(error => {
        throw new Error(error);
      });
  }, []);

  const chooseUser = useCallback((todo: Todo | null) => {
    setSelectedTodo(todo);
  }, []);

  const filterTodos = () => {
    const todosMatchQuery = todos.filter(({ title }) => (
      title.toLowerCase().includes(query.toLowerCase())
    ));

    return todosMatchQuery.filter(todo => {
      switch (selectedTodosStatus) {
        case TodosStatus.Active:
          return !todo.completed;

        case TodosStatus.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
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
                selectedTodosStatus={selectedTodosStatus}
                setSelectedTodosStatus={setSelectedTodosStatus}
              />
            </div>

            <div className="block">
              {isTodosLoaded
                ? (
                  <TodoList
                    todos={filterTodos()}
                    selectedTodo={selectedTodo}
                    onSelect={chooseUser}
                  />
                ) : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => chooseUser(null)}
        />
      )}
    </>
  );
};
