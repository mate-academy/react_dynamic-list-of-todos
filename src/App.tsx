
/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
/*  eslint-disable */
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos} from './api';

export const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosActivityFilter, setTodosActivityFilter] = useState('All');
  const [todosQuery, setTodosQuery] = useState('');
  const [todoShownId, setTodoShownId] = useState(-1);
  const [loadingDone, setLoadingDone] = useState(false);
  useEffect(() => {
    const loadTodos = async () => {
      const data = await getTodos();
    }
      setTodos(data);
    };

    loadTodos();
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
              <Loader />
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
