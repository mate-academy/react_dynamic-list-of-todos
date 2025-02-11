/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

function filterTodos(todos: Todo[], status: string, title: string): Todo[] {
  const normalizeTitleFilter = title.toLocaleLowerCase();
  let filteredTodos = todos.filter(todo => {
    const normalizeTodoTitle = todo.title.toLocaleLowerCase();

    return normalizeTodoTitle.includes(normalizeTitleFilter);
  });

  if (status === 'completed') {
    filteredTodos = filteredTodos.filter(todo => todo.completed === true);
  }

  if (status === 'active') {
    filteredTodos = filteredTodos.filter(todo => todo.completed === false);
  }

  return filteredTodos;
}

export const App: React.FC = () => {
  const [loadingTodos, setLoadingTodos] = useState(false);

  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [activeTodo, setActiveTodo] = useState<null | Todo>(null);

  const [selectValue, setSelectValue] = useState('all');
  const [inputValue, setInputValue] = useState('');

  const visibleTodos = filterTodos(todoList, selectValue, inputValue);

  useEffect(() => {
    setLoadingTodos(true);

    getTodos()
      .then(res => setTodoList(res))
      .catch(() => {
        throw new Error('Failed to get a server response');
      })
      .finally(() => setLoadingTodos(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectValue={selectValue}
                inputValue={inputValue}
                onSelectValue={v => setSelectValue(v)}
                onInputValue={v => setInputValue(v)}
              />
            </div>

            <div className="block">
              {loadingTodos && <Loader />}
              {visibleTodos.length > 0 && (
                <TodoList
                  todoList={visibleTodos}
                  activeTodo={activeTodo}
                  onChangeActiveTodo={todo => setActiveTodo(todo)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal
          activeTodo={activeTodo}
          onCloseTodoCard={() => setActiveTodo(null)}
        />
      )}
    </>
  );
};
