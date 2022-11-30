/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [option, setOption] = useState('all');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [checkedTodo, setCheckedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then((data) => setTodos(data))
      .then(() => setLoading(false));
  }, [todos]);

  const filteredTodos = () => {
    const queryTodo = todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

    return queryTodo.filter(todo => {
      switch (option) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return todo;
      }
    });
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                option={option}
                setOption={setOption}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && (<Loader />)}
              <TodoList
                todos={filteredTodos()}
                checkedTodo={checkedTodo}
                onCheckedTodo={setCheckedTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {checkedTodo && (
        <TodoModal
          todo={checkedTodo}
          onClose={() => setCheckedTodo(null)}
        />
      )}
    </>
  );
};
