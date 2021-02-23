const getToday = () => {
  const date = new Date();

  let dayDate = date.getDate();
  if (dayDate < 10) {
    dayDate = '0' + dayDate;
  }
  let monthDate = date.getMonth() + 1;
  if (monthDate < 10) {
    monthDate = '0' + monthDate;
  }
  let yearDate = date.getFullYear();
  return `${yearDate}-${monthDate}-${dayDate}`;
};

export default getToday;