document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.main-nav');
  const toggleButton = document.querySelector('.main-nav__toggle');
  const slidePanel = document.getElementById('slidePanel');

  // Функция для блокировки скролла колесом мыши и на сенсорных экранах
  function preventScroll(event) {
    event.preventDefault();
  }

  // Функция для блокировки прокрутки с клавиатуры
  function preventScrollKeys(event) {
    // Коды клавиш, которые управляют прокруткой
    const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
    if (keys.includes(event.key)) {
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
      // Запрещаем скролл страницы
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
      window.addEventListener('keydown', preventScrollKeys);
      document.body.classList.add('hidden-scroll');
    } else {
      // Восстанавливаем возможность скролла
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventScrollKeys);
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

