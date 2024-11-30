/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

const filteredList = (select: string, query: string, todos: Todo[]): Todo[] => {
  let todosCopy = [...todos];

  if (select) {
    switch (select) {
      case 'active':
        todosCopy = todosCopy.filter(result => !result.completed);
        break;
      case 'completed':
        todosCopy = todosCopy.filter(result => result.completed);
        break;

      default:
        break;
    }
  }

  if (query) {
    const normalizeValue = query.toLowerCase().trim();

    todosCopy = todosCopy.filter(todo =>
      todo.title.toLowerCase().includes(normalizeValue),
    );
  }

  return todosCopy;
};

export const App: React.FC = () => {
  const [areTodosLoaded, setTodosLoaded] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [select, setSelect] = useState('');
  const [query, setQuery] = useState('');
  const filteredTodos = filteredList(select, query, todos);

  useEffect(() => {
    getTodos().then(results => {
      setTodos(results);
      setTodosLoaded(true);
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setStatus={setSelect}
                setInput={setQuery}
                input={query}
              />
            </div>

            <div className="block">
              {!areTodosLoaded ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  visible={modalVisible}
                  onTodoSelect={setTodo}
                  onModalToggle={setModalVisible}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalVisible && todo && (
        <TodoModal todo={todo} onModalToggle={setModalVisible} />
      )}
    </>
  );
};
