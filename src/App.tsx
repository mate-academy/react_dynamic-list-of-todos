/* eslint-disable max-len */
import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './app.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { TodoContext } from './components/TodoContext/TodoContext';

export const App: React.FC = () => {
  const {
    activeTodo,
    setActiveTodo,
    query,
    filter,
  } = useContext(TodoContext);

  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      getTodos()
        .then(setTodos)
        .finally(() => {
          setLoading(false);
        });
    }, 500);
  }, []);

  const filteredItems = useMemo(() => {
    let todosCopy = [...todos];

    if (query) {
      todosCopy = todosCopy
        .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    switch (filter) {
      case Filter.Active:
        todosCopy = todosCopy.filter(todo => !todo.completed);
        break;
      case Filter.Completed:
        todosCopy = todosCopy.filter(todo => todo.completed);
        break;
      case Filter.All:
      default:
        break;
    }

    return todosCopy;
  }, [todos, query, filter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">

              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredItems}
                />
              )}

            </div>
          </div>
        </div>
      </div>

      {activeTodo && <TodoModal activeTodo={activeTodo} setActiveTodo={setActiveTodo} />}
    </>

  );
};
