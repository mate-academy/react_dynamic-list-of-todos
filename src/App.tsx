import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, isContains } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState<Todo>(todos[0]);
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [query, setQuery] = useState('');
  const [selectValue, setSelectValue] = useState('all');

  async function loadTodos() {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
  }

  useEffect(() => {
    loadTodos();
  }, []);

  let visibleTodos = query ? (
    todos.filter(todo => isContains(todo.title, query))
  ) : (
    todos
  );

  switch (selectValue) {
    case 'active':
      visibleTodos = visibleTodos.filter(todo => (
        todo.completed === false
      ));
      break;

    case 'completed':
      visibleTodos = visibleTodos.filter(todo => (
        todo.completed === true
      ));
      break;

    default:
      break;
  }

  const handleShowTodoModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    const todoId = Number(event.currentTarget.dataset.todoid);
    const todo = todos.find(todoa => todoa.id === todoId) as Todo;

    setSelectedTodo(todo);
    setSelectedTodoId(todoId);
    setShowTodoModal(true);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                selectValue={selectValue}
                setSelectValue={setSelectValue}
              />
            </div>

            <div className="block">
              {!todos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  handleShowTodoModal={handleShowTodoModal}
                  selectedTodoId={selectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showTodoModal
        && (
          <TodoModal
            todo={selectedTodo}
            todoId={selectedTodoId}
            showTodoModal={setShowTodoModal}
            resetTodoId={setSelectedTodoId}
          />
        )}
    </>
  );
};
