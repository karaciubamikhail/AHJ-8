export function changeWindow() {
  const view = document.documentElement;
  const nickname = document.querySelector('.nickname');
  nickname.style.marginTop = `${(view.clientHeight / 2 - (nickname.offsetHeight / 2))}px`;
}

export function animatedUsers() {
  const btn = [...document.querySelectorAll('.chat__btn')];
  const usersWindow = document.querySelector('.chat__users');
  const btnOpen = document.querySelector('.chat__btn--open');
  const btnClose = document.querySelector('.chat__btn--close');
  btn.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('chat__btn--open')) {
        usersWindow.classList.add('chat__user--active');
        btnOpen.classList.remove('chat__btn--active');
        btnClose.classList.add('chat__btn--active');
      }
      if (e.target.classList.contains('chat__btn--close')) {
        usersWindow.classList.remove('chat__user--active');
        btnClose.classList.remove('chat__btn--active');
        btnOpen.classList.add('chat__btn--active');
      }
    });
  });
}
