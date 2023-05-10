/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getLookingForTodos } from './api';

import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchedTodo, setSearchedTodo] = useState('');
  const [selectedStatusOfTodo, setSelectedStatusOfTodo] = useState('all');

  const fetchData = async () => {
    const todosFromServer = await getLookingForTodos(searchedTodo, selectedStatusOfTodo);

    setTodos(todosFromServer);
  };

  useEffect(() => {
    fetchData();
  }, [searchedTodo, selectedStatusOfTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchedTodo={searchedTodo}
                setSearchedTodo={setSearchedTodo}
                selectedStatusOfTodo={selectedStatusOfTodo}
                setSelectedStatusOfTodo={setSelectedStatusOfTodo}
              />
            </div>

            <div className="block">
              {
                todos.length > 0
                  ? (
                    <TodoList
                      todos={todos}
                      setSelectedTodo={setSelectedTodo}
                      selectedTodo={selectedTodo}
                    />
                  )
                  : <Loader />
              }
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && <TodoModal selectedTodo={selectedTodo} resetSelectedTodo={setSelectedTodo} />}
    </>
  );
};
