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
  const [todo, setTodo] = useState<Todo | undefined>(undefined);
  const [filterTodo, setFilterTodo] = useState('all');
  const [loader, setLoader] = useState(false);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then(response => {
        setTodos(response);
        setLoader(false);
      });
  }, []);

  const filterTodos = todos.filter(item => {
    if (filterTodo === 'active') {
      return !item.completed;
    }

    if (filterTodo === 'completed') {
      return item.completed;
    }

    return true;
  }).filter(todoElem => (
    todoElem.title.toLowerCase().includes(query.toLowerCase())
  ));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterTodo={filterTodo}
                setFilterTodo={setFilterTodo}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {!loader
                ? (
                  <TodoList
                    todos={filterTodos}
                    selectedTodo={todo}
                    setSelectedTodo={setTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {todo?.userId && (
        <TodoModal
          todo={todo}
          setTodo={setTodo}
        />
      )}
    </>
  );
};
