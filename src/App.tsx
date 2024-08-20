/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { FilterStatusType, Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

function filterFunction(
  items: Todo[],
  str: string,
  filterStates: FilterStatusType,
) {
  let itemsInUse = [...items];

  itemsInUse = itemsInUse.filter(todo =>
    todo.title.toLowerCase().includes(str.toLowerCase().trim()),
  );

  itemsInUse = itemsInUse.filter(item => {
    switch (filterStates) {
      case FilterStatusType.All:
        return true;
      case FilterStatusType.Active:
        return !item.completed;
      case FilterStatusType.Completed:
        return item.completed;
      default:
        return true;
    }
  });

  return itemsInUse;
}

export const App: React.FC = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [filterLetter, setFilterLetter] = useState('');
  const [filterStates, setFilterStatus] = useState<FilterStatusType>(
    FilterStatusType.All,
  );
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const todoList = filterFunction(todo, filterLetter, filterStates);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(todoFromServer => {
        setTodo(todoFromServer);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterLetter={setFilterLetter}
                setFilterStatus={setFilterStatus}
                filterLetter={filterLetter}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todoList.length > 0 && (
                <TodoList
                  todos={todoList}
                  setChoiceTodo={setSelectedTodo}
                  choiceTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
