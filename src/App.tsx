import React, { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { FilterOption } from './types/FilterOption';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openedTodo, setOpenedTodo] = useState<boolean>(false);
  const [todoInfo, setTodoInfo] = useState<Todo | null>(null);
  const [openedTodoId, setOpenedTodoId] = useState<number | null>(null);
  const [filterQuery, setFilterQuery] = useState<string>('');

  useEffect(() => {
    const loadTodos = async () => {
      const todos = await getTodos();

      setTodoList(todos);
      setFilteredTodos(todos);
    };

    loadTodos();
  }, []);

  const filterTodos = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case FilterOption.active:
        setFilteredTodos(todoList.filter(todo => todo.completed === false));

        break;

      case FilterOption.completed:
        setFilteredTodos(todoList.filter(todo => todo.completed === true));

        break;

      case FilterOption.all:
        setFilteredTodos(todoList);

        break;

      default:
        setFilteredTodos(todoList);

        break;
    }
  };

  const filterQueryTodos
    = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setFilterQuery(event.target.value);
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
    setTodoInfo({ ...todo });
  };

  const closeTodo = () => {
    setOpenedTodo(false);
    setSelectedUser(null);
    setTodoInfo(null);
    setOpenedTodoId(null);
  };

  const visibleTodos = filteredTodos.filter(todo => todo.title.toLowerCase()
    .includes(filterQuery.toLowerCase()));

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
                      visibleTodos={visibleTodos}
                      openedTodoId={openedTodoId}
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
          todoInfo={todoInfo}
        />
      )}
    </>
  );
};
