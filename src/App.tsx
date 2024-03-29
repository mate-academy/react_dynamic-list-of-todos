/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './services/todo';
import { Todo } from './types/Todo';

function getFilteredTodos(todos: Todo[], query: string, queryInput: string) {
  const lowerCaseQueryInput = queryInput.toLowerCase();
  const preparedTodos = todos.filter(todo => {
    if (query === 'active') {
      return todo.completed === false;
    } else if (query === 'completed') {
      return todo.completed === true;
    } else {
      return todos;
    }
  });

  let readyTodos;

  if (queryInput !== '') {
    readyTodos = preparedTodos.filter(readyTodo =>
      readyTodo.title.toLowerCase().includes(lowerCaseQueryInput),
    );

    return readyTodos;
  }

  return preparedTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectChecked, setSelectChecked] = useState('all');
  const [textInput, setTextInput] = useState('');
  const [checkedTodo, setCheckedTodo] = useState<Todo | null>(null);
  const [clickedTodos, setClickedTodos] = useState<number[]>([]);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const isTodoClicked = (todoId: number) => {
    return clickedTodos.includes(todoId);
  };

  const toggleTodoClicked = (todoId: number) => {
    if (isTodoClicked(todoId)) {
      setClickedTodos(prev => prev.filter(id => id !== todoId));
    } else {
      setClickedTodos(prev => [...prev, todoId]);
    }
  };

  const resetTodoClickedState = () => {
    setClickedTodos([]);
  };

  const visibleTodos = getFilteredTodos(todos, selectChecked, textInput);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                checkedQuery={setSelectChecked}
                textInput={textInput}
                instTextInput={setTextInput}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              <TodoList
                todos={visibleTodos}
                checkedTodo={setCheckedTodo}
                isTodoClicked={isTodoClicked}
                toggleTodoClicked={toggleTodoClicked}
              />
            </div>
          </div>
        </div>
      </div>

      {checkedTodo !== null && (
        <TodoModal
          checkedTodo={checkedTodo}
          closeModal={setCheckedTodo}
          resetTodoClickedState={resetTodoClickedState}
        />
      )}
    </>
  );
};
