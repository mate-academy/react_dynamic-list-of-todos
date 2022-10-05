import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [setTodo, setAll] = useState('all');
  const [setTodoId, setTodoList] = useState<Todo | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const getVisibleTodos = todos.filter(todo => {
    const getVisible = todo.title.toLowerCase().includes(query.toLowerCase());

    if (setTodo === 'active') {
      return getVisible && todo.completed === false;
    }

    if (setTodo === 'completed') {
      return getVisible && todo.completed === true;
    }

    return getVisible;
  });

  getTodos().then(tod => {
    setTodos(tod);
    setIsLoaded(true);
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setAll={setAll}
                setTodo={setTodo}

              />
            </div>

            <div className="block">

              {isLoaded
                ? (
                  <TodoList
                    todos={getVisibleTodos}
                    setTodoList={setTodoList}
                    setTodoId={setTodoId}
                  />
                ) : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {setTodoId && (
        <TodoModal
          todo={setTodoId}
          setTodoList={setTodoList}
        />
      ) }

    </>
  );
};
