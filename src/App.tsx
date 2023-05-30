/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<number>(0);
  const [showTodoModal, setHideTodoModal] = useState(false);
  const [showTodo, setShowTodo] = useState(true);

  const [selectOption, setSelectOption] = useState('All');
  const [inputValue, setInputValue] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const filterByCompletion = (todos: Todo[], value: string, completed: boolean) => {
    const filteredTodos = todos.filter((todo: Todo) => todo.completed === completed);

    return !value
      ? filteredTodos
      : filteredTodos.filter((todo: Todo) => todo.title.includes(value.toLocaleLowerCase().trim()));
  };

  const filterTodo = () => {
    switch (selectOption) {
      case 'All':
        return !inputValue
          ? todos
          : todos?.filter((todo: Todo) => todo.title.includes(inputValue.toLocaleLowerCase().trim()));

      case 'active':
        return filterByCompletion(todos, inputValue, false);

      case 'completed':
        return filterByCompletion(todos, inputValue, true);

      default:
        return todos;
    }
  };

  const todoFilterList = filterTodo();
  // todos.filter(todo => todo.includes(inputValue.trim()));

  useEffect(() => {
    getTodos()
      .then(todo => {
        setTodos(todo);
        setShowTodo(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                inputValue={inputValue}
                setInputValue={setInputValue}
                selectOption={selectOption}
                setSelectOption={setSelectOption}
              />
            </div>

            <div className="block">
              {showTodo
                ? <Loader />
                : (
                  <TodoList
                    todos={todoFilterList}
                    setCurrentTodo={setCurrentTodo}
                    currentTodo={currentTodo}
                    setHideTodoModal={setHideTodoModal}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {showTodoModal
        && (
          <TodoModal
            setHideTodoModal={setHideTodoModal}
            resetTodo={setCurrentTodo}
            currentTodo={currentTodo}
            todos={todos}
          />
        )}
    </>
  );
};
