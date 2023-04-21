import React, { useEffect, useMemo, useState } from 'react';
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
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isTodoOpened, setIsTodoOpened] = useState<boolean>(false);
  const [todoInfo, setTodoInfo] = useState<Todo | null>(null);
  const [openedTodoId, setOpenedTodoId] = useState<number | null>(null);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [filterOptionSelect, setFilterOptionSelect]
    = useState<FilterOption>(FilterOption.all);

  useEffect(() => {
    const loadTodos = async () => {
      const todos = await getTodos();

      setTodoList(todos);
    };

    loadTodos();
  }, []);

  const filterTodos = () => {
    switch (filterOptionSelect) {
      case FilterOption.active:
        return todoList.filter(todo => !todo.completed
          && todo.title.toLowerCase()
            .includes(filterQuery.toLowerCase()));

      case FilterOption.completed:
        return todoList.filter(todo => todo.completed
          && todo.title.toLowerCase()
            .includes(filterQuery.toLowerCase()));

      case FilterOption.all:
        return todoList.filter(todo => todo.title.toLowerCase()
          .includes(filterQuery.toLowerCase()));

      default:
        return todoList.filter(todo => todo.title.toLowerCase()
          .includes(filterQuery.toLowerCase()));
    }
  };

  const filteredTodos
  = useMemo(filterTodos, [filterOptionSelect, todoList, filterQuery]);

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
    setIsTodoOpened(true);
    setOpenedTodoId(todo.id);
    const user = await getUser(todo.userId);

    setSelectedUser(user);
    setTodoInfo({ ...todo });
  };

  const closeTodo = () => {
    setIsTodoOpened(false);
    setSelectedUser(null);
    setTodoInfo(null);
    setOpenedTodoId(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeSelect={
                  event => {
                    setFilterOptionSelect(event.target.value as FilterOption);
                  }
                }
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
                      visibleTodos={filteredTodos}
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

      {isTodoOpened && (
        <TodoModal
          selectedUser={selectedUser}
          onClick={closeTodo}
          todoInfo={todoInfo}
        />
      )}
    </>
  );
};
