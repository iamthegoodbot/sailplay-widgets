<template>
    <div id="sp-loyalty-badges">
        <div class="sp-container-title">Бейджи</div>
        <div class="sp-badges-container">

            <slick v-if="isReceived($parent.badges.multilevel_badges[1]).length" class="sp-badges-list" ref="badges" :options="slickOptions">
                <div class="sp-badges-list-item" v-for="badge in isReceived($parent.badges.multilevel_badges[1])" :key="badge.id">
                    <img :src="badge.thumbs.url_250x250" />
                </div>
            </slick>

            <div class="sp-badges-empty" v-if="!isReceived($parent.badges.multilevel_badges[1]).length">
                <img src="~/img/icon-badges-empty.svg">
                <span>У вас пока нет бейджей</span>
            </div>
            <div class="sp-badges-info">Открыто <strong>{{ isReceived($parent.badges.multilevel_badges[1]).length || 0 }}</strong> бейджей из <strong>{{ $parent.badges.multilevel_badges[1].length || 0 }}</strong></div>
        </div>
        <div class="sp-m-text-center sp-link-bottom">
            <a href="#" v-if="$parent.badges.multilevel_badges[1].length" class="sp-link sp-m-small"
               v-on:click.prevent="showBadges = true;$parent.bodyLock(true)">Все бейджи</a>
        </div>

        <div class="sp-popup sp-popup-badges" v-if="showBadges">
            <div class="sp-popup-layout" v-on:click.prevent="showBadges = false;$parent.bodyLock(false)"></div>
            <div class="sp-popup-content">
                <i class="sp-popup-close" v-on:click.prevent="showBadges = false;$parent.bodyLock(false)"></i>
                <div class="sp-container">
                    <div class="sp-popup-title">
                        Бейджи
                        <span>Ваши достижения и награды</span>
                    </div>

                    <div class="sp-popup-badges-list sp-m-mobile sp-m-block">
                        <div class="sp-popup-badges-container" v-for="(field, index) in mapMobile" :key="index">
                            <img v-for="(badge, index) in mobileMapedBadges[index]" :key="index"
                                 :class="{'sp-m-active': activeBadge && activeBadge.id == badge.id}"
                                 v-on:click.prevent="active = badge.id"
                                 :src="badge.is_received ? badge.thumbs.url_250x250 : badge.thumbs.url_gs" />
                        </div>
                    </div>

                    <div class="sp-popup-badges-list sp-m-tablet sp-m-block">
                        <div class="sp-popup-badges-container" v-for="(field, index) in mapTablet"
                             :key="index">
                            <img v-for="(badge, index) in tabletMapedBadges[index]" :key="index"
                                 :class="{'sp-m-active': activeBadge && activeBadge.id == badge.id}"
                                 v-on:click.prevent="active = badge.id"
                                 :src="badge.is_received ? badge.thumbs.url_250x250 : badge.thumbs.url_gs"/>
                        </div>
                    </div>

                    <div class="sp-popup-badge-info">
                        <div class="sp-popup-badge-info-name" v-html="activeBadge && activeBadge.name || '&nbsp;'"></div>
                        <div class="sp-popup-badge-info-descr" v-html="activeBadge && activeBadge.descr || '&nbsp;'"></div>
                    </div>

                    <div class="sp-popup-buttons-wrapper">
                        <a href="#" class="sp-popup_button"
                           v-on:click.prevent="showBadges = false;$parent.bodyLock(false)">Закрыть</a>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
  import SAILPLAY from 'sailplay-hub'
  import Slick from 'vue-slick'
  export default {
    name: 'badges',
    components: {
      Slick
    },
    data: function(){
      return {
        active: null,
        showBadges: false,
        mapMobile: [1,2,3,2,3],
        mapTablet: [5, 6],
        slickOptions: {
          arrows: false,
          dots: true,
          slidesToShow: 1,
          slidesPerRow: 4,
          mobileFirst: true,
          accessibility: false,
          responsive: [
            {
              breakpoint: 780,
              settings: {
                slidesPerRow: 8
              }
            },
            {
              breakpoint: 1000,
              settings: {
                slidesPerRow: 4
              }
            },
          ]
        },
      }
    },
    mounted: function() {
      this.setDefaultBadge()
      SAILPLAY.on('load.badges.list.success', function(){
        this.$nextTick(this.setDefaultBadge)
      }.bind(this))
    },
    computed: {
      activeBadge(){
        return this.$parent.badges.multilevel_badges[1].filter(badge => badge.id == this.active)[0]
      },

      mobileMapedBadges() {
        let limit = 0
        let badges = this.$parent.badges.multilevel_badges[1]
        return this.mapMobile.map(function(item, index){
          let line = badges.slice(limit, limit + item);
          limit+=item;
          return line;
        }.bind(this));
      },

      tabletMapedBadges() {
        let limit = 0
        let badges = this.$parent.badges.multilevel_badges[1]
        return this.mapTablet.map(function(item, index){
          let line = badges.slice(limit, limit + item);
          limit+=item;
          return line;
        }.bind(this));
      },

    },
    methods: {
      setDefaultBadge: function(){
        let received = this.isReceived(this.$parent.badges.multilevel_badges[1]);
        if(received && received.length){
          this.active = received[0].id
        } else if(this.$parent.badges.multilevel_badges[1][0]){
          this.active = this.$parent.badges.multilevel_badges[1][0].id
        }
      },
      // should be filter, but i can't find fast solution
      isReceived: function (badges) {
        if (!badges) return [];
        return badges.filter(badge => badge.is_received)
      }
    }
  }

