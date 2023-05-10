/* eslint-disable max-len */
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [load, setLoad] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectValue, setSelectValue] = useState('all');
  const [inputValue, setInputValue] = useState('');

  let visibleTodos = useMemo(() => {
    return [...todos];
  }, [todos]);

  if (inputValue) {
    visibleTodos = visibleTodos.filter(todo => todo.title.toLowerCase().includes(inputValue));
  }

  if (selectValue === 'active') {
    visibleTodos = visibleTodos.filter(todo => !todo.completed);
  }

  if (selectValue === 'completed') {
    visibleTodos = visibleTodos.filter(todo => todo.completed);
  }

  useEffect(
    () => {
      getTodos()
        .then(setTodos)
        .finally(() => setLoad(false))
        .catch(error => {
          throw new Error(`${error} Error`);
        });
    },
    [],
  );

  const openModal = useCallback((todo: Todo) => (
    setSelectedTodo(todo)), []);
  const closeModal = useCallback(() => setSelectedTodo(null), []);
  const onSelectChange = useCallback((value: string) => setSelectValue(value), []);
  const onInputChange = useCallback((input: string) => {
    setInputValue(input.toLowerCase());
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectChange={onSelectChange}
                onInputChange={onInputChange}
              />
            </div>

            <div className="block">
              { load ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  userId={selectedTodo?.id || null}
                  selectedTodo={openModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal
          todo={selectedTodo}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
