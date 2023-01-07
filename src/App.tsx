/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Filter } from './types/Filter';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [option, setOption] = useState<string>(Filter.All);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [checkedTodo, setCheckedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then((data) => setTodos(data))
      .then(() => setLoading(false));
  }, []);

  const filteredTodos = () => {
    const queryTodo = todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

    return queryTodo.filter(todo => {
      switch (option) {
        case Filter.Active:
          return !todo.completed;

        case Filter.Completed:
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
