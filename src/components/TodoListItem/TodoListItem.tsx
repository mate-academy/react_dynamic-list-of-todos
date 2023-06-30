import {
  FC,
  useContext,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../TodoContext/TodoProvider';

type BtnProps = {
  isButtonActive: boolean;
  handleClick: () => void;
};

const Button: FC<BtnProps> = ({ isButtonActive, handleClick }) => (
  <button
    data-cy="selectButton"
    className="button"
    type="button"
    onClick={handleClick}
  >
    <span className="icon">
      <i className={classNames('far fa-eye', {
        'fa-eye-slash': isButtonActive,
        'fa-eye': !isButtonActive,
      })}
      />
    </span>
  </button>
);

type Props = {
  todo: Todo;
};

export const TodoListItem: FC<Props> = ({
  todo,
}) => {
  const { selectedTodo, setSelectedTodo } = useContext(TodoContext);
  // const [isButtonActive, setIsButtonActive] = useState(false);

  const { id, title, completed } = todo;

  const handleClick = () => {
    setSelectedTodo(todo);
  };

  const isButtonActive = selectedTodo?.id === id;

  return (
    <tr
      data-cy="todo"
      className=""
    >
      <td className="is-vcentered">{id}</td>
      <td>
        {completed && (
          <span className="icon">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p className={classNames({
          'has-text-danger': !completed,
          'has-text-success': completed,
        })}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <Button isButtonActive={isButtonActive} handleClick={handleClick} />
      </td>
    </tr>
  );
};
