/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';

import { User } from './types/User';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isListLoaded, setIsListLoaded] = useState(false);
  const [filterBy, setFilterBy] = useState('all');
  const [inputFilter, setInputFilter] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(0);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    phone: '',
  });
  const [isModalLoaded, setIsModalLoaded] = useState(false);

  useEffect(() => {
    if (selectedTodo !== 0) {
      getUser(selectedTodo)
        .then(user => {
          setSelectedUser(user);
          setIsModalLoaded(true);
        });
    }
  }, [selectedTodo]);

  useEffect(() => {
    getTodos()
      // eslint-disable-next-line consistent-return
      .then((todos: Todo[]) => {
        setTodoList(todos);
        setIsListLoaded(true);
      });
  }, []);

  const filteredTodos: Todo[] = useMemo(() => {
    let resultArr = [...todoList];

    switch (filterBy) {
      case 'all':
        resultArr = todoList;
        break;

      case 'active':
        resultArr = todoList.filter((todo: Todo) => !todo.completed);
        break;

      case 'completed':
        resultArr = todoList.filter((todo: Todo) => todo.completed);
        break;

      default:
        break;
    }

    if (inputFilter) {
      resultArr = resultArr.filter(todo => {
        return todo.title.toLowerCase().includes(inputFilter.toLowerCase());
      });
    }

    return resultArr;
  }, [inputFilter, filterBy, todoList]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                inputFilter={inputFilter}
                setInputFilter={setInputFilter}
              />
            </div>

            <div className="block">
              {!isListLoaded && <Loader />}
              {isListLoaded
              && (
                <TodoList
                  todoList={isListLoaded && filteredTodos}
                  setSelectedTodo={setSelectedTodo}
                  setSelectedTodoId={setSelectedTodoId}
                  selectedTodoId={selectedTodoId}
                />
              )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo > 0
        && (
          <TodoModal
            selectedUser={selectedUser}
            isModalLoaded={isModalLoaded}
            setSelectedTodo={setSelectedTodo}
            setSelectedUser={setSelectedUser}
            setIsModalLoaded={setIsModalLoaded}
            todoList={todoList}
            selectedTodoId={selectedTodoId}
            setSelectedTodoId={setSelectedTodoId}
          />
        ) }
    </>
  );
};
