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
import { TodoStatus } from './TodoStatus';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isTodoloading, setIsTodoloading] = useState(false);
  const [filterByStatus, setFilterByStatus] = useState<TodoStatus>(
    TodoStatus.ALL,
  );
  const [searchByName, setSearchByName] = useState<string>('');
  const [selectedTodo, setSelectTodo] = useState<Todo | null>(null);
  const selectItem = (todo: Todo) => {
    setSelectTodo(todo);
  };

  const closeModal = () => {
    setSelectTodo(null);
  };

  useEffect(() => {
    setIsTodoloading(true);
    getTodos().then(todos => {
      setTodoList(todos);
      setIsTodoloading(false);
    });
  }, []);

  useEffect(() => {
    setIsTodoloading(true);
    getTodos()
      .then(todos => {
        if (filterByStatus === TodoStatus.ALL) {
          return todos;
        }

        return todos.filter(todo => {
          switch (filterByStatus) {
            case TodoStatus.ACTIVE:
              return todo.completed === false;
            case TodoStatus.COMPLETED:
              return todo.completed === true;
          }
        });
      })
      .then(todos => {
        if (searchByName.length == 0) {
          return todos;
        }

        return todos.filter(todo =>
          todo.title
            .toLocaleLowerCase()
            .includes(searchByName.toLocaleLowerCase()),
        );
      })
      .then(todos => {
        setTodoList(todos);
        setIsTodoloading(false);
      });
  }, [filterByStatus, searchByName]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedStatus={filterByStatus}
                onSelectStatus={newStatus => setFilterByStatus(newStatus)}
                searchValue={searchByName}
                onSearchValueChange={searchValue =>
                  setSearchByName(searchValue)
                }
                onSearchValueClear={() => setSearchByName('')}
              />
            </div>

            <div className="block">
              {isTodoloading ? (
                <Loader />
              ) : (
                <TodoList todoList={todoList} onSelect={selectItem} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onCloseModal={closeModal} />
      )}
    </>
  );
};
