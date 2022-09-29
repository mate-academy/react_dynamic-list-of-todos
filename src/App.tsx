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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [todoId, setTodoId] = useState(0);
  const [filter, setFilter] = useState('all');
  const [responseFilter, setResponseFilter] = useState('');

  useEffect(() => {
    getTodos()
      .then((response) => {
        setTodos(response);
        setLoading(false);
      });
  }, []);

  const filteredTodos = todos.filter(todoItem => {
    if (filter === 'completed') {
      return todoItem.completed;
    }

    if (filter === 'active') {
      return !todoItem.completed;
    }

    return true;
  });

  const visibleTodos = filteredTodos.filter(todoItem => {
    return todoItem.title.toLowerCase().includes(responseFilter.toLowerCase());
  });

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
                    todos={visibleTodos}
                    selectedTodoId={todoId}
                    selectTodo={(todo) => setTodoId(todo)}
                  />
                )
              }
            </div>
          </div>
        </div>
      </div>
      {todoId && (
        <TodoModal
          userId={todoId}
          selectedTodoId={visibleTodos}
          selectedTodo={(todo) => setTodoId(todo)}
        />
      )}
    </>
  );
};
