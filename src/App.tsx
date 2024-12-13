import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { STATUSES, TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [status, setStatus] = useState<string>(STATUSES.ALL);
  const [query, setQuery] = useState<string>('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(res => setTodoList(res));
  }, []);

  const filteredTodoListByStatus = (): Todo[] => {
    switch (status) {
      case STATUSES.COMPLETED:
        return todoList.filter(todo => todo.completed);

      case STATUSES.ACTIVE:
        return todoList.filter(todo => !todo.completed);

      case STATUSES.ALL:
      default:
        return todoList;
    }
  };

  const getTodoList = () => {
    const list = filteredTodoListByStatus();

    if (query) {
      return list.filter(item =>
        item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      );
    } else {
      return list;
    }
  };

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const closeModal = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setStatus={setStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {todoList.length ? (
                <TodoList
                  todoList={getTodoList()}
                  onSelectTodo={handleSelectTodo}
                  selectedTodo={selectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} onClose={closeModal} />}
    </>
  );
};
