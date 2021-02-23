const changeCurrentActiveDay = (target) => {
  let currentActiveDate = document.querySelector('.active');
  currentActiveDate.classList.remove('active');
  currentActiveDate = target;
  currentActiveDate.classList.add('active');
};

export default changeCurrentActiveDay;