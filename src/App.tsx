/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectUserId, setSelectUserId] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>();
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('all');

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('try again later'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setSelectUserId(selectedTodo?.userId ?? null);
    setSelectedTodoId(selectedTodo?.id ?? null);
  }, [selectedTodo]);

  const filteredTodos = useMemo(() => {
    return todos
      .filter(todoForFillter => {
        if (selectValue === 'active') {
          return !todoForFillter.completed;
        } else if (selectValue === 'completed') {
          return todoForFillter.completed;
        } else {
          return true;
        }
      })
      .filter(todoForFillter =>
        todoForFillter.title.toLowerCase().includes(inputValue.toLowerCase()),
      );
  }, [todos, selectValue, inputValue]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onStatusChange={setSelectValue}
                onQueryChange={setInputValue}
                selectValue={selectValue}
                inputValue={inputValue}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {filteredTodos.length > 0 && !errorMessage && (
                <TodoList
                  selectedTodoId={selectedTodoId}
                  todos={filteredTodos}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectUserId != null && selectedTodo != undefined && (
        <TodoModal
          userId={selectUserId}
          setUserId={setSelectUserId}
          todo={selectedTodo}
          setSelectedTodoId={setSelectedTodoId}
        />
      )}
    </>
  );
};
