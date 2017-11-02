<template>
    <div id="sp-loyalty-balance">
        <div class="sp-balance-container">
            <div class="sp-balance-confirmed">
                <span class="sp-balance-value">{{ $parent.user.user_points.confirmed || 0 }}</span>
            </div>
            <div class="sp-balance-unconfirmed">
                <div class="sp-balance-unconfirmed-hint sp-m-desktop sp-m-block">Доступны после подтверждения факта оплаты</div>
                <span class="sp-balance-label">Неподтвержденных</span>
                <span class="sp-balance-value">{{ $parent.user.user_points.unconfirmed || 0 }}</span>
            </div>
        </div>
        <div class="sp-m-text-center sp-link-bottom">
            <a v-if="$parent.history.length" href="#" class="sp-link"
               v-on:click.prevent="showHistory = true;$parent.bodyLock(true)">История</a>
        </div>

        <div class="sp-popup sp-popup-history" v-if="showHistory">
            <div class="sp-popup-layout" v-on:click.prevent="showHistory = false;$parent.bodyLock(false)"></div>
            <div class="sp-popup-content">
                <i class="sp-popup-close" v-on:click.prevent="showHistory = false;$parent.bodyLock(false)"></i>
                <div class="sp-container">
                    <div class="sp-popup-title">
                        История
                        <span>Здесь показана история всех ваших действий</span>
                    </div>

                    <table class="sp-history-table sp-m-tablet sp-m-table">

                        <thead>
                            <tr>
                                <td></td>
                                <td>Дата</td>
                                <td>Номер заказа/действие</td>
                                <td>Статус</td>
                                <td>Стоимость<br> заказа</td>
                                <td>Баллы</td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(item, index) in getPage(filteredItems)" :key="index">
                                <td class="sp-history-table-icon"
                                    :class="{'sp-m-purchase' : item.action == 'purchase', 'sp-m-gift' : item.points_delta && item.points_delta > 0 && item.action != 'purchase'}"></td>
                                <td class="sp-history-table-date">
                                    <div>
                                        <span>{{ item.action_date | date('hh:mm') }}</span>
                                        {{ item.action_date | date('MM.DD.YYYY') }}
                                    </div>
                                </td>
                                <td class="sp-history-table-name"
                                    :class="{'sp-m-purchase' : item.action == 'purchase', 'sp-m-gift' : item.points_delta && item.points_delta > 0 && item.action != 'purchase'}">
                                    <div v-if="!item.order_num">{{ item | historyItem }}</div>
                                    <div v-else>
                                        <span v-if="!item.link">{{ item.order_num }}</span>
                                        <a v-else :href="item.link">{{ item.order_num }}</a>
                                    </div>
                                </td>
                                <td class="sp-history-table-status">
                                    <div v-if="item.order_num && getOrderStatus(item)">
                                        {{ getOrderStatus(item) }}
                                    </div>
                                </td>
                                <td class="sp-history-table-price">
                                    <div v-if="item.price">
                                        {{ item.price }}&nbsp;руб.
                                    </div>
                                </td>
                                <td class="sp-history-table-points" :class="{ 'sp-m-negative': item.points_delta < 0}">
                                    <span class="sp-history-table-points-element" v-if="item.points_delta">
                                        <strong>{{ (item.points_delta < 0 ? '' : '+') + item.points_delta }}</strong>
                                    </span>
                                </td>
                            </tr>
                        </tbody>

                    </table>

                    <div class="sp-history-orders" v-if="hasPurchases">
                        <label class="sp-form-checkbox">
                            <input type="checkbox" v-model="onlyOrders">
                            <i></i>
                            <span>Только заказы</span>
                        </label>
                    </div>

                    <table class="sp-history-list sp-m-mobile sp-m-table">
                        <tbody v-for="(item, index) in filteredItems" :key="index">
                        <tr class="sp-history-list-date" v-if="item.action_date">
                            <td>Дата и время</td>
                            <td>{{ item.action_date | date('MM.DD.YYYY hh:mm') }}</td>
                        </tr>
                        <tr class="sp-history-list-name"
                            :class="{
                              'sp-m-purchase' : item.action == 'purchase',
                              'sp-m-gift' : item.points_delta && item.points_delta > 0 && item.action != 'purchase'}">
                            <td>Номер заказа/действие</td>
                            <td v-if="!item.order_num">{{ item | historyItem }}</td>
                            <td v-else>
                                <span v-if="!item.link">{{ item.order_num }}</span>
                                <a v-else :href="item.link">{{ item.order_num }}</a>
                            </td>
                        </tr>
                        <tr class="sp-history-list-status" v-if="item.order_num && getOrderStatus(item)">
                            <td>Статус</td>
                            <td>{{ getOrderStatus(item) }}</td>
                        </tr>
                        <tr class="sp-history-list-price" v-if="item.price">
                            <td>Cтоимость заказа</td>
                            <td>{{ item.price }}&nbsp;руб.</td>
                        </tr>
                        <tr class="sp-history-list-points" v-if="item.points_delta"
                            :class="{ 'sp-m-negative': item.points_delta < 0}">
                            <td>Баллы</td>
                            <td>
                                <span>{{ (item.points_delta < 0 ? '' : '+') + item.points_delta }}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div class="sp-popup-buttons-wrapper">
                        <div v-show="totalPages > 1">
                            <paginate
                                    ref="paginate"
                                    :page-count="totalPages"
                                    :page-range="3"
                                    :click-handler="setPage"
                                    :container-class="'sp-history-pagination sp-m-tablet sp-m-block'">
                            </paginate>
                        </div>
                        <a href="#" class="sp-popup_button"
                           v-on:click.prevent="showHistory = false;$parent.bodyLock(false)">Закрыть</a>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
  import moment from 'moment';
  import 'moment/locale/ru';
  import Paginate from 'vuejs-paginate'

  const historyTexts = {
    "purchase": "Покупка",
    "gift_purchase": "Подарок",
    "badge": "Бейджик",
    "registration": "Регистрация",
    "referral": "Регистрация друга",
    "referred": "Регистрация по приглашению",
    "referred_purchase": "Покупка приглашенного пользователя",
    "promocode": "За ввод промокода",
    "enter_group": "Вступление в группу ",
    "share_purchase": "Рассказал о покупке в ",
    "social_share": "Рассказал в ",
    "share_badge": "Рассказал о бейджике в ",
    "earn_badge": 'Получен бейджик ',
    "extra": "Экстра "
  }

  const socialList = {
    "vk": "VK",
    "ok": "Одноклассиниках",
    "tw": "Twitter",
    "fb": "Facebook"
  }

  const pageSize = 5;

  export default {
    name: 'balance',
    data: function () {
      return {
        page: 1,
        onlyOrders: false,
        showHistory: false
      }
    },
    components: {
      Paginate
    },
    methods: {
      getOrderStatus: function (item) {
        return 'Сформирован'
      },
      getPage: function(arr) {
        let start = (this.page-1) * pageSize
        let end = start + pageSize
        return arr.slice(start, end)
      },
      setPage(pageNumber) {
        this.page = pageNumber
      }
    },
    watch: {
      onlyOrders() {
        this.page = 1
        this.$refs.paginate.selected = 0
      }
    },
    computed: {
      filteredItems() {
        return this.$parent.history.filter(item => {return this.onlyOrders ? item.action == 'purchase' : true})
      },
      hasPurchases() {
        return this.$parent.history.filter(item => item.action == 'purchase').length
      },
      totalPages() {
        console.log('total', Math.ceil(this.filteredItems.length / pageSize));
        return Math.ceil(this.filteredItems.length/pageSize)
      }
    },
    filters: {
      date(date, format) {
        return moment(date).format(format);
      },
      historyItem(item) {
        switch (item.action) {
          case 'gift_purchase':
            return historyTexts.gift_purchase + ': ' + item.name;
          case 'event':
            return item.name || historyTexts.custom_action;
          case 'extra':
            return item.name || historyTexts.custom_action;
          case 'custom_action':
            return item.name || historyTexts.custom_action;
          case 'badge':
            return historyTexts.badge + ': ' + item.name;
          case 'purchase':
            return item.name || historyTexts.purchase;
          case 'sharing':
            switch (item.social_action) {
              case 'like':
                return historyTexts.enter_group + socialList[item.social_type] || item.social_type;
              case 'purchase':
                return historyTexts.share_purchase + socialList[item.social_type] || item.social_type;
              case 'partner_page':
                return historyTexts.social_share + socialList[item.social_type] || item.social_type;
              case 'badge':
                return historyTexts.share_badge + socialList[item.social_type] || item.social_type;
            }
        }
        return historyTexts[item.action];
      }
    }
  }