</script>

<style scoped lang="stylus">

    #sp-loyalty-badges
        position relative
        box-sizing border-box
        padding 40px 25px 50px
        width 100%
        @media screen and (min-width: 780px)
            padding 50px 25px
    .sp-badges-container
        text-align center
        & >>> .slick-dots
            position absolute
            bottom -50px

    .sp-badges-list
        .sp-badges-list-item
            width 52px
            height 58px
            @media screen and (min-width: 780px)
                max-width 72px
                height 85px
            @media screen and (min-width: 1050px)
                max-width 80px
                height 90px
            img
                max-width 100%
                max-height 100%
                display inline-block

    .sp-badges-info
        font-size 10px
        line-height 14px
        margin-top 10px
        @media screen and (min-width: 780px)
            font-size 13px
            line-height 19px
        strong
            font-weight bold

    .sp-badges-empty
        padding 10px 47px
        box-sizing border-box
        font-size 10px
        line-height 15px
        text-align left
        color #68A5B7
        vertical-align middle
        display flex
        align-items center
        justify-content center
        @media screen and (min-width: 780px)
            font-size 14px
        @media screen and (min-width: 1050px)
            line-height 20px
            padding 25px 47px
        img
            margin-right 6px
            display inline-block
            vertical-align middle
            width 50px
            height 38px
            @media screen and (min-width: 1050px)
                width auto
                height 48px
                margin-right 10px
        span
            display inline-block
            vertical-align middle

    .sp-popup-badges
        .sp-container
            padding 35px 25px 25px
        .sp-popup-buttons-wrapper
            text-align center
        .sp-popup-badge-info
            margin-top 20px
            padding 20px 0
            text-align center
            border-top 1px solid rgba(224, 224, 224, 0.7)
            &-name
                font-weight 900
                font-size 15px
                line-height 18px
                text-transform uppercase
                @media screen and (min-width: 780px)
                    font-size 20px
                    line-height 24px
            &-descr
                padding-top 5px
                font-size 10px
                line-height 14px
                @media screen and (min-width: 780px)
                    margin-top 15px
                    line-height 17px
                    font-size 13px
        .sp-popup-badges-container
            margin-top -20px
            &:first-child
                margin-top 0
        .sp-popup-badges-list
            text-align center
            margin-top 20px
            img
                display inline-block
                width auto
                height 66px
                margin-right -8px
                @media screen and (min-width: 780px)
                    height 100px
                &.sp-m-active
                    transform scale(1.4)
                &:last-child
                    margin-right 0

    #sp-loyalty-badges >>> .slick-dots 
        position absolute
        bottom -45px
        justify-content center
        list-style none
        display flex
        padding 0
        margin 0
        width 100%
        li 
            position relative
            display inline-block
            height 7px
            width 7px
            margin 0 7px 0 0
            border-radius 50%
            background rgba(0, 0, 0, 0.2)
            padding 0
            cursor pointer
            button 
                display none
            &.slick-active
                background #FEA818
            &:hover
                opacity .8

</style>