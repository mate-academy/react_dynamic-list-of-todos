export const isInQuery = (title: string, query: string) => {
  return (
    title.toLowerCase().includes(query.toLowerCase())
  );
};
