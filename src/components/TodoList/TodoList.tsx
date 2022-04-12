import React, {
  memo, useState, useEffect,
} from 'react';
import { TodoItem } from '../TodoItem';
import './TodoList.scss';

type Props = {
  todos: Todo[]
};

enum SelectOptions {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}

export const TodoList: React.FC<Props> = memo(({ todos }) => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedValue, setSelectedValue] = useState(String(SelectOptions.All));

  useEffect(() => {
    const toFilter = () => (
      todos.filter(({ title, completed }) => {
        switch (selectedValue) {
          case SelectOptions.All:
            return title.toLowerCase().includes(searchValue.toLowerCase());
          case SelectOptions.Completed:
            return title.toLowerCase().includes(searchValue.toLowerCase()) && (
              completed
            );
          case SelectOptions.Active:
            return title.toLowerCase().includes(searchValue.toLowerCase()) && (
              !completed
            );
          default:
            return false;
        }
      })
    );

    setFilteredTodos(toFilter);
  }, [todos, searchValue, selectedValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__control">
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          placeholder="Search Todo"
        />

        <select
          value={selectedValue}
          onChange={(event) => setSelectedValue(event.target.value)}
        >
          <option value={SelectOptions.All}>
            All
          </option>
          <option value={SelectOptions.Active}>
            Active
          </option>
          <option value={SelectOptions.Completed}>
            Completed
          </option>
        </select>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              userId={todo.userId}
              title={todo.title}
              completed={todo.completed}
            />
          ))}
        </ul>
      </div>
    </div>
  );
});
