<template>
    <div id="sp-loyalty">
        <div class="sp-container sp-container__profile">
            <Profile/>
            <Balance/>
        </div>
        <div class="sp-container sp-container__badges">
            <Badges/>
        </div>
        <div class="sp-container sp-container__status">
            <Status/>
        </div>
        <div class="sp-container sp-container__quests">
            <Quests/>
        </div>
        <div class="sp-container sp-container__wishlist">
            <Wishlist/>
        </div>
        <div class="sp-container sp-container__recommended">
            <Recommended/>
        </div>
        <div class="sp-container sp-container__game">
            <Game/>
        </div>
        <div class="sp-container sp-container__gifts">
            <Gifts/>
        </div>

        <div class="sp-popup sp-popup-message" v-if="showMessage">
            <div class="sp-popup-layout" v-on:click.prevent="showMessage = false;bodyLock(false)"></div>
            <div class="sp-popup-content">
                <i class="sp-popup-close" v-on:click.prevent="showMessage = false;bodyLock(false)"></i>
                <div class="sp-container">
                    <div class="sp-popup-title">
                       {{ showMessage && showMessage.title }}
                        <span>{{ showMessage && showMessage.text }}</span>
                    </div>
                    <a href="#" class="sp-popup_button"
                       v-on:click.prevent="showMessage = false;bodyLock(false)">Закрыть</a>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

  import SAILPLAY from 'sailplay-hub'
  import 'sailplay-hub-actions/sailplay.hub.actions';

  import Slick from 'vue-slick';
  import $ from 'jquery'
  import Paginate from 'vuejs-paginate'

  import Profile from './Profile'
  import Balance from './Balance'
  import Badges from './Badges'
  import Quests from './Quests'
  import Wishlist from './Wishlist'
  import Recommended from './Recommended'
  import Game from './Game'
  import Gifts from './Gifts'
  import Status from './Status'

  let load_actions_flag = false;

  export default {
    name: 'app',
    components: {
      Slick,

      Profile,
      Balance,
      Badges,
      Quests,
      Wishlist,
      Recommended,
      Game,
      Gifts,
      Status,
    },
    data: function () {
      return {
        showMessage: false,
        user: {
          user: {},
          user_points: {},
          purchases: {},
          user_status: {},
          last_badge: {}
        },
        badges: {
          multilevel_badges: [
            [],
            []
          ],
          one_level_badges: []
        },
        actions: [],
        gifts: {},
        history: []
      }
    },
    mounted: function () {

      let _actions = []

      // Fetch
      SAILPLAY.on('load.badges.list.success', function (res) {
        this.badges = res
      }.bind(this))

      SAILPLAY.on('load.user.info.success', function (res) {
        this.user = res
      }.bind(this))

      SAILPLAY.on('load.actions.list.success', function (res) {
        if(load_actions_flag) {
          _actions =  _actions.concat(res.actions)
          this.actions =_actions
        } else {
          _actions =  [].concat(res.actions)
          load_actions_flag = true
        }
      }.bind(this))

      SAILPLAY.on('load.actions.custom.list.success', function (res) {
        if(load_actions_flag) {
          _actions =  _actions.concat(res)
          this.actions =_actions
        } else {
          _actions =  [].concat(res)
          load_actions_flag = true
        }
      }.bind(this))

      SAILPLAY.on('load.gifts.list.success', function (res) {
        this.gifts = res
      }.bind(this))

      SAILPLAY.on('load.user.history.success', function (res) {
        this.history = res
      }.bind(this))

      SAILPLAY.on('users.update.success', function (res) {
        this.getUser()
      }.bind(this))

      this.getUser()
      this.getBadges()
      this.getQuests()
      this.getGifts()
      this.getHistory()

    },
    methods: {
      getUser: function () {
        SAILPLAY.send('load.user.info', {all: 1, purchases: 1})
      },
      getBadges: function() {
        SAILPLAY.send('load.badges.list', {include_rules: 1})
      },
      getQuests: function(){
        load_actions_flag = false
        this.actions = []
        SAILPLAY.send('load.actions.list')
        SAILPLAY.send('load.actions.custom.list')
      },
      getGifts: function () {
        SAILPLAY.send('load.gifts.list')
      },
      getHistory: function(){
        let offset = new Date().getTimezoneOffset(), o = Math.abs(offset)
        let timezone =  (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2)
        SAILPLAY.send('load.user.history', {tz: timezone})
      },

      bodyLock: function(state){
         if (state) {
           $('html, body').css({
             overflow: 'hidden',
             position: 'fixed',
             width: '100%',
             height: '100%',
           })
         } else {
           $('html, body').css({
             overflow: '',
             position: '',
             width: '',
             height: ''
           })
         }
      }
    }
  }

