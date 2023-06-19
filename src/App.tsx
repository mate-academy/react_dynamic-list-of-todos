/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getVisibleTodos } from './api';
import { Todo } from './types/Todo';
import { TodoStatus } from './components/TodoStatus/TodoStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedValue, setSelectedValue] = useState(TodoStatus.All);
  const [query, setQuery] = useState('');
  const [todoModal, setTodoModal] = useState<Todo | null>(null);
  const [isModalButtonClicked, setIsModalButtonClicked] = useState(false);

  useEffect(() => {
    const fetchTodosFromAPI = async () => {
      try {
        setTodos(await getTodos());
      } catch (error) {
        throw new Error('Error fetching todos');
      }
    };

    fetchTodosFromAPI();
  }, []);

  const visibleTodos = getVisibleTodos(todos, selectedValue, query);

  const onSelectClick = (value: TodoStatus) => {
    setSelectedValue(value);
  };

  const onInputChange = (input: string) => {
    setQuery(input);
  };

  const onModalButtonClick = (todo: Todo) => {
    setIsModalButtonClicked(true);
    setTodoModal(todo);
  };

  const onCloseModalButtonClick = () => {
    setIsModalButtonClicked(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectClick={onSelectClick}
                onInputChange={onInputChange}
                query={query}
              />
            </div>

            <div className="block">
              {todos.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    onModalButtonClick={onModalButtonClick}
                    isModalButtonClicked={isModalButtonClicked}
                  />
                ) : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {isModalButtonClicked && (
        <TodoModal
          todoModal={todoModal}
          onCloseModalButtonClick={onCloseModalButtonClick}
        />
      )}
    </>
  );
};
