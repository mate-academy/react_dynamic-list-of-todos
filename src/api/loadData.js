const loadData = async(link) => {
  const fetchedData = await fetch(link);
  const loadedData = await fetchedData.json();
  return loadedData;
};

export default loadData;
