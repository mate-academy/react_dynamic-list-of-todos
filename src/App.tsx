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

const todosFilter = (todos: Todo[], filter: string) => {
  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.completed);

    case 'completed':
      return todos.filter((todo) => todo.completed);

    default:
      return todos;
  }
};

const todoFinder = (todos: Todo[], todoId: number) => {
  return todos.find((todo) => todo.id === todoId) || null;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [modalTodoId, setModalTodoId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then((data) => {
        setTodos(data);
        setVisibleTodos(data);
      });
  }, []);

  const handleSelectFilter = (filterValue: string) => {
    setFilter(filterValue);
    setVisibleTodos(todosFilter(todos, filterValue));
  };

  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
    setVisibleTodos(
      todosFilter(
        todos.filter((toDo) => {
          const lowerSearchValue = searchValue.toLowerCase().trim();
          const lowerTitle = toDo.title.toLowerCase();

          return (lowerTitle.includes(lowerSearchValue));
        }),
        filter,
      ),
    );
  };

  const handleClearSearch = () => {
    const filteredTodos = todosFilter(todos, filter);

    setSearch('');
    setVisibleTodos(filteredTodos);
  };

  const handleOpenModal = (todoId: number) => {
    const foundTodo = todoFinder(visibleTodos, todoId);

    setModalTodoId(todoId);
    setTodo(foundTodo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectFilter={handleSelectFilter}
                onChangeSearch={handleSearch}
                onClearSearch={handleClearSearch}
                search={search}
                filter={filter}
              />
            </div>

            <div className="block">
              {!visibleTodos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    todoModalId={modalTodoId}
                    onOpenModal={handleOpenModal}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {modalTodoId && (
        <TodoModal
          todo={todo}
          todoId={modalTodoId}
          setModalTodoId={setModalTodoId}
        />
      )}
    </>
  );
};
