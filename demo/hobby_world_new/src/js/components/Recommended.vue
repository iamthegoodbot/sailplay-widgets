<template>
    <div id="sp-loyalty-recommended" v-if="recommended.length">
        <div class="sp-container-title">Рекомендованные товары</div>
        <div class="sp-recommended-container">

            <slick class="sp-recommended-list" ref="recommended" :options="slickOptions">
                <div v-for="(item, index) in recommended" :key="index">
                    <a :href="item.link" class="sp-recommended-list-item">
                        <img :src="item.image">
                        <div class="sp-recommended-list-item-info">
                            <div class="sp-recommended-list-item-title">
                                <span>{{ item.title }}</span>
                            </div>
                            <div class="sp-recommended-list-item-price">
                                <span class="sp-recommended-list-item-price-value">
                                    <img src="~/img/icon-price.svg">
                                    {{ item.price || 0 }}&nbsp;руб.
                                </span>
                                <span v-if="item.old_price" class="sp-recommended-list-item-price-value-old">
                                    {{ item.old_price || 0 }}&nbsp;руб.
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            </slick>

        </div>
        <div v-if="recommended.length" class="slick-prev slick-arrow"></div>
        <div v-if="recommended.length" class="slick-next slick-arrow"></div>
    </div>
</template>

<script>

  import Slick from 'vue-slick';

  export default {
    name: 'recommended',
    components: {
      Slick
    },
    data: function () {
      return {
        recommended: [],
        slickOptions: {
          slidesToShow: 1,
          slidesPerRow: 1,
          mobileFirst: true,
          arrows:true,
          accessibility: false,
          prevArrow: '#sp-loyalty-recommended .slick-prev',
          nextArrow: '#sp-loyalty-recommended .slick-next',
          responsive: [
            {
              breakpoint: 550,
              settings: {
                slidesPerRow: 2
              }
            },
            {
              breakpoint: 780,
              settings: {
                slidesPerRow: 3
              }
            }
          ]
        },
      }
    },
    mounted() {
      this.$http.get(this.$parent.$parent.config.urls.get_recommend_list).then(response => {
        this.recommended = response.body.upsale
        this.reInit()
      });
    },
    methods: {
      next() {
        this.$refs.recommended.next();
      },

      prev() {
        this.$refs.recommended.prev();
      },

      reInit() {
        // Helpful if you have to deal with v-for to update dynamic lists
        this.$nextTick(() => {
          this.$refs.recommended.reSlick();
        });
      },
    },
  }

</script>

<style scoped lang="stylus">

    #sp-loyalty-recommended
        position relative
        box-sizing border-box
        padding 35px 25px 25px
        @media screen and (min-width: 780px)
            padding 40px 25px 25px
        @media screen and (min-width: 1050px)
            padding 60px 25px 25px

    .sp-recommended-container
        text-align center

    .sp-recommended-list
        overflow hidden
        .sp-recommended-list-item
            display flex
            justify-content space-between
            flex-wrap wrap
            text-decoration none
            color black
            width 100%
            @media screen and (min-width: 780px)
                text-align center
                justify-content center
            img
                max-width 80px
                width auto
                height 85px
                @media screen and (min-width: 780px)
                    max-width 130px
                    height 160px
                @media screen and (min-width: 1050px)
                    max-width none
                    height 170px
            .sp-recommended-list-item-info
                width calc(100% - 80px)
                margin-top 10px
                box-sizing border-box
                @media screen and (min-width: 780px)
                    width 100%
            .sp-recommended-list-item-title
                text-align left
                display flex
                align-items center
                height 40px
                @media screen and (min-width: 780px)
                    height 42px
                    text-align center
                @media screen and (min-width: 1050px)
                    height 57px
                    &:hover
                        text-decoration underline
                span
                    display inline-block
                    width 100%
                    font-size 10px
                    line-height 12px
                    @media screen and (min-width: 780px)
                        font-size 12px
                        line-height 14px
                    @media screen and (min-width: 1050px)
                        font-size 13px
                        line-height 19px
            .sp-recommended-list-item-price
                max-width 150px
                font-size 10px
                line-height 12px
                overflow hidden
                margin-top 8px
                display flex
                justify-content center
                border-radius 12px
                background: #68A5B7
                white-space nowrap
                @media screen and (min-width: 780px)
                    max-width 180px
                    margin 12px auto 0
                    font-size 15px
                    line-height 18px
                    border-radius 18px
                @media screen and (min-width: 1050px)
                    &:hover
                        background #75b0bd
                        .sp-recommended-list-item-price-value
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
</style>