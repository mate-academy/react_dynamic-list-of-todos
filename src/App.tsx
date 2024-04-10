import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { searchQueryInField } from './utils/filterTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [selectedBy, setSelectedBy] = useState('');

  const [searchBy, setSearchBy] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(e => alert(e));
  }, []);

  const visibleItems = searchQueryInField(selectedBy, searchBy, todos);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedBy={s => setSelectedBy(s)}
                searchBy={s => setSearchBy(s)}
              />
            </div>

            <div className="block">
              {!todos && <Loader />}

              <TodoList
                items={visibleItems}
                setSelectedTodo={e => setSelectedTodo(e)}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        selectedTodo={selectedTodo}
        setSelectedTodo={e => setSelectedTodo(e)}
      />
    </>
  );
};
