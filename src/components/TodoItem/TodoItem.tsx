import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, id, completed } = todo;

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered" />
      <td className="is-vcentered is-expanded">
        <p
          className={completed ? 'has-text-success' : 'has-text-danger'}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button data-cy="selectButton" className="button" type="button">
          <span className="icon">
            {/* <i className="far fa-eye-slash" /> */}
            <i className="far fa-eye" />
          </span>
        </button>
      </td>
    </tr>
  );
};
