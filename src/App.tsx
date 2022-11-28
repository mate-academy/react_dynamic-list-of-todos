/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos } from './api';

function isIncludesQuery(todoTitle: string, query: string) {
  return todoTitle.toLowerCase().includes(query.toLocaleLowerCase());
}

export const App: React.FC = () => {
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [selectStatus, setSelectStatus] = useState<string>('all');

  const handleSelectTodo = (todoId: number | null) => (
    todoId
      ? (setSelectTodo(todos.find(todo => todo.id === todoId) || null))
      : setSelectTodo(null)
  );

  const handleSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectStatus(event.target.value);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

  useEffect(() => {
    const todosFromServer = async () => {
      const data = await getTodos();

      setInitialTodos(data);
    };

    todosFromServer();
  }, []);

  useEffect(() => {
    switch (selectStatus) {
      case 'all':
        setTodos(
          initialTodos.filter(({ title }) => isIncludesQuery(title, query)),
        );
        break;

      case 'active':
        setTodos(
          initialTodos.filter(({ title, completed }) => (
            !completed && isIncludesQuery(title, query)
          )),
        );
        break;

      case 'completed':
        setTodos(
          initialTodos.filter(({ title, completed }) => (
            completed && isIncludesQuery(title, query)
          )),
        );
        break;

      default:
        break;
    }
  }, [initialTodos, query, selectStatus]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectStatus={selectStatus}
                query={query}
                onSelectStatus={handleSelectStatus}
                onQueryChange={handleQueryChange}
              />
            </div>

            <div className="block">
              {!todos.length && !query ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  onSelectTodo={handleSelectTodo}
                  selectedId={selectTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectTodo && (
        <TodoModal
          selectedTodo={selectTodo}
          onClose={handleSelectTodo}
        />
      )}
    </>
  );
};
