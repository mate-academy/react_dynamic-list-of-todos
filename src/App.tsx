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
  const [userId, setUserId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [visibleTodos, setVisibleTodos] = useState<Todo[] | null>(null);

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

  const filterQeury = (query: string) => {
    if (todosList) {
      return [...todosList].filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    return null;
  };

  const filtered = todosList;

  const search = (query: string, select: string) => {
    const filter = filterQeury(query);

    if (select === 'completed' && filter) {
      return filter.filter(todo => todo.completed);
    }

    if (select === 'active' && filter) {
      return filter.filter(todo => !todo.completed);
    }

    if (select === 'all') {
      return filter;
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
              {(filtered
                && (
                  <TodoList
                    todos={visibleTodos}
                    setUserId={setUserId}
                    selectTodo={setSelectedTodo}
                    selected={selectedTodo}
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
            setSelectedTodo={setSelectedTodo}
          />
        )}
    </>
  );
};
