document.addEventListener('DOMContentLoaded', () => {
  const pageBody = document.querySelector('.page-body');
  const nav = document.querySelector('.main-nav');
  const toggleButton = document.querySelector('.main-nav__toggle');
  const slidePanel = document.getElementById('slidePanel');

  // Функция для блокировки скролла колесом мыши и на сенсорных экранах вне slidePanel
  function preventScroll(event) {
    if (!slidePanel.contains(event.target)) {
      event.preventDefault();
    }
  }

  // Функция для блокировки прокрутки с клавиатуры вне slidePanel
  function preventScrollKeys(event) {
    const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
    if (keys.includes(event.key) && !slidePanel.contains(document.activeElement)) {
      event.preventDefault();
    }
  }

  toggleButton.addEventListener('click', () => {
    // Определяем видимый верх экрана в момент нажатия кнопки
    const visibleTop = window.scrollY;
    slidePanel.style.top = `${visibleTop}px`;

    // Переключение состояния панели
    const isOpen = slidePanel.classList.toggle('slide-panel--open');

    if (isOpen) {
      // Запрещаем скролл страницы, кроме slidePanel
      pageBody.addEventListener('wheel', preventScroll, { passive: false });
      pageBody.addEventListener('touchmove', preventScroll, { passive: false });
      pageBody.addEventListener('keydown', preventScrollKeys);
      document.body.classList.add('hidden-scroll');
    } else {
      // Восстанавливаем возможность скролла
      pageBody.removeEventListener('wheel', preventScroll);
      pageBody.removeEventListener('touchmove', preventScroll);
      pageBody.removeEventListener('keydown', preventScrollKeys);
      document.body.classList.remove('hidden-scroll');
    }

    // Переключение классов для меню
    if (nav.classList.contains('main-nav--closed')) {
      nav.classList.remove('main-nav--closed');
      nav.classList.add('main-nav--opened');
    } else {
      nav.classList.remove('main-nav--opened');
      nav.classList.add('main-nav--closed');
    }
  });
});
