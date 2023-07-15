/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selected, setSelected] = useState<Todo | null>();
  const [filterSelect, setFilterSelect] = useState('');
  const [search, setSearch] = useState('');

  const getTodosFromServer = async () => {
    let todosArr;

    try {
      todosArr = await getTodos();
    } catch (error) {
      throw new Error('Error todos loading');
    }

    switch (filterSelect) {
      case 'all':
        break;
      case 'active':
        todosArr = todosArr.filter(item => item.completed);
        break;
      case 'completed':
        todosArr = todosArr.filter(item => !item.completed);
        break;
      default:
        break;
    }

    const str = search.toLowerCase();

    todosArr = todosArr.filter((item) => {
      const title = item.title.toLowerCase();

      return title.includes(str);
    });

    setTodos(todosArr);
  };

  useEffect(() => {
    getTodosFromServer();
  }, [filterSelect, selected, search]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                search={search}
                selectMethod={setFilterSelect}
                searchWord={setSearch}
              />
            </div>

            <div className="block">
              {
                todos.length === 0
                  ? <Loader />
                  : <TodoList todos={todos} selectMethod={(value) => setSelected(value)} selected={selected} />
              }
            </div>
          </div>
        </div>
      </div>
      {
        selected && (
          <TodoModal
            selectedTodo={selected}
            selectMethod={setSelected}
          />
        )
      }
    </>
  );
};
