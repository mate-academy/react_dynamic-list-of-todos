/* eslint-disable max-len */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useEffect, useMemo, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Status } from './types/Filtered';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filteredStatus, setFilteredStatus] = useState<Status>(Status.All);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => {
        throw new Error('Failed to load users');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const filteredItems: Todo[] = useMemo(() => {
    const todosCopy = [...todos];

    if (title) {
      return todosCopy.filter((todo) => todo
        .title.toLowerCase().includes(title.toLowerCase()));
    }

    switch (filteredStatus) {
      case Status.Active:
        return todosCopy.filter((todo) => !todo.completed);
      case Status.Completed:
        return todosCopy.filter((todo) => todo.completed);
      default:
        return todosCopy;
    }
  }, [todos, title, filteredStatus]);

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
                setFilteredStatus={setFilteredStatus}
              />
            </div>

            <div className="block">
              {isLoading && <Loader /> }
              {!isLoading
              && <TodoList filteredItems={filteredItems} setSelectedTodo={setSelectedTodo}/>}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />
      )}
    </>
  );
};
