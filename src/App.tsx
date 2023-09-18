/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Select } from './types/Select';

function hasQueryContent(content: string, query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  return content.toLowerCase().includes(normalizedQuery);
}

function filterBySelection(todo: Todo, selectedOption: string) : boolean {
  if (!selectedOption || selectedOption === Select.All) {
    return true;
  }

  if (selectedOption === Select.Active) {
    return !todo.completed;
  }

  return todo.completed;
}

function filteredTodosByQuery(todos: Todo[], query: string, selectedOption: string) {
  if (!query && !selectedOption) {
    return todos;
  }

  return todos.filter((todo) => (
    hasQueryContent(todo.title, query)
    && filterBySelection(todo, selectedOption)
  ));
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState('');
  // const [selectedTodo, setSelectedTodo] = useState<Todo>(todos[0] ?? {});
  const [selectedTodo, setSelectedTodo] = useState<Todo>(todos[0] ?? {});
  const [showLoader, setShowLoader] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    getTodos().then((newTodos) => {
      setTodos(newTodos);
      setShowLoader(false);
    });
  }, []);

  const visibleTodos = filteredTodosByQuery(todos, query, selectedOption);

  const onClickHandlerOpenModal = (todo: Todo) => {
    setShowModal(true);
    setSelectedTodo(todo);
  };

  const onclickHandlerCloseModal = () => {
    setShowModal(false);
    setSelectedTodo({
      id: 0,
      title: '',
      completed: false,
      userId: 0,
    });
  };

  const filterCallBack = (newQuery: string) => {
    setQuery(newQuery);
  };

  const onChangeSelectOption = (newOption: string) => {
    setSelectedOption(newOption);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeQuery={filterCallBack}
                onChangeSelectOption={onChangeSelectOption}
                query={query}
              />
            </div>

            <div className="block">
              {showLoader && (
                <Loader />
              )}

              {!showLoader && (
                <TodoList
                  todos={visibleTodos}
                  onClickHandlerOpenModal={onClickHandlerOpenModal}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal === true && (
        <TodoModal
          onclickHandlerCloseModal={onclickHandlerCloseModal}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
