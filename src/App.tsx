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
import { TodoStatus } from './TodoStatus';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [filterByStatus, setFilterByStatus] = useState<TodoStatus>(
    TodoStatus.ALL,
  );
  const [searchByName, setSearchByName] = useState<string>('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todosData, setTodosData] = useState<Todo[]>([]);

  useEffect(() => {
    setIsTodosLoading(true);
    getTodos().then(todos => {
      // eslint-disable-next-line no-console
      setTodosData(todos);
      setTodoList(todos);
      setIsTodosLoading(false);
    });
  }, []);

  useEffect(() => {
    let filteredTodos = todosData;

    if (filterByStatus !== TodoStatus.ALL) {
      filteredTodos = filteredTodos.filter(todo => {
        switch (filterByStatus) {
          case TodoStatus.ACTIVE:
            return todo.completed === false;
          case TodoStatus.COMPLETED:
            return todo.completed === true;
          default:
            return true;
        }
      });
    }

    if (searchByName.length > 0) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLocaleLowerCase().includes(searchByName.toLowerCase()),
      );
    }

    setTodoList(filteredTodos);
  }, [filterByStatus, searchByName, todosData]);

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
              {isTodosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todoList={todoList}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
