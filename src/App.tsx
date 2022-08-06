import React, { useState } from 'react';
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
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openedTodo, setOpenedTodo] = useState<boolean>(false);
  const [todoInfo, setTodoInfo] = useState<Todo | null>(null);
  const [openedTodoId, setOpenedTodoId] = useState<number | null>(null);
  const [filterOption, setFilterOption] = useState<boolean | null>(null);
  const [filterQuery, setFilterQuery] = useState<string>('');

  const loadTodos = async () => {
    const todos = await getTodos();

    setTodoList(todos);
  };

  const filterTodos = (option: React.ChangeEvent<HTMLSelectElement>) => {
    if (option.target.value === 'active') {
      setFilterOption(false);
    }

    if (option.target.value === 'completed') {
      setFilterOption(true);
    }

    if (option.target.value === 'all') {
      setFilterOption(null);
    }
  };

  const filterQueryTodos
    = (query: React.ChangeEvent<HTMLInputElement>) => {
      query.preventDefault();
      setFilterQuery(query.target.value);
    };

  const eraseQuery = () => {
    setFilterQuery('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const clickOnEye = async (todo: Todo) => {
    setOpenedTodo(true);
    setOpenedTodoId(todo.id);
    const user = await getUser(todo.userId);

    setSelectedUser(user);
    setTodoInfo({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      userId: todo.userId,
    });
  };

  const closeTodo = () => {
    setOpenedTodo(false);
    setSelectedUser(null);
    setTodoInfo(null);
    setOpenedTodoId(null);
  };

  loadTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeSelect={filterTodos}
                onChangeInput={filterQueryTodos}
                eraseQuery={eraseQuery}
                filterQuery={filterQuery}
                handleSubmit={handleSubmit}
              />
            </div>

            <div className="block">
              {
                todoList.length > 0
                  ? (
                    <TodoList
                      todoList={todoList}
                      openedTodoId={openedTodoId}
                      filterOption={filterOption}
                      filterQuery={filterQuery}
                      onClick={clickOnEye}
                    />
                  )
                  : <Loader />
              }
            </div>
          </div>
        </div>
      </div>

      {openedTodo && (
        <TodoModal
          selectedUser={selectedUser}
          onClick={closeTodo}
          openTodo={openedTodo}
          todoInfo={todoInfo}
        />
      )}
    </>
  );
};
