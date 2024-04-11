const SortByTimestamp = (list) => {
  if(list == null) return []
  return list.sort(
    (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
  );
};

export default SortByTimestamp;
