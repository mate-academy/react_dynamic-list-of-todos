/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getActiveTodos, getcompletedTodos, getTodos, getUser } from './api';
import { Todo, FilterTypes } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [preparedTodos, setPreparedTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterTypes>(
    FilterTypes.All,
  );
  const [textInput, setTextInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [todoModalStatus, setTodoModalStatus] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [preparedUser, setPreparedUser] = useState<User | null>(null);

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

  useEffect(() => {
    let todos: Promise<Todo[]>;

    setIsLoading(true);

    if (FilterTypes.All === filterStatus) {
      todos = getTodos();
    } else if (FilterTypes.Active === filterStatus) {
      todos = getActiveTodos();
    } else if (FilterTypes.Completed === filterStatus) {
      todos = getcompletedTodos();
    }

    todos
      .then(data => {
        const filtered = data.filter(todo =>
          todo.title
            .toLowerCase()
            .trim()
            .includes(textInput.toLowerCase().trim()),
        );

        setPreparedTodos(filtered);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [filterStatus, textInput]);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    setPreparedUser(null);
    getUser(selectedTodo.userId).then(user => setPreparedUser(user));
  }, [selectedTodo]);

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
                  preparedTodos={preparedTodos}
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
        preparedUser={preparedUser}
      />
    </>
  );
};
