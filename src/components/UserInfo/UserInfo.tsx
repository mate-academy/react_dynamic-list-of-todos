import { User } from '../../types/User';

type Props = {
  user: User,
  completed: boolean,
};

export const UserInfo: React.FC<Props> = ({ user, completed }) => {
  const {
    name,
    email,
  } = user;

  return (
    <p className="block" data-cy="modal-user">
      {completed
        ? <strong className="has-text-success">Done</strong>
        : <strong className="has-text-danger">Planned</strong>}

      {' by '}

      <a href={`mailto:${email}`}>
        {name}
      </a>
    </p>
  );
};
