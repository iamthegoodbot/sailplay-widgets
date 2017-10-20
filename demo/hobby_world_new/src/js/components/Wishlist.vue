<template>
    <div id="sp-loyalty-wishlist">
        <div class="sp-container-title">Вишлист</div>
        <div class="sp-wishlist-container">

            <slick v-if="wishlist.length" class="sp-wishlist-list sp-wishlist-list-slider" ref="wishlist" :options="slickOptions">
                <div v-for="(item, index) in wishlist" :key="index">
                    <a class="sp-wishlist-list-item" :href="item.link">
                        <img :src="item.image">
                        <div class="sp-wishlist-list-item-info">
                            <div class="sp-wishlist-list-item-title">
                                <span>{{ item.title }}</span>
                            </div>
                            <div class="sp-wishlist-list-item-price">
                                <span class="sp-wishlist-list-item-price-value">
                                    <img src="~/img/icon-price.svg">
                                    {{ item.price || 0 }}&nbsp;руб.
                                </span>
                                <span v-if="item.old_price" class="sp-wishlist-list-item-price-value-old">
                                    {{ item.old_price || 0 }}&nbsp;руб.
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            </slick>

            <div v-if="wishlist.length" class="sp-wishlist-list sp-m-desktop sp-m-flex">
                <a class="sp-wishlist-list-item" v-for="(item, index) in wishlist.slice(0, 2)" :key="index"
                   :href="item.link">
                    <img :src="item.image">
                    <div class="sp-wishlist-list-item-info">
                        <div class="sp-wishlist-list-item-title">
                            <span>{{ item.title }}</span>
                        </div>
                        <div class="sp-wishlist-list-item-price">
                                <span class="sp-wishlist-list-item-price-value">
                                    <img src="~/img/icon-price.svg">
                                    {{ item.price || 0 }}&nbsp;руб.
                                </span>
                            <span v-if="item.old_price" class="sp-wishlist-list-item-price-value-old">
                                    {{ item.old_price || 0 }}&nbsp;руб.
                                </span>
                        </div>
                    </div>
                </a>
            </div>

            <div v-if="!wishlist.length" class="sp-wishlist-empty">
                <div>
                    <img src="~/img/icon-wishlist-empty.svg">
                    <span>Ваш вишлист пока пуст</span>
                </div>
                <a href="#">Добавить товары</a>
            </div>

        </div>

        <div v-if="wishlist.length" class="slick-prev slick-arrow"></div>
        <div v-if="wishlist.length" class="slick-next slick-arrow"></div>

        <div v-if="wishlist.length" class="sp-m-text-center sp-link-bottom">
            <a href="#" class="sp-link sp-m-small"
               v-on:click.prevent="showWishlist = true;$parent.bodyLock(true)">Показать всё</a>
        </div>

        <div class="sp-popup sp-popup-wishlist" v-if="showWishlist">
            <div class="sp-popup-layout" v-on:click.prevent="showWishlist = false;$parent.bodyLock(false)"></div>
            <div class="sp-popup-content">
                <i class="sp-popup-close" v-on:click.prevent="showWishlist = false;$parent.bodyLock(false)"></i>
                <div class="sp-container">
                    <div class="sp-popup-title">
                        Вишлист
                        <span>Описание вишлиста</span>
                    </div>

                    <div class="sp-wishlist-list sp-m-mobile sp-m-block">
                        <a class="sp-wishlist-list-item" v-for="(item, index) in wishlist" :key="index"
                           :href="item.link">
                            <img :src="item.image">
                            <div class="sp-wishlist-list-item-info">
                                <div class="sp-wishlist-list-item-title">
                                    <span>{{ item.title }}</span>
                                </div>
                                <div class="sp-wishlist-list-item-price">
                                <span class="sp-wishlist-list-item-price-value">
                                    <img src="~/img/icon-price.svg">
                                    {{ item.price || 0 }}&nbsp;руб.
                                </span>
                                    <span v-if="item.old_price" class="sp-wishlist-list-item-price-value-old">
                                    {{ item.old_price || 0 }}&nbsp;руб.
                                </span>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div class="sp-wishlist-list sp-m-tablet sp-m-block">
                        <a class="sp-wishlist-list-item" v-for="(item, index) in getPage(wishlist)" :key="index"
                           :href="item.link">
                            <img :src="item.image">
                            <div class="sp-wishlist-list-item-info">
                                <div class="sp-wishlist-list-item-title">
                                    <span>{{ item.title }}</span>
                                </div>
                                <div class="sp-wishlist-list-item-price">
                                <span class="sp-wishlist-list-item-price-value">
                                    <img src="~/img/icon-price.svg">
                                    {{ item.price || 0 }}&nbsp;руб.
                                </span>
                                    <span v-if="item.old_price" class="sp-wishlist-list-item-price-value-old">
                                    {{ item.old_price || 0 }}&nbsp;руб.
                                </span>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div class="sp-popup-buttons-wrapper">

                        <div v-show="totalPages > 1">
                            <paginate
                                    ref="paginate"
                                    :page-count="totalPages"
                                    :page-range="4"
                                    :click-handler="setPage"
                                    :container-class="'sp-history-pagination sp-m-tablet sp-m-block'">
                            </paginate>
                        </div>

                        <a href="#" class="sp-popup_button"
                           v-on:click.prevent="showWishlist = false;$parent.bodyLock(false)">Закрыть</a>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>

  import Paginate from 'vuejs-paginate'
  import Slick from 'vue-slick'
  const pageSize = 3;

  export default {
    name: 'wishlist',
    components: {
      Slick,
      Paginate,
    },
    data: function () {
      return {
        page: 1,
        showWishlist: false,
        wishlist: [],
        slickOptions: {
          slidesToShow: 1,
          slidesPerRow: 1,
          mobileFirst: true,
          prevArrow: '#sp-loyalty-wishlist .slick-prev',
          nextArrow: '#sp-loyalty-wishlist .slick-next',
          responsive: [
            {
              breakpoint: 550,
              settings: {
                slidesPerRow: 2
              }
            },
            {
              breakpoint: 1000,
              settings: {
                slidesPerRow: 1,
                row: 3
              }
            }
          ]
        },
      }
    },
    mounted() {
      this.$http.get(this.$parent.$parent.config.urls.get_wish_list).then(response => {
        this.wishlist = response.body.wishlist
      });
    },
    computed: {
      totalPages() {
        return Math.ceil(this.wishlist.length / pageSize)
      }
    },
    methods: {

      getPage(arr) {
        let start = (this.page-1) * pageSize
        let end = start + pageSize
        return arr.slice(start, end)
      },

      setPage(pageNumber) {
        this.page = pageNumber
      },

      next() {
        this.$refs.wishlist.next();
      },

      prev() {
        this.$refs.wishlist.prev();
      },

      reInit() {
        // Helpful if you have to deal with v-for to update dynamic lists
        this.$nextTick(() => {
          this.$refs.wishlist.reSlick();
        });
      },
    },
  }

