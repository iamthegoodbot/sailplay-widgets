window._pichshop_config = {
  partner_id: 1601,
  auth_hash: 'bb352a69135914bc6bf59b39fe9ea13fd16464c5',
  statusList: [
    {
      name: 'Зубная фея',
      limit: [0, 2000],
      image: {
        origin: 'dist/image/status/origin/1.png',
        active: 'dist/image/status/active/1.png'
      }
    },
    {
      name: 'Добрый волшебник',
      limit: [2000, 4000],
      image: {
        origin: 'dist/image/status/origin/2.png',
        active: 'dist/image/status/active/2.png'
      }
    },
    {
      name: 'Цветик-семицветик',
      limit: [4000, 7000],
      image: {
        origin: 'dist/image/status/origin/3.png',
        active: 'dist/image/status/active/3.png'
      }
    },
    {
      name: 'Птица счастья',
      limit: [7000, 12000],
      image: {
        origin: 'dist/image/status/origin/4.png',
        active: 'dist/image/status/active/4.png'
      }
    },
    {
      name: 'Хоттабыч',
      limit: [12000, 20000],
      image: {
        origin: 'dist/image/status/origin/5.png',
        active: 'dist/image/status/active/5.png'
      }
    },
    {
      name: 'Золотая рыбка',
      limit: [20000, 40000],
      image: {
        origin: 'dist/image/status/origin/6.png',
        active: 'dist/image/status/active/6.png'
      }
    },
    {
      name: 'Дед Мороз',
      limit: [40000, null],
      image: {
        origin: 'dist/image/status/origin/7.png',
        active: 'dist/image/status/active/7.png'
      }
    }
  ],
  customActions: [
    {
      type: 'tag',
      tag: 'Отзыв на Маркете',
      name: 'Отзыв на Маркете',
      points: 100,
      image: 'dist/image/pig_icon.png'
    },
    {
      type: 'tag',
      tag: 'Отзыв на сайте',
      name: 'Отзыв на сайте',
      points: 100,
      image: 'dist/image/pig_icon.png'
    },
    {
      id: 1,
      type: 'test',
      tag: 'Прошел опрос',
      name: 'Пройти опрос',
      points: 100,
      href: 'test.html',
      image: 'dist/image/pig_icon.png',
      data: [
        {
          label: 'На какие события вы обычно покупаете подарки в Pichshop?',
          answers: [
            {
              label: 'На день рождение друзей',
              tag: 'Я покупаю подарки в Pichshop на день рождения друзей'
            },
            {
              label: 'На Новый год',
              tag: 'Я покупаю подарки в Pichshop на Новый год'
            },
            {
              label: 'На 23 февраля',
              tag: 'Я покупаю подарки в Pichshop на 23 февраля'
            },
            {
              label: 'На 8 марта',
              tag: 'Я покупаю подарки в Pichshop на 8 марта'
            },
            {
              label: 'Свой вариант ответа',
              variable: 'Я покупаю подарки в Pichshop',
              tag: 'Я покупаю подарки в Pichshop - свой вариант ответа'
            }
          ]
        }
      ]
    },
    {
      id: 'profile',
      type: 'form',
      tag: 'Заполнил профил',
      name: 'Заполнил профиль',
      points: 100,
      href: 'profile.html',
      image: 'dist/image/task-icon-03.png'
    }
  ]
};