/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userId, setUserId] = useState<number>(0);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const newModel = (newTodo: Todo) => {
    setUserId(newTodo.userId);

    return setSelectedTodo(newTodo);
  };

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(error => {
        throw new Error(error);
      });
  }, []);

  const reset = () => {
    setUserId(0);
    setSelectedTodo(null);
  };

  const filteredTodosByOption = useMemo(() => {
    return todos.filter((todoToFilter) => {
      switch (filter) {
        case 'all':
          return true;

        case 'active':
          return !todoToFilter.completed;

        case 'completed':
          return todoToFilter.completed;

        default:
          return true;
      }
    });
  }, [filter, todos]);

  const filterQuery = filteredTodosByOption.filter(todoQuery => {
    if (query) {
      return todoQuery.title.toLowerCase().includes(query);
    }

    return true;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filter={setFilter} query={setQuery} />
            </div>

            <div className="block">
              {todos.length
                ? <TodoList todos={filterQuery} toSelect={newModel} selected={selectedTodo?.id} />
                : <Loader /> }
            </div>
          </div>
        </div>
      </div>

      { (userId && selectedTodo) && <TodoModal userId={userId} todo={selectedTodo} reset={reset} />}
    </>
  );
};
