/* eslint-disable max-len */
import React, {
  ChangeEvent,
  useEffect,
  useState,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [searchInput, setSearchInput] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>(Filter.ALL);

  const [selectedButtonId, setSelectedButtonId] = useState(0);

  const loadTodos = async () => {
    const loadedTodos = await getTodos();

    setTodos(loadedTodos);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => (
    todos.filter(prevTodo => {
      const isTitleContainInput = prevTodo.title.toLocaleLowerCase()
        .includes(searchInput.toLocaleLowerCase());

      if (selectedStatus === 'active' && isTitleContainInput) {
        return !prevTodo.completed;
      }

      if (selectedStatus === 'completed' && isTitleContainInput) {
        return prevTodo.completed;
      }

      return isTitleContainInput;
    })
  ), [todos, selectedStatus, searchInput]);

  const handleChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchInput(value);
  };

  const onStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedStatus(value);
  };

  const handleRemoveSearchInput = () => setSearchInput('');

  const handleSelectButtonClick = (id: number) => setSelectedButtonId(id);

  const handleCloseModal = () => setSelectedButtonId(0);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchInput={searchInput}
                selectedStatus={selectedStatus}
                handleChangeSearchInput={handleChangeSearchInput}
                handleRemoveSearchInput={handleRemoveSearchInput}
                onStatusChange={onStatusChange}
              />
            </div>

            <div className="block">
              {
                todos.length === 0
                  ? <Loader />
                  : (
                    <TodoList
                      visibleTodos={visibleTodos}
                      handleSelectButtonClick={handleSelectButtonClick}
                      selectedButtonId={selectedButtonId}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>

      {
        selectedButtonId > 0
        && (
          <TodoModal
            selectedButtonId={selectedButtonId}
            todos={todos}
            handleCloseModal={handleCloseModal}
          />
        )
      }
    </>
  );
};