</script>

<style scoped lang="stylus">

    @import '~slick-carousel/slick/slick.css';

    #sp-loyalty-wishlist
        position relative
        box-sizing border-box
        padding 35px 25px 25px
        @media screen and (min-width: 780px)
            padding 40px
        @media screen and (min-width: 1050px)
            padding 60px 25px
            & >>> .slick-arrow
                  display none !important
        @media screen and (min-width: 1100px)
            padding 60px 40px

        .sp-popup-buttons-wrapper
            @media screen and (min-width: 780px)
                margin-top 20px
                text-align right

    .sp-wishlist-container
        text-align center
        height 100%
        display flex
        justify-content center
        align-items center
        flex-wrap wrap
        // Fix slickjs slider issue
        // https://stackoverflow.com/questions/45962822/slick-slider-not-working-in-a-flex-container
        .slick-slider
            width 100%
            order 0
            flex 0 1 auto
            align-self center

    .sp-wishlist-list
        overflow hidden
        &.sp-m-flex
            flex-wrap: wrap
            align-items center
            justify-content center
        &.sp-wishlist-list-slider
            @media screen and (min-width: 1050px)
                display none
        .sp-wishlist-list-item
            display flex
            justify-content space-between
            flex-wrap wrap
            text-decoration none
            color black
            width 100%
            @media screen and (min-width: 1050px)
                margin-top 25px
                &:first-child
                    margin-top 0
                &:last-child
                    margin-bottom 0
            img
                max-width 80px
                width auto
                height 85px
                @media screen and (min-width: 780px)
                    max-width 90px
                    height 120px
                @media screen and (min-width: 1050px)
                    max-height 115px
            .sp-wishlist-list-item-info
                width calc(100% - 90px)
                margin-top 10px
                box-sizing border-box
                @media screen and (min-width: 780px)
                    padding 0 10px
            .sp-wishlist-list-item-title
                text-align left
                display flex
                align-items center
                height 40px
                @media screen and (min-width: 780px)
                    height 55px
                    &:hover
                        text-decoration underline
                span
                    display inline-block
                    width 100%
                    font-size 10px
                    line-height 12px
                    @media screen and (min-width: 780px)
                        font-size 14px
                        line-height 19px
                    @media screen and (min-width: 1050px)
                        font-size 13px
                        line-height 18px
            .sp-wishlist-list-item-price
                max-width 150px
                font-size 10px
                line-height 12px
                overflow hidden
                margin-top 8px
                display flex
                justify-content center
                border-radius 12px
                background: #68A5B7
                text-align center
                white-space nowrap
                @media screen and (min-width: 780px)
                    max-width 180px
                    margin-top 12px
                    font-size 15px
                    line-height 18px
                    border-radius 18px
                @media screen and (min-width: 1050px)
                    font-size 15px
                    line-height 18px
                    &:hover
                        background #75b0bd
                        .sp-wishlist-list-item-price-value
                            background #f17a5e
                img
                    display inline-block
                    vertical-align middle
                    width auto
                    height 8px
                    margin-top 1px
                    margin-right 3px
                    @media screen and (min-width: 780px)
                        height 16px
                        margin-top 0
                        margin-right 6px
                span
                    margin 0
                    padding 6px 0
                    border-radius 12px
                    color white
                    position relative
                    @media screen and (min-width: 780px)
                        border-radius 18px
                        padding 9px 0
                &-value
                    background #EF6747
                    z-index 2
                    width 100%
                &-value-old
                    width 70%
                    z-index 1
                    &:after
                        content ''
                        width 80%
                        height 1px
                        background-color #EF6747
                        left 10%
                        top 50%
                        transform rotate(-6deg)
                        display block
                        z-index: 1
                        position absolute
    .sp-wishlist-empty
        box-sizing border-box
        font-size 10px
        line-height 15px
        text-align left
        color #68A5B7
        vertical-align middle
        display flex
        align-items center
        justify-content center
        flex-wrap wrap
        flex-direction column
        @media screen and (min-width: 780px)
            font-size 14px
        @media screen and (min-width: 1050px)
            /*margin-top 15px*/
        img
            margin-right 6px
            display inline-block
            vertical-align middle
            width 40px
            height 40px
        span
            display inline-block
            vertical-align middle
        a
            display block
            margin-top 20px
            font-size 15px
            line-height 18px
            color #EF6747
            border 1px solid #EF6747
            border-radius 19px
            padding 9px 33px
            text-decoration none

    .sp-popup-wishlist
        .sp-container
            padding 35px 25px 25px
        .sp-wishlist-list-item
            margin-top 20px
            &:first-child
                margin-top 5px
            &:last-child
                margin-bottom 30px

    #sp-loyalty-wishlist >>> .sp-history-pagination
        position absolute
        font-size 16px
        line-height 20px
        list-style none
        padding 0
        margin 0
        margin-top 7px
        a
            width 32px
            height 32px
            margin-right 14px
            border-radius 50%
            border 1px solid #68A5B7
            color #68A5B7
            box-sizing border-box
            display inline-block
            line-height 30px
            text-align center
        li
            display inline-block
            &:first-child, &:last-child
                display none
            &.active
                a
                    color white
                    background #68A5B7

</style>