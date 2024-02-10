import { TodoList } from '../TodoList';
import { TodoFilter } from '../TodoFilter';
import { Loader } from '../Loader';
import { TodoModal } from '../TodoModal';
import { useAppContext } from '../../StoreApp';

export const TodoApp: React.FC = () => {
  const { loading, isModalOpen } = useAppContext();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">{!loading && <TodoFilter />}</div>

            <div className="block">
              {loading && <Loader />}

              {!loading && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <TodoModal />}
    </>
  );
};
