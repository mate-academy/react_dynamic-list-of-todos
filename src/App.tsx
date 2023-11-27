/* eslint-disable max-len */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useEffect, useMemo, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
// import { Status } from './types/Filtered';
// import { User } from './types/User';
// import { TodoModal } from './components/TodoModal';
// import { Loader } from './components/Loader';

export const App: React.FC = () => {
  // const [users, setUsers] = useState<User[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  // const [filterStatus, setFilterStatus] = useState<Status>(Status.All);

  // const visibleTodos = useMemo(() => {
  //   switch (filterStatus) {
  //     case Status.Active:
  //       return todos.filter((todo) => todo.status !== Status.Completed);
  //     case Status.Completed:
  //       return todos.filter((todo) => todo.status === Status.Completed);
  //     default:
  //       return todos;
  //   }
  // }, [todos, filterStatus]);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      });
  }, []);
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const filteredItems = useMemo(() => todos.filter(todo => todo
    .title.toLowerCase().includes(title.toLowerCase())), [title, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                title={title}
                setTitle={setTitle}
                handleChangeInput={handleChangeInput}
              />
            </div>

            <div className="block">
              {/* <Loader /> */}
              <TodoList filteredItems={filteredItems} />
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
