import assign from 'object-assign';

import BaseStore from './BaseStore.js';
import { HISTORY_LOADED } from '../constants/Constants.js';

let historyTitleMap = {
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
};

// TODO это калька из Ангуляровской реализации. Переписать по-нормальному
let enrichHistoryItem = entry => {
  let name = entry.name;

  switch (entry.action) {
    case 'event':
      break;
    case 'extra':
      break;
    case 'sharing':
      switch (entry.social_action) {
        case 'like':
          name = historyTitleMap.enter_group + entry.social_type;
          break;
        case 'purchase':
          name = historyTitleMap.share_purchase + entry.social_type;
          break;
        case 'partner_page':
          name = historyTitleMap.social_share + entry.social_type;
          break;
        case 'badge':
          name = historyTitleMap.share_badge + entry.social_type;
          break;
      }
      break;
    default:
      break;
  }

  return assign({}, entry, { name });
};

class HistoryStore extends BaseStore {
  constructor() {
    super(this._registerToAction.bind(this));
    this._history = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case HISTORY_LOADED:
        this._history = action.data.map(enrichHistoryItem);
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get history() {
    return this._history;
  }
}

export default new HistoryStore();
