export const loadData = async (name: string) => {
  const response = await fetch(`/api/${name}.json`);
  const data = await response.json();

  return data;
};
