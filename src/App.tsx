/* eslint-disable max-len */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [title, setTitle] = useState('');
  const [id, setId] = useState<number[]>([]);
  const [filterTodos, setFilterTodos] = useState<Todo[]>([]);

  const handleMessageUpdate = (message: boolean) => {
    setIsModalOpened(message);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setFilterTodos={setFilterTodos} />
            </div>

            <div className="block">
              <TodoList
                message={handleMessageUpdate}
                setTitle={setTitle}
                setId={setId}
                filterTodos={filterTodos}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        isModalOpened={isModalOpened}
        message={handleMessageUpdate}
        title={title}
        id={id}
      />
    </>
  );
};
