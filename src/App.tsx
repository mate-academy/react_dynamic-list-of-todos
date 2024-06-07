/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoStatus } from './types/TodoStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [appliedQuery, setAppliedQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(TodoStatus.all);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filteredList = useMemo(() => {
    const filteredByQuery = todos.filter(todo =>
      todo.title.toLocaleLowerCase().includes(appliedQuery.toLocaleLowerCase()),
    );

    switch (selectedStatus) {
      case TodoStatus.active:
        return filteredByQuery.filter(todo => !todo.completed);
      case TodoStatus.completed:
        return filteredByQuery.filter(todo => todo.completed);
      default:
        return filteredByQuery;
    }
  }, [appliedQuery, todos, selectedStatus]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setAppliedQuery={setAppliedQuery}
                appliedQuery={appliedQuery}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                todos.length > 0 && (
                  <TodoList
                    selectTodo={setSelectedTodo}
                    selectedTodoId={selectedTodo?.id}
                    filteredList={filteredList}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} close={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
