import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [todo, setTodo] = useState<Todo>(todos[0]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);

  async function loadTodos() {
    const todosServer = await getTodos();

    setTodos(todosServer);
    setVisibleTodos(todosServer);
  }

  useEffect(() => {
    loadTodos();
  }, []);

  const showTodo = (clickedTodo: Todo) => {
    setTodo(clickedTodo);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const filterTodos = (selectValue: string, inputValue: string) => {
    let filterValues = todos;

    switch (selectValue) {
      case 'active':
        filterValues = filterValues.filter(toDo => !toDo.completed);
        break;

      case 'completed':
        filterValues = filterValues.filter(toDo => toDo.completed);
        break;

      default:
        break;
    }

    filterValues = filterValues.filter(toDo => (
      toDo.title.toLowerCase().includes(inputValue.toLowerCase())));

    setVisibleTodos(filterValues);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterTodos={filterTodos}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList
                todos={visibleTodos}
                showTodo={showTodo}
                showModal={showModal}
              />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TodoModal todo={todo} closeModal={closeModal} />
      )}
    </>
  );
};
