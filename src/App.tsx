/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import {getTodos} from './api'
import { Todo } from './types/Todo';
import { SortType } from './enums';




export const App: React.FC = () => {
  const [todosFromServer, setTodoFromServer] = useState<Todo[]>([]);
  const [sortType, setSortType] =useState(SortType.All);
  const [query, setQuery] =useState('');
  const [isShow, setIsShow] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);

  const selectedTodo = todosFromServer.find(todo => todo.id === selectedUserId) || null;

  useEffect(() => {
    getTodos().then(todos => setTodoFromServer(todos.filter(todo => {
        const {completed, title} = todo;
        const queryInclude = (value: string) => (
          value.toLowerCase().includes(query.toLowerCase())
        )

        switch (sortType) {
          case SortType.Active: 
            return  !completed && queryInclude(title);

          case SortType.Completed:
            return completed && queryInclude(title);

          default:
            return queryInclude(title);
        }
      }))
    )
  }, [query, sortType])

  const onShowClicked = (id: number) => {
    setIsShow(true);
    setSelectedUserId(id);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter 
                sortType={sortType}
                onSelect={setSortType}
                onQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {!todosFromServer.length && <Loader />}
              <TodoList 
                todos={todosFromServer}
                onShowClicked={onShowClicked}
                selectedTodo={selectedTodo}
              />
              
            </div>
          </div>
        </div>
      </div>

      {isShow && (
        <TodoModal
          setIsClicked={setIsShow}
          selectedTodo={selectedTodo}
          setSelectedUserId={setSelectedUserId}
        />
      )}
    </>
  );
};
