import '@fortawesome/fontawesome-free/css/all.css';

interface Props {
  user: User;
  unselect: () => void;
}

export const CurrentUser: React.FC<Props> = ({ user, unselect }) => (
  <div className="CurrentUser notification is-info">
    <h3 className="CurrentUser__name title">
      {user.name}
    </h3>
    <h2 className="CurrentUser__title subtitle ">
      <span>
        {'Selected user: '}
        {user?.id}
      </span>
    </h2>
    <h3 className="CurrentUser__email subtitle is-6">
      <i className="far fa-envelope" />
      {'   '}
      {user.email}
    </h3>
    <h3 className="CurrentUser__phone subtitle is-6">
      <i className="far fa-address-book" />
      {'   '}
      {user.phone}
    </h3>
    <button
      type="button"
      className="delete"
      value=""
      onClick={unselect}
    >
      text
    </button>
  </div>
);

export default CurrentUser;
