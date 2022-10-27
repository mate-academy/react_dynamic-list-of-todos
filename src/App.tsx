/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[] | null>(null);
  const [visibleTodos, setVisibleTodos] = useState<Todo[] | null>(null);
  const [userId, setUserId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();

  const selectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const getTodosFromApi = async () => {
    const todos = await getTodos().then(todosApi => todosApi);

    if (todos !== undefined) {
      setTodosList(() => {
        return todos;
      });
      setVisibleTodos(() => {
        return todos;
      });
    }
  };

  useEffect(() => {
    getTodosFromApi();
  }, []);

  const search = (value: string) => {
    if (visibleTodos) {
      setVisibleTodos(() => {
        const filtered = [...visibleTodos].filter(todo => todo.title.toLowerCase().includes(value.toLowerCase()));

        return filtered;
      });
    }
  };

  const selectCompleted = () => {
    setVisibleTodos(() => {
      if (todosList) {
        const filtered = [...todosList]
          .filter(todo => !todo.completed);

        return filtered;
      }

      return null;
    });
  };

  const selectActive = () => {
    setVisibleTodos(() => {
      if (todosList) {
        const filtered = [...todosList]
          .filter(todo => todo.completed);

        return filtered;
      }

      return null;
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
                search={search}
                selectCompleted={selectCompleted}
                selectActive={selectActive}
              />
            </div>

            <div className="block">
              {(visibleTodos
                && (
                  <TodoList
                    todos={visibleTodos}
                    setUserId={setUserId}
                    selectTodo={selectTodo}
                  />
                ))
                || <Loader />}
            </div>
          </div>
        </div>
      </div>

      {userId !== 0
        && selectedTodo
        && (
          <TodoModal
            userId={userId}
            setUserId={setUserId}
            selectedTodo={selectedTodo}
          />
        )}
    </>
  );
};
