/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

function prepareTodos(todosFromApi: Todo[], select: string, query: string) {
  let todos;

  switch (select) {
    case 'all':
      todos = todosFromApi;
      break;
    case 'active':
      todos = todosFromApi.filter(todo => !todo.completed);
      break;
    case 'completed':
      todos = todosFromApi.filter(todo => todo.completed);
      break;
    default:
      todos = todosFromApi;
      break;
  }

  if (query) {
    return todos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  } else {
    return todos;
  }
}

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [select, setSelect] = useState('all');
  const [query, setQuery] = useState('');
  const [modalTodoId, setModalTodoId] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(data => {
        const preparedList = prepareTodos(data, select, query);

        setTodoList(preparedList);
      })
      .finally(() => setIsLoading(false));
  }, [select, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                select={select}
                onSelect={setSelect}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todoList={todoList}
                modalTodoId={modalTodoId}
                setModalTodoId={setModalTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {modalTodoId && (
        <TodoModal modalTodoId={modalTodoId} setModalTodoId={setModalTodoId} />
      )}
    </>
  );
};
