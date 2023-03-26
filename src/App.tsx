import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoInfo } from './components/TodoInfo';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';

const initialTodo: Todo = {
  id: 0,
  title: '',
  completed: false,
  userId: 0,
};

export const App: React.FC = () => {
  const [selected, setSelected] = useState('All');
  const [searchHolder, setSearchHolder] = useState('');
  const [carierTodo, setCarierTodo]
    = useState(initialTodo);
  const isOpenTodoModal = carierTodo.userId !== 0;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelected={setSelected}
                setSearchHolder={setSearchHolder}
              />
            </div>

            <div className="block">
              <TodoInfo
                carierTodo={carierTodo}
                setCarierTodo={setCarierTodo}
                selected={selected}
                searchHolder={searchHolder}
              />
            </div>
          </div>
        </div>
      </div>

      {isOpenTodoModal && (
        <TodoModal
          initialTodo={initialTodo}
          setCarierTodo={setCarierTodo}
          carierTodo={carierTodo}
        />
      )}
    </>
  );
};
