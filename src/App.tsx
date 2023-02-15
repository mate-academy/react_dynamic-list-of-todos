/* eslint-disable max-len */
import React, {
  useEffect, useState, useCallback, Dispatch, SetStateAction, useMemo,
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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('all');
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

  const lowerQuery = appliedQuery.toLowerCase();

  function debounce(f: Dispatch<SetStateAction<string>>, delay: number) {
    let timerId = 0;

    return (value: string) => {
      if (timerId) {
        window.clearTimeout(timerId);
      }

      timerId = window.setTimeout(() => {
        f(value);
      }, delay);
    };
  }

  const applyQuery = useCallback(debounce(setAppliedQuery, 800), []);

  const getVisibleTodos = useMemo<Todo[]>(() => {
    let filteresTodos: Todo[] = todos;

    if (selectedOption === 'completed') {
      filteresTodos = filteresTodos.filter(todo => todo.completed);
    }

    if (selectedOption === 'active') {
      filteresTodos = filteresTodos.filter(todo => !todo.completed);
    }

    if (lowerQuery) {
      filteresTodos = filteresTodos.filter((todo) => (
        todo.title.toLowerCase().includes(lowerQuery)
      ));
    }

    return filteresTodos;
  }, [todos, lowerQuery, selectedOption]);

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
                applyQuery={applyQuery}
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

      { selectedTodo && <TodoModal selectedTodo={selectedTodo} clearSelectedTodo={clearSelectedTodo} />}
    </>
  );
};
