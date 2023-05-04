/* eslint-disable max-len */
import React, {
  ChangeEvent, useEffect, useState, useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { SelectValue } from './types/SelectValues';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState(SelectValue.All);
  const [modal, setModal] = useState<boolean>(false);
  const [todoId, setTodoId] = useState<number>(0);
  const [todoSelected, setTodoSelected] = useState<Todo>();

  const filterSelectedTodos = () => {
    switch (selectedValue) {
      case SelectValue.Completed:
        return todos.filter((todo) => todo.completed);
      case SelectValue.Active:
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  };

  const todosFilter = (todosFromServer: Todo[], query: string) => {
    const queryLower = query.toLowerCase().trim();

    if (queryLower === '') {
      return todosFromServer;
    }

    return todosFromServer.filter((todo:Todo) => todo.title
      .toLowerCase()
      .includes(queryLower));
  };

  const visibleTodos = useMemo(() => {
    return todosFilter(filterSelectedTodos(), searchQuery);
  }, [todos, searchQuery, selectedValue]);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value as SelectValue);
  };

  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const resetModal = () => {
    setModal(false);
    setTodoId(0);
  };

  const handleModal = (todo: Todo) => () => {
    setModal(true);
    setTodoId(todo.id);
    setTodoSelected(todo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedValue={selectedValue}
                searchQuery={searchQuery}
                onChangeQuery={handleSearchQuery}
                onChangeSelect={handleSelectChange}
                clearSearch={handleClearSearch}
              />
            </div>

            <div className="block">
              {!todos.length && (
                <Loader />
              )}
              <TodoList
                todos={visibleTodos}
                handleModal={handleModal}
                todoId={todoId}
              />
            </div>
          </div>
        </div>
      </div>

      {modal && todoSelected && (
        <TodoModal todoSelected={todoSelected} resetModal={resetModal} />
      )}
    </>
  );
};