</script>

<style scoped lang="stylus">

    #sp-loyalty-balance
        position relative
        padding 15px 25px 40px
        box-sizing content-box
        @media screen and (min-width: 780px)
            padding 50px 40px 30px
            min-width 170px
            & >>> .sp-link-bottom
                bottom -23px
                text-align center
                padding-left 0
                @media screen and (min-width: 1050px)
                    padding 0
                    text-align center

        @media screen and (min-width: 1050px)
            padding 60px 40px 50px

    .sp-popup-history
        .sp-popup-buttons-wrapper
            @media screen and (min-width: 780px)
                margin-top 20px
                text-align right !important
        .sp-container
            padding 35px 25px 25px
        .sp-history-orders
            padding-top 10px
            @media screen and (min-width: 780px)
                padding 20px 0 0px
        .sp-history-table
            width 100%
            border-spacing 0
            border-collapse collapse
            thead
                tr
                    td
                        font-size 10px
                        line-height 10px
                        color rgba(0, 0, 0, 0.5)
                        text-align center
                        &:nth-child(1)
                            width 28px
                        &:nth-child(2)
                            width 90px
                        &:nth-child(3)
                            text-align left
                            width 190px

            tbody
                tr
                    td
                        height: 52px;
                        font-size 13px
                        line-height 16px
                        border-bottom 1px solid rgba(0, 0, 0, 0.07)
                        text-align center
                        color rgba(0, 0, 0, 0.5)
                        &.sp-history-table-icon
                            &.sp-m-purchase
                                &:before
                                    content ''
                                    display inline-block
                                    vertical-align bottom
                                    width 15px
                                    height 15px
                                    background url('../../img/icon-purchase.svg') no-repeat center center / contain
                            &.sp-m-gift
                                &:before
                                    content ''
                                    display inline-block
                                    vertical-align bottom
                                    width 15px
                                    height 15px
                                    background url('../../img/icon-gift.svg') no-repeat center center / contain

                        &.sp-history-table-date
                            position relative
                            span
                                opacity 0
                                visibility hidden
                                position absolute
                                color rgba(0, 0, 0, 0.3)
                                line-height 20px
                                height 20px
                                text-align center
                                display block
                                top 0
                                left 0
                                right 0
                                margin auto
                                transition .3s ease
                                box-shadow 0px 0px 6px 0px rgba(63, 40, 19, 0.1)
                                background white
                                border-radius 18px
                                &:after
                                    content ''
                                    position absolute
                                    left 0
                                    right 0
                                    bottom - 5px
                                    margin auto
                                    display block
                                    width 0
                                    height 0
                                    border-left 5px solid transparent
                                    border-right 5px solid transparent
                                    border-top 5px solid white
                            &:hover
                                span
                                    opacity 1
                                    top -10px
                                    visibility visible
                        &.sp-history-table-name
                            color black
                            text-align left
                            a
                                color inherit
                                text-decoration underline
                                &:hover
                                    text-decoration none
                        &.sp-history-table-price
                            color #EF6747
                            font-weight 900
                        &.sp-history-table-points
                            font-size 22px
                            line-height 26px
                            vertical-align middle
                            position relative
                            color black
                            &.sp-m-negative
                                color #F9A300
                            span
                                strong
                                    font-weight 900
                                    vertical-align middle
                                &:after
                                    content ''
                                    display inline-block
                                    width 12px
                                    height 14px
                                    vertical-align middle
                                    margin-left 3px
                                    background url('../../img/icon-points.svg') no-repeat center center / contain

                    &:last-child
                        td
                            border-bottom none

        .sp-history-list
            color rgba(0, 0, 0, 0.5)
            width 100%
            font-size 8px
            line-height 8px
            text-align left
            border-spacing 0
            border-collapse collapse
            tbody
                border-bottom 1px solid rgba(224, 224, 224, 0.7)
                &:last-child
                    border-bottom none
                tr
                    &:first-child
                        td
                            padding-top 18px
                    &:last-child
                        td
                            padding-bottom 18px
                    td
                        /*padding 8px 0*/
                        height 20px
                        &:first-child
                            width 45%
                    &.sp-history-list-date
                        td:last-child
                            font-size 10px
                            line-height 12px
                    &.sp-history-list-name
                        td:last-child
                            line-height 12px
                            a
                                display inline-block
                                vertical-align bottom
                                color black
                                text-decoration underline
                        &.sp-m-purchase
                            td:last-child:before
                                content ''
                                display inline-block
                                vertical-align bottom
                                width 11px
                                height 11px
                                margin-right 5px
                                background url('../../img/icon-purchase.svg') no-repeat center center / contain
                        &.sp-m-gift
                            td:last-child:before
                                content ''
                                display inline-block
                                vertical-align bottom
                                width 11px
                                height 11px
                                margin-right 5px
                                background url('../../img/icon-gift.svg') no-repeat center center / contain
                    &.sp-history-list-status
                        td:last-child
                            font-size 10px
                            line-height 12px
                    &.sp-history-list-price
                        td:last-child
                            font-weight bold
                            color #EF6747
                            font-size 10px
                            line-height 12px
                    &.sp-history-list-points
                        td:last-child
                            font-weight 900
                            font-size 15px
                            line-height 18px
                            color black
                            span
                                vertical-align middle
                                display inline-block
                            &:after
                                content ''
                                display inline-block
                                width 9px
                                height 9px
                                vertical-align middle
                                margin-left 3px
                                background url('../../img/icon-points.svg') no-repeat center center / contain
                        &.sp-m-negative
                            td:last-child
                                color: #F9A300

    .sp-balance-container
        text-align center
        @media screen and (min-width: 780px)
            position relative
            &:after
                content ''
                display block
                background rgba(224, 224, 224, 0.7)
                position absolute
                left -40px
                top 0
                width 2px
                height 100px

        @media screen and (min-width: 1050px)
                text-align center
        .sp-balance-confirmed
            font-size 38px
            line-height 46px
            vertical-align middle
            position relative
            @media screen and (min-width: 780px)
                font-size 54px
                line-height 64px
            @media screen and (min-width: 1050px)
                line-height 30px
            .sp-balance-value
                font-weight 900
                vertical-align middle
            &:after
                content ''
                display inline-block
                width 20px
                height 22px
                vertical-align middle
                margin-left 5px
                background url('../../img/icon-points.svg') no-repeat center center / contain
                @media screen and (min-width: 780px)
                    width 30px
                    height 30px
                    margin-left 10px
        .sp-balance-unconfirmed
            margin-top 10px
            font-size 10px
            line-height 14px
            vertical-align middle
            @media screen and (min-width: 780px)
                margin-top 0
                font-size 13px
                line-height 19px
            @media screen and (min-width: 1050px)
                position relative
                margin-top 60px
                &-hint
                    opacity 0
                    visibility hidden
                    font-size 12px
                    position absolute
                    color rgba(0, 0, 0, 0.3)
                    line-height 14px
                    padding 13px 0
                    height auto
                    box-shadow 0px 0px 6px 0px rgba(63, 40, 19, 0.1)
                    background white
                    border-radius 18px
                    transition .3s ease
                    text-align center
                    display block
                    top 0
                    width 290px
                    left 50%
                    transform translateX(-50%)
                    z-index 1
                    &:after
                        content ''
                        position absolute
                        left 0
                        right 0
                        bottom - 5px
                        margin auto
                        display block
                        width 0
                        height 0
                        border-left 5px solid transparent
                        border-right 5px solid transparent
                        border-top 5px solid white

                &:hover
                    .sp-balance-unconfirmed-hint
                        opacity 1
                        top -50px
                        visibility visible
            .sp-balance-label
                margin-right 5px
                vertical-align middle
            .sp-balance-value
                font-weight 900
                vertical-align middle
            &:after
                content ''
                display inline-block
                width 7px
                height 8px
                vertical-align middle
                margin-left 5px
                background url('../../img/icon-points.svg') no-repeat center center / contain
                @media screen and (min-width: 780px)
                    width 10px
                    height 10px

    // TODO: Make common styles for pagination component
    #sp-loyalty-balance >>> .sp-history-pagination
         font-size 16px
         line-height 20px
         list-style none
         padding 0
         margin 10px 0 30px
         position relative
         @media screen and (min-width: 780px)
             position absolute
             margin 7px 0 0
         a
             width 32px
             height 32px
             border-radius 50%
             border 1px solid #68A5B7
             color #68A5B7
             box-sizing border-box
             display inline-block
             line-height 30px
             text-align center
             @media screen and (min-width: 780px)
                 margin-right 14px
         li
             display inline-block
             padding 0 7px
             @media screen and (min-width: 780px)
                 padding 0
             &:first-child, &:last-child
                 display none
             &.active
                 a
                     color white
                     background #68A5B7


</style>