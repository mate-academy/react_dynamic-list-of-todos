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
import { Status, StatusMap } from './types/Status';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState<Status>(StatusMap.All);
  const [search, setSearch] = useState('');

  const completed = status === StatusMap.Completed;

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodoList)
      .finally(() => setLoading(false));
  }, []);

  function getCheckStatus(todo: Todo): boolean {
    if (status === StatusMap.All) {
      return true;
    }

    return todo.completed === completed;
  }

  function getCheckSearch(todo: Todo): boolean {
    const textSearch = search.trim().toLocaleLowerCase();

    return todo.title.toLocaleLowerCase().includes(textSearch);
  }

  const todoListFiltered = todoList.filter(todo => {
    const checkStatus = getCheckStatus(todo);
    const checkSearch = getCheckSearch(todo);

    return checkStatus && checkSearch;
  });

  function handlerSelectTodo(id: Todo['id']) {
    const todo = todoList.find(item => item.id === id);

    setSelectedTodo(todo ?? null);
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                onChangeStatus={setStatus}
                search={search}
                onChangeSearch={setSearch}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todoList={todoListFiltered}
                  selectedTodoId={selectedTodo?.id ?? null}
                  onSelectTodo={handlerSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
