/* eslint-disable max-len */
import React, {
  useEffect, useState, useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Options } from './types/Options';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>(Options.ALL);
  const [appliedQuery, setAppliedQuery] = useState<string>('');
  const [hasRequestError, setHasRequestError] = useState<boolean>(false);

  const loadTodos = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setHasRequestError(false);
    } catch (error) {
      setHasRequestError(true);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const clearSelectedTodo = () => {
    setSelectedTodo(null);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
  };

  const getVisibleTodos = useMemo<Todo[]>(() => {
    let filteresTodos: Todo[] = todos;

    if (selectedOption === Options.COMPLETED) {
      filteresTodos = filteresTodos.filter(todo => todo.completed);
    }

    if (selectedOption === Options.ACTIVE) {
      filteresTodos = filteresTodos.filter(todo => !todo.completed);
    }

    if (appliedQuery) {
      filteresTodos = filteresTodos.filter((todo) => (
        todo.title.toLowerCase().includes(appliedQuery.toLowerCase())
      ));
    }

    return filteresTodos;
  }, [todos, appliedQuery, selectedOption]);

  if (hasRequestError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectOption={selectOption}
                appliedQuery={appliedQuery}
                setAppliedQuery={setAppliedQuery}
              />
            </div>

            { !todos.length
              ? <Loader />
              : (
                <div className="block">
                  <TodoList
                    todos={getVisibleTodos}
                    setSelectedTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                </div>
              )}
          </div>
        </div>
      </div>

      {selectedTodo
      && (
        <TodoModal
          selectedTodo={selectedTodo}
          setHasRequestError={setHasRequestError}
          clearSelectedTodo={clearSelectedTodo}
        />
      )}
    </>
  );
};
