import React from 'react';
import { getUser } from '../../data/api';
import './CurrentUser.scss';

type Props = {
	userId: number;
	onClear: () => void;
};

export const CurrentUser: React.FC<Props> = React.memo(({ userId, onClear }) => {
	const [user, setUser] = React.useState<User | null>(Object);

	React.useEffect(() => {
    getUser(userId).then(data => {
    	setUser(data);
    })
  }, [userId]);

	return (
		<div className="CurrentUser">
		<React.Fragment key={user?.id}>
				<h2 className="CurrentUser__title">
					{user && <span>Selected user: {user?.id}</span>}
				</h2>
				<h3 className="CurrentUser__name">{user?.name}</h3>
				<p className="CurrentUser__email">{user?.email}</p>
				<p className="CurrentUser__phone">{user?.phone}</p>
			
				{user && (
					<button 
						type="button" 
						className="button button--clear" 
						onClick={onClear}
					>
						Clear
					</button>
				)}
			</React.Fragment>
  </div>)
});
