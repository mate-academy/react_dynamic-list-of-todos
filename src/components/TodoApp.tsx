import { useContext } from 'react';
import { Loader } from './Loader';
import { TodoFilter } from './TodoFilter';
import { TodoList } from './TodoList';
import { TodosContext } from '../TodosContext';
import { TodoModal } from './TodoModal';

export const TodoApp: React.FC = () => {
  const { visibleTodos, selectedTodo } = useContext(TodosContext);

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
              {!visibleTodos.length && (
                <Loader />
              )}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal />
      )}
    </>
  );
};
