// export const getUser = (userId: number): Promise<User> => {
//   return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(
//     response => response.json(),
//   );
// };

export function getUser(userId: number): Promise<User> {
  return fetch('http://localhost:5174/api/users.json')
    .then(response => response.json())
    .then((users: User[]) => {
      const user = users.find(u => u.id === userId);

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    });
}