</script>

/* global styles */
<style lang="stylus">

</style>

/* local styles */
<style scoped lang="stylus">

    @import '~slick-carousel/slick/slick.css';

    #sp-loyalty
        /*padding 60px 50px;*/
        font-family 'Ubuntu', sans-serif
        padding 25px 15px
        box-sizing border-box
        overflow hidden
        @media screen and (min-width: 1050px)
            display flex
            flex-wrap wrap
            justify-content space-between
            align-items stretch

        & >>> .sp-m-text-center
            text-align center

        & >>> .sp-m-text-left
            text-align left

        & >>> .sp-m-text-right
            text-align right

        & >>> .sp-link-top
            position absolute
            top -10px
            left 0
            right 0
            margin auto
            @media screen and (min-width: 780px)
                top -23px
            a
                padding 5px 17px 5px 10px
                background #f1f1f1
                border-radius 10px
                &:before
                    height 12px
                @media screen and (min-width: 780px)
                    border-radius: 15px
                    padding 8px 28px 8px 10px
                    &:before
                        height 20px


        & >>> .sp-link-bottom
            position absolute
            bottom -10px
            left 0
            right 0
            margin auto
            @media screen and (min-width: 780px)
                bottom -23px
            a
                padding 5px 17px 5px 10px
                background #f1f1f1
                border-radius 10px
                &:before
                    height 12px
                @media screen and (min-width: 780px)
                    border-radius: 15px
                    padding 8px 28px 8px 10px
                    &:before
                        height 20px

        & >>> .sp-button
              padding 6px 7px
              border 1px px solid #EF6747
              font-size 8px
              line-height 10px
              border-radius 1.25px
              color #EF6747

        & >>> .sp-link
            color #EF6747
            line-height 14px
            font-size 12px
            padding-right 17px
            position relative
            display inline-block
            &:hover
                text-decoration none
            @media screen and (min-width: 780px)
                line-height 20px
                font-size 17px
            @media screen and (min-width: 1050px)
                line-height 19px
                font-size 16px
            &:before
                content '>'
                color: inherit
                display inline-block
                position: absolute
                top 0
                bottom 0
                right 7px
                margin auto
                @media screen and (min-width: 780px)
                    right 11px
            &.sp-m-small
                font-size 10px
                line-height 12px
                @media screen and (min-width: 780px)
                    font-size 17px
                    line-height 20px
              @media screen and (min-width: 1050px)
                  line-height 19px
                  font-size 16px


    #sp-loyalty >>> .slick-arrow
        border-radius 50%
        box-shadow rgba(124, 87, 85, 0.15) 0px 0px 2.77px
        background-color white
        background-repeat no-repeat
        background-position center center
        background-image url('../../img/icon-arrow.svg')
        background-size 7px auto
        position absolute
        top 0
        bottom 0
        margin auto
        width 30px
        height 30px
        @media screen and (min-width: 780px)
            width 57px
            height 57px
            background-size 10px auto
        @media screen and (min-width: 1050px)
            cursor pointer
            transition .3s ease
            &:hover
                box-shadow rgba(124,87,85,0.25) 0px 0px 12px
        &.slick-next
            right -8px
        &.slick-prev
            left - 8px
            transform rotate(180deg)

    #sp-loyalty >>> .sp-m-mobile
        &.sp-m-inline-block
            display inline-block !important
        &.sp-m-block
            display block !important
        &.sp-m-flex
            display flex !important
        &.sp-m-table
            display table !important
        @media screen and (min-width: 780px)
            &.sp-m-flex, &.sp-m-block, &.sp-m-inline-block, &.sp-m-table
                display none !important


    #sp-loyalty >>> .sp-m-tablet
        &.sp-m-block, &.sp-m-flex, &.sp-m-inline-block, &.sp-m-table
            display none !important
        @media screen and (min-width: 780px)
            &.sp-m-block
                display block !important
            &.sp-m-flex
                display flex !important
            &.sp-m-inline-block
                display inline-block !important
            &.sp-m-table
                display table !important

    #sp-loyalty >>> .sp-m-desktop
        &.sp-m-block, &.sp-m-flex, &.sp-m-inline-block, &.sp-m-table
            display none !important
        @media screen and (min-width: 1050px)
            &.sp-m-block
                display block !important
            &.sp-m-flex
                display flex !important
            &.sp-m-inline-block
                display inline-block !important
            &.sp-m-table
                display table !important

    #sp-loyalty >>> .sp-container
        background white
        border 2px solid rgba(224, 224, 224, 0.7)
        border-radius 2px
        box-sizing border-box
        position relative
        @media screen and (min-width: 780px)
            display flex
            align-items stretch
            justify-content space-evenly
        @media screen and (min-width: 1050px)
            width 100%
        &-title
            font-size 10px
            line-height 12px
            position absolute
            top -10px
            left 30px
            padding 6px 8px
            background #f1f1f1
            border-radius 6px
            @media screen and (min-width: 780px)
                font-size 17px
                line-height 20px
                padding 7px 14px
                top -17px
                left 20px
                border-radius 15px
        &__badges, &__quests, &__wishlist, &__recommended, &__game, &__gifts, &__status
            margin-top 35px
            @media screen and (min-width: 780px)
                margin-top 50px
        &__gifts, &__status
            background none
            border none
            border-radius 0
        &__profile
            @media screen and (min-width: 1050px)
                width 65%
        &__quests
            @media screen and (min-width: 1050px)
                width 65%
        &__recommended
            @media screen and (min-width: 1050px)
                width 65%
        &__wishlist
            @media screen and (min-width: 1050px)
                width 33%
        &__game
            @media screen and (min-width: 1050px)
                width 33%
        &__badges
            @media screen and (min-width: 1050px)
                margin-top 0 !important
                width 33%

    #sp-loyalty >>> .sp-popup
        position fixed
        top 0
        left 0
        width 100%
        height 100%
        display flex
        padding 30px 20px 20px
        box-sizing border-box
        z-index 999999
        overflow auto
        /*align-items flex-start*/
        align-items center
        justify-content center

        @media screen and (min-width: 780px)
            padding 0

        .sp-popup-layout
            background rgba(0, 0, 0, 0.30)
            position fixed
            top 0
            left 0
            width 100%
            height 100%
            z-index 1

        .sp-container
            @media screen and (min-width: 780px)
                border none
                padding 38px

        .sp-popup-content
            position relative
            z-index 2
            width 100%
            height 100%
            box-sizing border-box
            padding-top 20px
            @media screen and (min-width: 780px)
                padding-top 0
                height auto
            .sp-container
                flex-direction column
            .sp-popup-buttons-wrapper
                text-align center
            .sp-popup-title
                font-size 15px
                line-height 18px
                font-weight 900
                margin-bottom 15px
                text-transform uppercase
                @media screen and (min-width: 780px)
                    font-size 18px
                    line-height 21px
                    margin-bottom 25px
                span
                    width: 100%
                    margin-top 3px
                    display inline-block
                    color rgba(0, 0, 0, 0.5)
                    font-size 10px
                    line-height 12px
                    text-transform none
                    font-weight 500
                    @media screen and (min-width: 780px)
                        font-size 13px
                        line-height 15px
            .sp-popup_button
                display inline-block
                text-decoration none
                color white
                border-radius 18px
                background #EF6747
                width 100%
                text-align center
                line-height 38px
                font-size 15px
                cursor pointer
                border none
                outline none
                max-width 250px
                -webkit-appearance none
                vertical-align middle
                @media screen and (min-width: 780px)
                    width auto
                    padding 0 40px
                    border-radius 24px
                    line-height 48px
                    height 48px
                @media screen and (min-width: 1050px)
                    &:hover
                        background-color #F57863
                &.sp-m-disabled, &.sp-m-disabled:hover
                    background #c6c8bf
                    cursor default
            .sp-popup-close
                position absolute
                right 0
                top 0
                width 14px
                height 14px
                cursor pointer
                z-index 1
                background url('../../img/icon-close-white.svg') no-repeat center center/contain
                @media screen and (min-width: 780px)
                    background url('../../img/icon-close-black.svg') no-repeat center center/contain
                    width 22px
                    height 22px
                    right 30px
                    top 30px


        &.sp-popup-profile
            .sp-popup-content
                @media screen and (min-width: 780px)
                    width 640px

        &.sp-popup-change-password
            .sp-popup-content
                @media screen and (min-width: 780px)
                    width 350px

        &.sp-popup-badges
            .sp-popup-content
                @media screen and (min-width: 780px)
                    width 660px

        &.sp-popup-quest
            .sp-popup-content
                @media screen and (min-width: 780px)
                    width 400px

        &.sp-popup-gift-success
            .sp-popup-content
                @media screen and (min-width: 780px)
                    width 400px

        &.sp-popup-wishlist
            .sp-popup-content
                @media screen and (min-width: 780px)
                    width 450px

        &.sp-popup-history
            .sp-popup-content
                @media screen and (min-width: 780px)
                    width 680px


    #sp-loyalty >>> .sp-form-element
        display flex
        flex-direction row
        width 100%
        position relative
        flex-wrap wrap
        justify-content space-between
        &-error
            opacity 0
            visibility hidden
            position absolute
            top 0
            right 0
            font-size 9px
            line-height 10px
            color #FF0000
            @media screen and (min-width: 780px)
                line-height 15px
                font-size 13px
        &-label
            font-size 10px
            line-height 12px
            color rgba(0, 0, 0, 0.6)
            width 100%
            @media screen and (min-width: 780px)
                font-size 12px
                line-height 15px
        input[type=email], input[type=tel], input[type=password], input[type=text], select
            outline none
            position relative
            box-sizing border-box
            height 30px
            border-radius 4px
            line-height 30px
            padding 0 10px
            border 1px solid #C6C8C0
            width 100%
            font-size 13px
            margin-top 4px
            color black
            background-color transparent
            @media screen and (min-width: 780px)
                font-size 13px
                line-height 34px
                height 34px
                background-position right 7px top 14px !important
            &:focus
                box-shadow 0px 0px 0px 2px #BCE0FC
        select
            flex-basis 30%
            -webkit-appearance: none
            background-image url('../../img/icon-select.svg')
            background-repeat no-repeat
            background-position right 7px top 12px
            background-size 12px auto
            &:nth-of-type(2)
                flex-basis 36%
            option
                text-align center
                &:first-child
                    color rgba(0, 0, 0, 0.6)
        &.sp-m-error
            .sp-form-element-error
                opacity 1
                visibility visible
            input[type=email], input[type=tel], input[type=password], input[type=text], select
                border-color #FF0000
                &:focus, &:active
                    border-color #C6C8C0
                    box-shadow 0 0 0 2px #BCE0FC

        &.sp-form-field
            justify-content flex-start
            .sp-form-element-label
                color rgba(0,0,0,0.6)
                margin 0 0 4px
        &.sp-form-change-password
            margin 15px 0
            @media screen and (min-width: 780px)
                justify-self: self-start;
                margin: 0 0 15px !important;
        &.sp-form-avatar
            justify-content flex-start
            margin 15px 0
            align-items center
            @media screen and (min-width: 780px)
                margin 15px 0 0
            img
                width 55px
                height 55px
                margin-right 20px
                border-radius 50%
                @media screen and (min-width: 780px)
                    width 62px
                    height 62px
            input
                display none

        &.sp-form-checkbox-group
            display flex
            margin-bottom 20px
            padding-top 25px
            @media screen and (min-width: 780px)
                width 100% !important
                border-top 1px solid #c6c8c0
            .sp-form-element-error
                color #FF0000
                margin-top 10px
                position relative
                width 100%
                @media screen and (min-width: 780px)
                    font-size 13px
                    line-height 15px
            .sp-form-checkbox-group-title
                font-size 10px
                line-height 12px
                color black
                margin 0 0 5px
                @media screen and (min-width: 780px)
                    width 100% !important
                    font-size 15px
                    line-height 18px
                    margin-bottom 10px
            .sp-form-checkbox
                width 100%
                padding-bottom 10px
                margin 10px 0 0
                border-bottom 1px solid #C6C8C0
                &:last-child
                    border-bottom none
                span
                    padding-left 28px
                @media screen and (min-width: 780px)
                    border none
                    width 50%
                    span
                        padding-left 23px

    #sp-loyalty >>> .sp-form-link
        text-decoration underline
        color #EF6747
        font-size 10px
        line-height 12px
        cursor pointer
        &:hover
            text-decoration none
        @media screen and (min-width: 780px)
            font-size 13px
            line-height 18px

    #sp-loyalty >>> .sp-form-radio
        margin-right 25px
        display flex
        position relative
        &:last-child
            margin-right 0
        span
            box-sizing border-box
            padding-left 18px
            line-height 12px
            font-size 10px
            color black
            @media screen and (min-width: 780px)
                padding-left 26px
                line-height 15px
                font-size 13px
        i
            display block
            position absolute
            left 0
            top 0
            width 12px
            height 12px
            border 1px solid #64a7b5
            box-sizing border-box
            border-radius 50%
            @media screen and (min-width: 780px)
                width 15px
                height 15px
        input
            display none
            &:checked + i:before
                content ''
                display block
                position absolute
                top 1px
                left 1px
                width 8px
                border-radius 50%
                height 8px
                background #64a7b5
                box-sizing border-box
                @media screen and (min-width: 780px)
                    width 9px
                    height 9px
                    top 2px
                    left 2px

    #sp-loyalty >>> .sp-form-checkbox
        margin-right 25px
        display flex
        position relative
        &:last-child
            margin-right 0
        span
            box-sizing border-box
            padding-left 18px
            line-height 12px
            font-size 10px
            color black
            @media screen and (min-width: 780px)
                padding-left 23px
                line-height 15px
                font-size 13px
        i
            display block
            position absolute
            left 0
            top 0
            width 12px
            height 12px
            border 1px solid #64a7b5
            box-sizing border-box
            border-radius 1px
            background-position center center
            background-size auto 6.5px
            background-repeat no-repeat
            @media screen and (min-width: 780px)
                width 15px
                height 15px
                background-size auto 8px
                border-radius 1.5px
        input
            display none
            &:checked + i
                background-image url('../../img/icon-checkbox.svg')

    #sp-loyalty .sp-popup-message
        .sp-popup-content
            max-width 280px
            height auto
        .sp-container
            padding 35px 25px 25px

    #sp-loyalty >>> *
        min-height 0
        min-width 0

</style>