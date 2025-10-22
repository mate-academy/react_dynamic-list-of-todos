import React, { useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo, FilterTypes } from './types/Todo';
import { useFetch } from './hooks/useFetch';
import { preparedTodos } from './hooks/preparedTodos';

export const App: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<FilterTypes>(
    FilterTypes.All,
  );
  const [textInput, setTextInput] = useState('');
  const [todoModalStatus, setTodoModalStatus] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, isLoading] = useFetch<Todo[]>(getTodos);

  const filteredTodos = useMemo(() => {
    return todos ? preparedTodos(todos, filterStatus, textInput) : [];
  }, [todos, filterStatus, textInput]);

  const handleSelectFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value as FilterTypes);
  };

  const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value);
  };

  const handleRemoveFilter = () => {
    setFilterStatus(FilterTypes.All);
    setTextInput('');
  };

  const handleOpenModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setTodoModalStatus(true);
  };

  const handleCloseModal = () => {
    setTodoModalStatus(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleSelectFilter={handleSelectFilter}
                filterStatus={filterStatus}
                textInput={textInput}
                handleTextInput={handleTextInput}
                handleRemoveFilter={handleRemoveFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  filteredTodos={filteredTodos}
                  handleOpenModal={handleOpenModal}
                  todoModalStatus={todoModalStatus}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        todoModalStatus={todoModalStatus}
        handleCloseModal={handleCloseModal}
        selectedTodo={selectedTodo}
      />
    </>
  );
};
