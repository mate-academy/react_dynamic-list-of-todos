import React, { useState, useEffect, useCallback } from 'react';
import { addUsers, getPositions, getUsersFromPage } from '../../api/api';
import { UsersTable } from '../UsersTable/UsersTable';
import { UsersPagination } from '../UsersPagination/UsersPaginations';
import { UserForm } from '../UserForm/UserForm';

export const Users = () => {
  const [pageId, setPageId] = useState(1);
  const [users, setUsers] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [positions, setPositions] = useState([]);

  const loadUsersFromPage = useCallback(async() => {
    const usersDataFromServer = await getUsersFromPage(pageId);

    setTotalPages(usersDataFromServer.total_pages);
    setUsers(usersDataFromServer.users);
  }, [pageId]);

  const loadPositionsFromServer = useCallback(async() => {
    const positionsDataFromServer = await getPositions();

    setPositions(positionsDataFromServer.positions);
  }, []);

  const addUserToServer = useCallback(async(user) => {
    await addUsers(user);
    await loadUsersFromPage();
  }, [loadUsersFromPage]);

  useEffect(() => {
    loadUsersFromPage();
  }, [pageId, loadUsersFromPage]);

  useEffect(() => {
    loadPositionsFromServer();
  }, [loadPositionsFromServer]);

  if (!users) {
    return 'Loading...';
  }

  return (
    <>
      <h1>
        Users
      </h1>
      <UsersTable
        users={users}
      />
      <UsersPagination
        pages={totalPages}
        setPageId={setPageId}
      />
      <UserForm
        positions={positions}
        addUserToServer={addUserToServer}
      />
    </>
  );
};
