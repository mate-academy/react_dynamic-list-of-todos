/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilterMode } from './types/FilterMode';
import { TodoModalInfo } from './types/TodoModalInfo';
import { User } from './types/User';
import { getTodos, getUser } from './api';

let fetchedTodos: Todo[] = [];
const initialModalInfo: TodoModalInfo = {
  todoId: 0,
  todoTitle: '',
  todoCompleted: false,
  userEmail: '',
  userName: '',
  showModalLoader: true,
};

export const App: React.FC = () => {
  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>([]);
  const [todosLoaded, setTodosLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState<TodoModalInfo>(initialModalInfo);
  const [clickedTodoId, setClickedTodoId] = useState(0);

  const displayTodos = (mode: FilterMode, query: string) => {
    const modeActive = mode === FilterMode.active;
    const modeCompleted = mode === FilterMode.completed;

    let todos = fetchedTodos;

    if (modeActive || modeCompleted) {
      todos = todos.filter(todo => (modeCompleted ? todo.completed : !todo.completed));
    }

    if (query !== '') {
      todos = todos.filter(
        todo => todo.title.includes(query.trim().toLocaleLowerCase()),
      );
    }

    setDisplayedTodos(todos);
  };

  const onEyeButtonClick = (todoId: number) => {
    setShowModal(true);
    setClickedTodoId(todoId);

    const modalTodo = displayedTodos.find(todo => todo.id === todoId);

    if (modalTodo) {
      getUser(modalTodo?.userId)
        .then((user: User) => {
          setModalInfo({
            todoId,
            todoTitle: modalTodo?.title,
            todoCompleted: modalTodo.completed,
            userEmail: user.email,
            userName: user.name,
            showModalLoader: false,
          });
        });
    }
  };

  const onModalClose = () => {
    setShowModal(false);
    setModalInfo((oldInfo) => ({
      ...oldInfo,
      showModalLoader: true,
    }));
    setClickedTodoId(0);
  };

  useEffect(() => {
    getTodos()
      .then(extracted => {
        fetchedTodos = extracted;
        setDisplayedTodos(fetchedTodos);
        setTodosLoaded(true);

        return extracted;
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter getTodos={displayTodos} />
            </div>

            <div className="block">
              {!todosLoaded && <Loader />}
              <TodoList
                todos={displayedTodos}
                onEyeButtonClick={onEyeButtonClick}
                clickedTodoId={clickedTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TodoModal
          info={modalInfo}
          onModalClose={onModalClose}
        />
      )}
    </>
  );
};
