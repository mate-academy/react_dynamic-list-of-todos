export const loadData = async <T>(url: string): Promise<T[]> => {
  const { data } = await fetch(url).then(response => response.json());

  return data;
};
