import { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredOption, setFilteredOption] = useState('all');
  const [typedTitle, setTypedTitle] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<number>(0);

  useEffect(() => {
    getTodos()
      .then((data) => {
        setTodos(data);
      });
  }, []);

  const handleFilterChange = (selected: string) => {
    setFilteredOption(selected);
  };

  let filteredTodos;

  if (filteredOption === 'active') {
    filteredTodos = todos.filter(todo => !todo.completed);
  } else if (filteredOption === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed);
  } else {
    filteredTodos = todos;
  }

  const visibleTodos = filteredTodos.filter((todo) => (
    todo.title.toLowerCase().includes(typedTitle.trim().toLowerCase())
  ));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={handleFilterChange}
                typedTitle={typedTitle}
                setTypedTitle={setTypedTitle}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList
                todos={visibleTodos}
                setSelectedTodo={setSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          setSelectedTodo={setSelectedTodo}
          todos={visibleTodos}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
