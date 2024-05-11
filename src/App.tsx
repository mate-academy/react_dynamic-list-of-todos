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
import {
  FILTER_FIELD_ACTIVE,
  FILTER_FIELD_ALL,
  FILTER_FIELD_COMPLETED,
} from './tools/constants';

// const prepareTodos = (todos: Todo[], title: string, filterField: string) => {
//   const readyTodos = [...todos];

//   if (title !== '') {
//     return readyTodos.filter((todo: Todo) =>
//       todo.title.toLowerCase().includes(title.toLowerCase()),
//     );
//   }

//   if (filterField) {
//     switch (filterField) {
//       case FILTER_FIELD_ALL:
//         return readyTodos;

//       case FILTER_FIELD_ACTIVE:
//         return readyTodos.filter(todo => !todo.completed);

//       case FILTER_FIELD_COMPLETED:
//         return readyTodos.filter(todo => todo.completed);

//       default:
//         return readyTodos;
//     }
//   }

//   return readyTodos;
// };

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [filterField, setFilterField] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(readyTodos => {
        return readyTodos.filter((todo: Todo) =>
          todo.title.toLowerCase().includes(title.toLowerCase()),
        );
      })
      .then(readyTodos => {
        switch (filterField) {
          case FILTER_FIELD_ALL:
            return readyTodos;

          case FILTER_FIELD_ACTIVE:
            return readyTodos.filter(todo => !todo.completed);

          case FILTER_FIELD_COMPLETED:
            return readyTodos.filter(todo => todo.completed);

          default:
            return readyTodos;
        }
      })
      .then(setTodos)
      .finally(() => setLoading(false));
  }, [title, filterField]);

  // const readyTodos = prepareTodos(todos, title, filterField);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                title={title}
                setFilterField={setFilterField}
                setTitle={setTitle}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              <TodoList
                todos={todos}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
