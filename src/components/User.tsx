import React from 'react';
import { Table } from 'semantic-ui-react';

type PropsUser = User;

const User: React.FC<PropsUser> = ({ name }) => <Table.Cell>{name}</Table.Cell>;

export default User;
