import React, { useEffect, useContext, useState } from 'react';
import { Loader } from '../Loader';
import { TodoFilter } from '../TodoFilter';
import { TodoList } from '../TodoList';
import { getTodos } from '../../api';
import { TodosContext } from '../Context/TodoContext';
import { TodoModal } from '../TodoModal';

export const TodoApp: React.FC = () => {
  const {
    todos,
    selectedTodo,
    showModal,
    setTodos,
  } = useContext(TodosContext);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {!!loading && (
                <Loader />
              )}

              {!loading && todos.length > 0 && (
                <TodoList />
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && selectedTodo && (
        <TodoModal todo={selectedTodo} />
      )}
    </>
  );
};
