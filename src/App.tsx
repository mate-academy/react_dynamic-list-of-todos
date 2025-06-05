useEffect(() => {
  setIsLoading(true);
  getTodos()
    .then(setTodos)
    .finally(() => setIsLoading(false));
}, []);
