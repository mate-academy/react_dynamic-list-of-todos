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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [responseFilter, setResponseFilter] = useState('');

  const addData = async () => {
    const get = await getTodos();

    setTodos(get);
    setLoading(false);
  };

  useEffect(() => {
    addData();
  }, []);

  const caseSensitive = (title: string, input: string) => {
    return title.toLowerCase().includes(input.toLowerCase());
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return (todos.filter(todo => !todo.completed)
          .filter(({ title }) => caseSensitive(title, responseFilter)));
      case 'completed':
        return (todos.filter(todo => todo.completed)
          .filter(({ title }) => caseSensitive(title, responseFilter)));
      default:
        return (todos.filter(({ title }) => caseSensitive(title, responseFilter)));
    }
  }, [filter, todos, responseFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                value={filter}
                response={responseFilter}
                setValue={setFilter}
                setResponse={setResponseFilter}
              />
            </div>

            <div className="block">
              {
                loading ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodoId={todoId}
                    selectTodo={setTodoId}
                  />
                )
              }
            </div>
          </div>
        </div>
      </div>
      {todoId && (
        <TodoModal
          todoId={todoId}
          selectedTodos={todos}
          selectedUser={setTodoId}
        />
      )}
    </>
  );
};
