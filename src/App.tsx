/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import lodash from 'lodash';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [checkedTodo, setCheckedTodo] = useState<boolean>(false);
  const [selectFilter, setSelectFilter] = useState<string>('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function retrieveTodos() {
      const res = await getTodos();

      const unq = lodash.uniqBy(res, 'title');

      setTodos(unq.filter((item:Todo) => item.title.length > 2 && item.userId >= 2));
      setLoading(false);
    }

    retrieveTodos();
  }, []);

  const applyQuery = useCallback(
    lodash.debounce(setAppliedQuery, 1000), [],
  );

  const resetInputValue = () => {
    setAppliedQuery('');
  };

  const chooseTodo = (ToDo: Todo) => {
    setTodo(ToDo);
    setCheckedTodo(true);
  };

  const closeModalHandler = () => {
    setCheckedTodo(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectFilter(event.target.value);
  };

  const visibleGoods = !loading
    ? todos
      ?.filter(item => {
        switch (selectFilter) {
          case 'all':
          case '':
            return true;
          case 'completed':
            return item.completed;
          case 'active':
            return !item.completed;
          default:
            throw new Error('Something go wrong!');
        }
      })
      .filter(item => item.title.includes(appliedQuery.toLowerCase()))
    : null;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleUserChange={handleUserChange}
                applyQuery={applyQuery}
                resetInputValue={resetInputValue}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              <TodoList todos={visibleGoods} chooseTodo={chooseTodo} />
            </div>
          </div>
        </div>
      </div>

      {checkedTodo && (
        <TodoModal
          todo={todo}
          closeModalHandler={closeModalHandler}
        />
      )}
    </>
  );
};

export default App;
