import { TodoList } from '../TodoList';
import { TodoFilter } from '../TodoFilter';
import { Loader } from '../Loader';
import { useTodos } from '../Context';

export const AppContent: React.FC = () => {
  const { loading } = useTodos();

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
              {loading && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
