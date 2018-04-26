angular.module('pj.services', [])
  .service('translate', function ($rootScope) {

    var self = this;

    self.lang = 'ru';

    self.setLang = function (lang) {
      self.lang = lang;
      $rootScope.translate = self[self.lang];
    };

    self.ru = {
      "badges": {
        "intro": "Поздравляем, вы получили новый бейдж!",
        "bonus_points": "бонусных баллов!",
        "this_badge": "Этот бейдж дает вам дополнительно",
        "share_this_news": "Поделитесь этой новостью:",
        "title": "Список бейджиков",
        "descr": "За каждый бейджик Вы получаете 15 дополнительных баллов!"
      },
      "profile": {
        "no_name": "Имя не указано",
        "confirmed_points": "Подтвержденные баллы",
        "history_link": "История начислений",
        "unconfirmed_points": "Неподтвержденные баллы",
        "what_is_it": "Что это?",
        "what_is_unconfirmed_points": "Что такое<br> неподтвержденные<br> бонусные баллы?",
        "purchases": "За покупки и другие действия вам начисляются бонусные баллы",
        "confirm_points": "Баллы подтверждаются после выкупа заказа и фактической оплаты",
        "points_to_gift": "Подтвержденные бонусные баллы можно обменять на подарки"
      },
      "purchase": {
        bonus_for_sharing: 'баллов за каждый рассказ о покупке',
        purchase_points: 'баллов будет подтверждено',
        hello: 'Добро<br/>пожаловать<br/>в ПапаБонус',
        promo_text: "Закажите пиццу и приглашайте друзей, чтобы зарабатывать бонусые баллы и получать подарки!",
        link_text: 'Перейти в ПапаБонус',
        papa_bonus: 'ПапаБонус'
      },
      "history": {
        "title": "История начислений",
        "no_descr": "Нет описания",
        "items": {
          "purchase": "Покупка",
          "gift_purchase": "Подарок",
          "badge": "Бейджик",
          "registration": "Регистрация",
          "referral": "Регистрация друга",
          "referred": "Регистрация по приглашению",
          "referred_purchase": "Покупка приглашенного пользователя",
          "promocode": "За ввод промокода",
          "enter_group": "Вступление в группу ",
          "share_purchase": "Рассказ о покупке в ",
          "social_share": "Рассказ в ",
          "share_badge": "Рассказ о бейджике в "
        }
      },
      "gifts": {
        "title": "Список подарков",
        "descr": "Потратьте ваши баллы на подарки",
        "auth_request": "Чтобы получить подарок, необходимо авторизоваться",
        "login": "Войти",
        "need_more_1": "Чтобы получить этот подарок, необходимо набрать еще",
        "need_more_2": "баллов",
        "get_points": "Заработать",
        "enough_points": "У Вас достаточно баллов. Вы можете получить этот подарок.",
        "to_basket": "В корзину",
        "points": "баллов"
      },
      "actions": {
        "title": "Список заданий",
        "descr": "Выполняйте задания и получайте за них дополнительные баллы",
        "no_descr": "Нет описания",
        "earn_points": 'Получить баллы',
        "share": 'Поделиться',
        "join": 'Вступить',
        "ac_connected": 'Ваш аккаунт успешно привязан. Нажмите "Поделиться", чтобы получить бонусные баллы.',
        "ac_connected_join": 'Ваш аккаунт успешно привязан. Нажмите "Вступить", чтобы получить бонусные баллы.',
        "system": {
          "emailBinding": "Указать E-mail",
          "fillProfile": "Заполнить профиль",
          "inviteFriend": "Пригласить друга"
        },
        "social": {
          "vk": {
            "like": {
              "name": "Вступить в группу"
            },
            "partner_page": {
              "name": "Рассказать о PapaJohns в VK"
            },
            "purchase": {
              "name": "Рассказать о покупке в VK"
            }
          },
          "fb": {
            "like": {
              "name": "Вступить в группу"
            },
            "partner_page": {
              "name": "Рассказать о PapaJohns в FB"
            },
            "purchase": {
              "name": "Рассказать о покупке в FB"
            }
          },
          "gp": {
            "like": {
              "name": "Лайкнуть в GP"
            },
            "partner_page": {
              "name": "Рассказать о PapaJohns в GP"
            },
            "purchase": {
              "name": "Рассказать о покупке в GP"
            }
          },
          "ok": {
            "like": {
              "name": "Вступить в группу"
            },
            "partner_page": {
              "name": "Рассказать о PapaJohns в OK"
            },
            "purchase": {
              "name": "Рассказать о покупке в OK"
            }
          },
          "tw": {
            "partner_page": {
              "name": "Рассказать о PapaJohns в TW"
            },
            "purchase": {
              "name": "Рассказать о покупке в Tw"
            }
          }
        }
      }
    };

    self.en = {
      "badges": {
        "intro": "Congratulations, you received a new badge!",
        "bonus_points": "bonus points!",
        "this_badge": "This badge gives you",
        "share_this_news": "Share that:",
        "title": "List of badges",
        "descr": "You get 15 extra points for every badge received!"
      },
      "profile": {
        "no_name": "Name is not specified",
        "confirmed_points": "Active points",
        "history_link": "Transactions history",
        "unconfirmed_points": "Inactive points",
        "what_is_it": "What is this?",
        "what_is_unconfirmed_points": "What is<br> inactive<br> bonus points?",
        "purchases": "You earn bonus points for purchases and other actions",
        "confirm_points": "Points are activated after you pay for your purchase",
        "points_to_gift": "Active bonus points can be redeemed for special gifts"
      },
      "purchase": {
        bonus_for_sharing: 'for each share',
        purchase_points: 'points earned',
        hello: 'Welcome<br/>to<br/>PapaBonus',
        promo_text: "Order pizza and invite friends to earn more bonus points and get free pizza.",
        link_text: 'Go to Papa Bonus',
        papa_bonus: 'Papa Bonus'
      },

      "history": {
        "title": "Transactions history",
        "no_descr": "No description",
        "items": {
          "purchase": "Purchase",
          "gift_purchase": "Gift",
          "badge": "Badge",
          "registration": "Sign up",
          "referral": "Invite friend",
          "referred": "Registration from friend's invite",
          "referred_purchase": "Friend's purchase",
          "promocode": "Promocode activation",
          "enter_group": "Joined our group on ",
          "share_purchase": "Shared a purchase on ",
          "social_share": "Shared our website on ",
          "share_badge": "Shared a badge on "
        }
      },
      "gifts": {
        "title": "List of gifts",
        "descr": "Redeem your points for gifts",
        "auth_request": "You need to be authorized to get our gifts",
        "login": "Sign in",
        "need_more_1": "To get this gift you need more",
        "need_more_2": "points",
        "get_points": "Earn",
        "enough_points": "You have enough bonus points to get this gift.",
        "to_basket": "Add to order",
        "points": "points"
      },
      "actions": {
        "title": "List of quests",
        "descr": "Complete quests to get extra points",
        "no_descr": "No description",
        "earn_points": 'Earn points',
        "share": 'Share',
        "join": 'Join',
        "ac_connected": 'Your account was successfully linked to your profile. Press "Share" to earn bonus points.',
        "ac_connected_join": 'Your account was successfully linked to your profile. Press "Join" to earn bonus points.',
        "system": {
          "emailBinding": "Enter email",
          "fillProfile": "Fill profile",
          "inviteFriend": "Invite friend"
        },
        "social": {
          "vk": {
            "like": {
              "name": "Join the group"
            },
            "partner_page": {
              "name": "Share our website on VK"
            },
            "purchase": {
              "name": "Share your purchase on VK"
            }
          },
          "fb": {
            "like": {
              "name": "Like Facebook group"
            },
            "partner_page": {
              "name": "Share our website on Facebook"
            },
            "purchase": {
              "name": "Share your purchase on Facebook"
            }
          },
          "gp": {
            "like": {
              "name": "Like G+ group"
            },
            "partner_page": {
              "name": "Share our website on G+"
            },
            "purchase": {
              "name": "Share your purchase on G+"
            }
          },
          "ok": {
            "like": {
              "name": "Join the group"
            },
            "partner_page": {
              "name": "Share our website on Odnoklassniki"
            },
            "purchase": {
              "name": "Share you purchase on Odnoklassniki"
            }
          },
          "tw": {
            "partner_page": {
              "name": "Share our website on twitter"
            },
            "purchase": {
              "name": "Share your purchase on twitter"
            }
          }
        }
      }
    };

  });

