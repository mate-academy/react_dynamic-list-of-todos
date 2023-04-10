/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
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

  useEffect(() => {
    let newFilteredTodos = todos;

    if (filter.searchTitle !== '') {
      newFilteredTodos = newFilteredTodos.filter((todo) => todo.title.toLowerCase().includes(filter.searchTitle));
    }

    if (filter.status !== 'all') {
      const completed = filter.status === 'completed';

      newFilteredTodos = newFilteredTodos.filter(
        (todo) => todo.completed === completed,
      );
    }

    setFilteredTodos(newFilteredTodos);
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
                  todos={filteredTodos}
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
          todos={filteredTodos}
        />
      )}
    </>
  );
};
