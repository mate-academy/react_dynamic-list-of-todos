/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
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
  const [userTodo, setUserTodo] = useState<Todo>();
  const [isTodoModal, setIsTodoModal] = useState(false);
  const [selected, isSelected] = useState('all');
  const [searched, isSearched] = useState('');
  const isActiveModal = userTodo && isTodoModal;
  const [selectedTodo, setSelectedTodo] = useState(userTodo?.id || -1);

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => setTodos(todosFromServer));
  }, []);

  const changeState = (field: string, newValue: string) => {
    switch (field) {
      case 'select':
        isSelected(newValue);
        break;
      case 'input':
        isSearched(newValue);
        break;
      default:
        break;
    }
  };

  const todoFiltered = (status: string, words: string) => {
    if (selected === 'all' && !searched) {
      return todos;
    }

    return todos.filter((todo) => {
      switch (status) {
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        case 'all':
        default:
          return todo;
      }
    })
      .filter(
        (todo) => todo.title
          .toLowerCase()
          .includes(words
            .toLowerCase()),
      );
  };

  const choosingUser = (todoUser: Todo) => {
    setUserTodo(todoUser);
    setSelectedTodo(todoUser.id);
    setIsTodoModal(true);
  };

  const changeModalVisibility = (switcher: boolean) => {
    setIsTodoModal(switcher);
    setSelectedTodo(0);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                changeState={changeState}
                selected={selected}
                searched={searched}
              />
            </div>

            <div className="block">
              {(todos.length > 0)
                ? (
                  <TodoList
                    todos={todoFiltered(selected, searched)}
                    choosingUser={choosingUser}
                    choosingRow={selectedTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {isActiveModal && (
        <TodoModal
          userTodo={userTodo}
          removeModal={changeModalVisibility}
        />
      )}
    </>
  );
};
