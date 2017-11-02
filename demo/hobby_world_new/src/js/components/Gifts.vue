<template>
    <div id="sp-loyalty-gifts">
        <div class="sp-gifts-container">
            <div class="sp-gifts-title">Подарки</div>

            <slick v-if="$parent.gifts.length" class="sp-gifts-list" ref="gifts" :options="slickOptions">
                <div v-for="gift in $parent.gifts" :key="gift.id">

                    <div class="sp-gift-item">
                        <img :src="gift.thumbs.url_250x250">
                        <div class="sp-gift-item-name">
                            <span>{{ gift.name }}</span>
                        </div>
                        <div class="sp-gift-item-points">
                            <span>{{ gift.points }}</span>
                        </div>
                        <a href="#" class="sp-gift-item-get" v-on:click.prevent="get(gift)">Получить</a>
                    </div>

                </div>
            </slick>

            <div v-if="$parent.gifts.length" class="slick-prev slick-arrow"></div>
            <div v-if="$parent.gifts.length" class="slick-next slick-arrow"></div>

        </div>

        <div class="sp-popup sp-popup-gift-success" v-if="getSuccess">
            <div class="sp-popup-layout" v-on:click.prevent="getSuccess = false;$parent.bodyLock(false)"></div>
            <div class="sp-popup-content">
                <i class="sp-popup-close" v-on:click.prevent="getSuccess = false;$parent.bodyLock(false)"></i>
                <div class="sp-container">
                    <div class="sp-popup-title">
                        Поздравляем!
                        <span>Ваш подарок добавлен в корзину</span>
                    </div>

                    <div class="sp-popup-gift-content">
                        <img class="sp-popup-gift-img"
                             :src="getSuccess && getSuccess.thumbs && getSuccess.thumbs.url_250x250">
                        <div class="sp-popup-gift-name">{{ getSuccess && getSuccess.name }}</div>
                        <div class="sp-popup-gift-points">
                            <span>{{ getSuccess && getSuccess.points }}</span>
                        </div>
                    </div>

                    <a href="#" class="sp-popup_button"
                       v-on:click.prevent="getSuccess = false;$parent.bodyLock(false)">Закрыть</a>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

  import Slick from 'vue-slick'
  import Vue from 'vue'
  import SAILPLAY from 'sailplay-hub'

  export default {
    name: 'gifts',
    components: {
      Slick
    },
    data() {
      return {
        getSuccess: false,
        getting: null,
        slickOptions: {
          slidesToShow: 1,
          slidesPerRow: 1,
          mobileFirst: true,
          arrows:true,
          accessibility: false,
          prevArrow: '#sp-loyalty-gifts .slick-prev',
          nextArrow: '#sp-loyalty-gifts .slick-next',
          responsive: [
            {
              breakpoint: 550,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 780,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 980,
              settings: {
                slidesToShow: 4
              }
            }
          ]
        },
      }
    },
    computed: {
      getSuccess() {
        return this.$parent.gifts.filter(gift => gift.id == this.getSuccess)[0]
      }
    },
    mounted() {

      SAILPLAY.on('gifts.purchase.success', function (res) {
        this.$nextTick(function () {
          this.$parent.getUser()
          this.$parent.getHistory()
          this.$parent.getGifts()
          if (this.getting)
            this.getSuccess = Vue.util.extend({}, this.getting)
          this.getting = false
        })
      }.bind(this))

      SAILPLAY.on('gift.purchase.error', function (res) {
        this.$nextTick(function () {
          this.getSuccess = this.getting = false
          this.$parent.showMessage = {
            title: 'Ошибка',
            text: res.status_code == '-2000' ? 'У вас недостаточно баллов' : res.message
          }
        })
      }.bind(this))

    },
    methods: {

      get(gift) {
        if(this.getting) return
        this.getting = gift
        SAILPLAY.send('gifts.purchase', {gift: gift})
      },

      next() {
        this.$refs.gifts.next();
      },

      prev() {
        this.$refs.gifts.prev();
      },

      reInit() {
        // Helpful if you have to deal with v-for to update dynamic lists
        this.$nextTick(() => {
          this.$refs.gifts.reSlick();
        });
      },
    },
  }

</script>

<style scoped lang="stylus">

    #sp-loyalty-gifts
        position relative
        width 100%
        box-sizing border-box
        @media screen and (min-width: 1050px)
            & >>> .slick-slide
                padding 0 10px

    .sp-gifts-container
        .sp-gifts
            &-title
                font-weight 900
                line-height 22px
                font-size 18px
                @media screen and (min-width: 780px)
                    font-size 30px
                    line-height 36px
            &-list
                margin-top 35px
        .sp-gift
            &-item
                box-sizing border-box
                padding 40px 26px 20px
                width 100%
                background white
                border 2px solid rgba(224, 224, 224, 0.7)
                border-radius 1px
                text-align center
                @media screen and (min-width: 780px)
                    padding 65px 25px 40px
                @media screen and (min-width: 1050px)
                    padding 40px 30px
                    margin: 0 -10px 56px
                    &:hover
                        margin-bottom 0
                        & >>> .sp-gift-item-get
                            display block
                img
                    display inline-block
                    max-width 100%
                    margin-bottom 10px
                &-name
                    position relative
                    height 45px
                    display flex
                    align-items center
                    @media screen and (min-width: 780px)
                        height 60px
                    span
                        display inline-block
                        width 100%
                        font-size 10px
                        line-height 16px
                        @media screen and (min-width: 780px)
                            font-size 14px
                            line-height 20px
                &-points
                    font-size 18px
                    line-height 22px
                    padding: 9px 0
                    @media screen and (min-width: 780px)
                        font-size 22px
                        line-height 26px
                        padding: 18px 0
                    @media screen and (min-width: 780px)
                        padding-bottom 0
                    span
                        font-weight 900
                        vertical-align middle
                    &:after
                        content ''
                        display inline-block
                        width 10px
                        height 10px
                        vertical-align middle
                        margin-left 3px
                        background url('../../img/icon-points.svg') no-repeat center center / contain

                &-get
                    display inline-block
                    text-decoration none
                    color white
                    border-radius 18px
                    background #EF6747
                    width 100%
                    line-height 38px
                    font-size 15px
                    @media screen and (min-width: 780px)
                        font-size 18px
                        margin-top 20px
                    @media screen and (min-width: 1050px)
                        display none
                        margin-top 18px
                        &:hover
                            background-color #F57863


    .sp-popup-gift-success
        .sp-popup-content
            max-width 280px
        .sp-container
            padding 35px 25px 25px
        .sp-popup-gift-content
            padding-top 15px
            text-align center
        .sp-popup-gift-img
            width auto
            height 150px
        .sp-popup-gift-name
            padding-top 5px
            font-size 13px
            line-height 19px
        .sp-popup-gift-points
            padding 20px 0
            font-size 22px
            line-height 26px
            span
                font-weight 900
                vertical-align middle
            &:after
                content ''
                display inline-block
                width 10px
                height 10px
                vertical-align middle
                margin-left 3px
                background url('../../img/icon-points.svg') no-repeat center center / contain

</style>