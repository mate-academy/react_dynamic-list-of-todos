/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [selectQuery, setSelectQuery] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const onFilterInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputQuery(e.target.value);

  const onFilterSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectQuery(e.target.value);

  const clearFilterInput = () => setInputQuery('');

  const onTodoSelect = (todo: Todo) => setSelectedTodo(todo);

  const onCloseTodoModal = () => setSelectedTodo(null);

  useEffect(() => {
    setLoading(true);

    const handleFilterTodos = (todoList: Todo[]) =>
      setTodos(
        todoList.filter(todoItem => {
          const { title, completed } = todoItem;
          const queryFilter = title
            .toLowerCase()
            .includes(inputQuery.toLowerCase());

          switch (selectQuery) {
            case 'active': {
              return !completed && queryFilter;
            }

            case 'completed': {
              return completed && queryFilter;
            }

            case 'all': {
              return queryFilter;
            }

            default: {
              return todoList;
            }
          }
        }),
      );

    getTodos()
      .then(handleFilterTodos)
      .finally(() => setLoading(false));
  }, [inputQuery, selectQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                inputQuery={inputQuery}
                onFilterInput={onFilterInput}
                onFilterSelect={onFilterSelect}
                clearFilterInput={clearFilterInput}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todos.length > 0 && (
                <TodoList
                  todos={todos}
                  selectedTodoId={selectedTodo ? selectedTodo.id : 0}
                  onTodoSelect={onTodoSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={onCloseTodoModal} />
      )}
    </>
  );
};
