/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('all');
  const [query, setQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  function handleShowTodoModalClick(todoId: number) {
    setIsModalVisible(true);
    setSelectedTodoId(todoId);
  }

  function handleCloseTodoModalClick() {
    setIsModalVisible(false);
    setSelectedTodoId(0);
  }

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch((error) => {
        throw new Error(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos: Todo[] = useMemo(() => {
    const filteredByQuery = todos
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase().trim()));

    switch (selectedOption) {
      case 'active':
        return filteredByQuery.filter(todo => !todo.completed);

      case 'completed':
        return filteredByQuery.filter(todo => todo.completed);

      default:
        return filteredByQuery;
    }
  }, [todos, query, selectedOption]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectedOption={setSelectedOption}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading
                ? (<Loader />)
                : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodoId={selectedTodoId}
                    handleShowTodoModalClick={(todoId) => handleShowTodoModalClick(todoId)}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {isModalVisible && (
        <TodoModal
          todos={todos}
          selectedTodoId={selectedTodoId}
          handleCloseTodoModalClick={() => handleCloseTodoModalClick()}
        />
      )}

    </>
  );
};
