/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Values } from './types/Enum';
import { TodoFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[] | null>(null);
  const [userId, setUserId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [visibleTodos, setVisibleTodos] = useState<Todo[] | null>(null);

  const getTodosFromApi = useCallback(async () => {
    const todos = await getTodos().then(todosApi => todosApi);

    if (todos !== undefined) {
      setTodosList(todos);
      setVisibleTodos(() => {
        return todos;
      });
    }
  }, []);

  useEffect(() => {
    getTodosFromApi();
  }, []);

  const filtered = todosList;

  const search = (query: string, select: Values) => {
    if (select === Values.COMPLETED && todosList) {
      return [...todosList].filter(todo => {
        return todo.title.toLowerCase().includes(query.toLowerCase()) && todo.completed;
      });
    }

    if (select === Values.ACTIVE && todosList) {
      return [...todosList].filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()) && !todo.completed);
    }

    if (select === Values.ALL && todosList) {
      return [...todosList].filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    return null;
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
                setVisibleTodos={setVisibleTodos}
              />
            </div>

            <div className="block">
              {filtered
                ? (
                  <TodoList
                    todos={visibleTodos}
                    setUserId={setUserId}
                    selectTodo={setSelectedTodo}
                    selected={selectedTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {userId && selectedTodo
        && (
          <TodoModal
            userId={userId}
            setUserId={setUserId}
            selectedTodo={selectedTodo}
            setSelectedTodo={setSelectedTodo}
          />
        )}
    </>
  );
};
