/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { useEffect } from 'react';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
//import { getUser } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState('all');
  const [query, setQuery] = useState('');
  const [todoId, setTodoId] = useState(0);
  const [todo, setTodo] = useState<Todo | null>(null);


  useEffect(() => {
    getTodos()
      .then(result => {
        setTodos(result);
        //setIsLoaded(true);
      });
  }, []);

  const includeCheck = (str: string) => (
    str.toLowerCase().includes(query.toLowerCase())
  );

  const filterTodos = todos
  .filter((todo) => {
    if (filterType === 'active') {
      return !todo.completed
    }
    if (filterType === 'completed') {
      return todo.completed
    }
    return todo;
  })
    .filter((todo) => includeCheck(todo.title));


  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
              filterType={filterType}
              setFilterType={setFilterType}
              query={query}
              setQuery={setQuery}
              />
            </div>

            <div className="block">
              {!filterTodos && <Loader />}

              <TodoList
                todos={filterTodos}
                selectedTodoId={todoId}
                selectTodo={(todoId) => setTodoId(todoId)}
              />
            </div>
          </div>
        </div>
      </div>
      
      {todo?.userId && (
      <TodoModal
      todo={todo}
      setTodo={setTodo}
      />)}
    </>
  );
};
