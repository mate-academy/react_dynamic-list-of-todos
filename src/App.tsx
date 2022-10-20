/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const Values = {
    All: 'all',
    Active: 'active',
    Completed: 'completed',
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedValue, setSelect] = useState(Values.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    (async () => {
      const todosLoaded = await getTodos();

      setLoading(false);
      setTodos(todosLoaded);
    })();
  }, []);

  const includesQuery = (text:string) => {
    return text.toLowerCase().includes(query.toLowerCase());
  };

  const getVisibleTodos = () => {
    return [...todos].filter((todo) => {
      switch (selectedValue) {
        case Values.Completed:
          return todo.completed && includesQuery(todo.title);
        case Values.Active:
          return !todo.completed && includesQuery(todo.title);
        default:
          return includesQuery(todo.title);
      }
    });
  };

  const visibleTodos = useMemo(
    getVisibleTodos,
    [query, selectedValue],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedValue={selectedValue}
                onSelection={(option:string) => setSelect(option)}
                query={query}
                onQuery={(text:string) => setQuery(text)}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodo={selectedTodo}
                selectTodo={(todo:Todo | null) => setSelectedTodo(todo)}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} onCloseModal={(todo:Todo | null) => setSelectedTodo(todo)} />}
    </>
  );
};
