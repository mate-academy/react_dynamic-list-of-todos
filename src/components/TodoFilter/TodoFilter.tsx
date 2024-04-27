import { useState } from 'react';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';

interface TodoFilterProps {
  setResults: (filteredTodos: Todo[]) => void; // Установка отфильтрованных результатов
}

export const TodoFilter: React.FC<TodoFilterProps> = ({ setResults }) => {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // Добавляем состояние для хранения выбранного фильтра

  const fetchData = (value: string) => {
    getTodos().then(data => {
      let filteredTodos = data;

      if (value) {
        // Фильтрация по введенному тексту
        filteredTodos = data.filter(todo =>
          todo.title.toLowerCase().includes(value.toLowerCase()),
        );
      }
      // Применение фильтра по статусу

      if (statusFilter !== 'all') {
        filteredTodos = filteredTodos.filter(todo =>
          statusFilter === 'active' ? !todo.completed : todo.completed,
        );
      }

      if (statusFilter === 'all') {
        filteredTodos = data;
      }

      setResults(filteredTodos); // Установка отфильтрованных результатов
    });
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    fetchData(value);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    fetchData(query); // При изменении статуса фильтруем данные заново
  };

  const handleClearFilter = () => {
    setQuery(''); // Очищаем текстовое поле
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={statusFilter}
            onChange={e => handleStatusChange(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={e => {
            handleInputChange(e.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-search" />
        </span>

        <span className="icon is-right">
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleClearFilter}
          />
        </span>
      </p>
    </form>
  );
};
