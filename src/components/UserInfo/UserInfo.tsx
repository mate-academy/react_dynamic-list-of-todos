import classNames from 'classnames';
import { User } from '../../types/User';

type Props = {
  user: User,
  isCompleted: boolean,
};

export const UserInfo: React.FC<Props> = ({ user, isCompleted }) => {
  const {
    name,
    email,
  } = user;

  return (
    <p className="block" data-cy="modal-user">
      <strong
        className={classNames({
          'has-text-success': isCompleted,
          'has-text-danger': !isCompleted,
        })}
      >
        {isCompleted ? 'Done' : 'Planned'}
      </strong>

      {' by '}

      <a href={`mailto:${email}`}>
        {name}
      </a>
    </p>
  );
};
