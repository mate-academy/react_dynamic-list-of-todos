/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { IFilter, TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);

  const [filter, setFilter] = useState<IFilter>({
    status: 'all',
    searchTitle: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosData = await getTodos();

        setTodos(todosData);
      } catch {
        if (!todos.length) {
          setTodos([]);
        }
      }
    };

    fetchData();
  }, []);

  const visibleTodos: Todo[] = useMemo(() => {
    if (filter.status === 'all' && filter.searchTitle === '') {
      return todos;
    }

    let newVisibleTodos = todos;

    if (filter.searchTitle !== '') {
      newVisibleTodos = newVisibleTodos.filter((todo) => todo.title.toLowerCase().includes(filter.searchTitle));
    }

    if (filter.status !== 'all') {
      const completed = filter.status === 'completed';

      newVisibleTodos = newVisibleTodos.filter(
        (todo) => todo.completed === completed,
      );
    }

    if (newVisibleTodos) {
      return newVisibleTodos;
    }

    return [];
  }, [todos, filter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filter={filter} onChange={setFilter} />
            </div>

            <div className="block">
              {todos.length > 0 ? (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={todoId}
                  selectTodo={setTodoId}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
      {todoId !== 0 && (
        <TodoModal
          selectedTodoId={todoId}
          removeTodo={() => {
            setTodoId(0);
          }}
          todos={visibleTodos}
        />
      )}
    </>
  );
};
