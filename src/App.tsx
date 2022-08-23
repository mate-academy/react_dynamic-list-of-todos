/* eslint-disable max-len */
import {
  FC, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [openedTodoModal, setOpenedTodoModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [optionForFilter, setOptionForFilter] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer));
    setLoading(false);
  }, []);

  const filteredTodosByQuery = todos.filter(todo => {
    const prepTitle = todo.title.toLowerCase();
    const prepQuery = query.toLowerCase();

    return prepTitle.includes(prepQuery);
  });

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (optionForFilter) {
        case 'all':
          return filteredTodosByQuery;
        case 'active':
          return filteredTodosByQuery && todo.completed === false;
        case 'completed':
          return filteredTodosByQuery && todo.completed;
        default:
          return true;
      }
    });
  }, [optionForFilter, query, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                optionForFilter={optionForFilter}
                setOptionForFilter={setOptionForFilter}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    setSelectedTodo={setSelectedTodo}
                    setOpenedTodoModal={setOpenedTodoModal}
                    openedTodoModal={openedTodoModal}
                    setLoading={setLoading}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {openedTodoModal && (
        <TodoModal
          loading={loading}
          selectedTodo={selectedTodo}
          setOpenedTodoModal={setOpenedTodoModal}
          setLoading={setLoading}
        />
      )}
    </>
  );
};
