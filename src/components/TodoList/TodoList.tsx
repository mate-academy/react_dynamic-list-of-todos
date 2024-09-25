import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';
import cn from 'classnames';
import { TodoStatus } from '../../types/todoStatus';

type Props = {
  todos: Todo[];
  selectOption: string;
  inputText: string;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectOption,
  inputText,
}) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    let newFilteredTodos = todos;

    switch (selectOption) {
      case TodoStatus.All:
        newFilteredTodos = todos;
        break;

      case TodoStatus.Active:
        newFilteredTodos = todos.filter(todo => !todo.completed);
        break;

      case TodoStatus.Completed:
        newFilteredTodos = todos.filter(todo => todo.completed);
        break;

      default:
        newFilteredTodos = todos;
        break;
    }

    if (inputText.length > 0) {
      newFilteredTodos = newFilteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(inputText.toLowerCase()),
      );
    }

    setFilteredTodos(newFilteredTodos);
  }, [selectOption, todos, inputText]);

  return (
    <>
      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {filteredTodos.map(todo => (
            <tr data-cy="todo" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={cn({
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed,
                  })}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => setSelectedTodo(todo)}
                >
                  <span className="icon">
                    <i
                      className={cn('far', {
                        'fa-eye-slash': selectedTodo?.id === todo.id,
                        'fa-eye': selectedTodo?.id !== todo.id,
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTodo && (
        <TodoModal
          userId={selectedTodo.userId}
          id={selectedTodo.id}
          onClose={() => setSelectedTodo(null)}
          text={selectedTodo.title}
          completed={selectedTodo.completed}
        />
      )}
    </>
  );
};
