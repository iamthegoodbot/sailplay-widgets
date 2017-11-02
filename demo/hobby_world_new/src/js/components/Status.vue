<template>
    <div id="sp-loyalty-status">
        <div class="sp-status-container">

            <div class="sp-status-progress sp-m-mobile sp-m-block" :style="{ width: '100%', height: getStatusHeight }"></div>
            <div class="sp-status-progress sp-m-tablet sp-m-block" :style="{ width: getStatusWidth, height: '100%' }"></div>
            <img class="sp-status-bg sp-m-mobile sp-m-block" src="~/img/bg-status-mobile.svg"/>
            <img class="sp-status-bg sp-m-tablet sp-m-block" src="~/img/bg-status-tablet.svg"/>
            <img class="sp-status-bg sp-m-desktop sp-m-block" src="~/img/bg-status-desktop.svg"/>
            <div class="sp-status-list">

                <div class="sp-status-item" v-for="(status, index) in $parent.badges.multilevel_badges[0]" :key="index">
                    <div v-if="!status.is_received && getPurchaseOffset(status)"
                         :class="{'sp-m-left': index == ($parent.badges.multilevel_badges[0].length - 1)}"
                         class="sp-status-offset sp-m-desktop sp-m-block">Осталось&nbsp;{{ getPurchaseOffset(status) }}&nbsp;рублей</div>
                    <img :src="status.is_received ? status.thumbs.url_250x250 : status.thumbs.url_gs">
                    <div class="sp-status-info">
                        <div class="sp-status-name">{{ status.name }}</div>
                        <div class="sp-status-descr">{{ status.descr }}</div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>

  const PURCHASE_SUM_TAG = 10000017

  export default {
    name: 'status',
    components: {
    },
    data: function () {
      return {

      }
    },
    methods: {

      getPurchaseOffset(badge, sum) {
        let event = badge && badge.rules && badge.rules.filter(tag => tag.event_id == PURCHASE_SUM_TAG)[0];
        let need_sum = event.value_to_success || 0
        let purchase_sum = this.$parent.user.purchases.sum || 0
        return need_sum ? need_sum - purchase_sum : 0
      }

    },
    computed: {

      getStatusWidth: function () {
        let badges = this.$parent.badges.multilevel_badges[0]
        if(!badges || !badges.length) return 0
        let received_statuses = badges.filter(function (badge) {
          return badge.is_received
        }).length
        let map = [0, 38.1, 69, 100];
        return map[received_statuses] ? map[received_statuses] + '%' : 0
      },

      getStatusHeight: function () {
        let badges = this.$parent.badges.multilevel_badges[0]
        if(!badges || !badges.length) return 0
        let received_statuses = badges.filter(function (badge) {
          return badge.is_received
        }).length
        let map = [0, 40, 68, 98]
        return map[received_statuses] ? map[received_statuses] + '%' : 0
      },

    },
  }

</script>

<style scoped lang="stylus">

    #sp-loyalty-status
        position relative
        box-sizing border-box
        width 100%
        @media screen and (min-width: 1050px)
            overflow visible

    .sp-status-container
        text-align center
        background #c4cccc
        max-width 275px
        width 100%
        height auto
        position relative
        margin 0 auto
        @media screen and (min-width: 780px)
            max-width none

    #sp-loyalty-status
        .sp-status-bg.sp-m-tablet.sp-m-block
            @media screen and (min-width: 1050px)
                display none !important

    .sp-status-bg
        width 100%
        height auto
        position relative
        left 0
        top 0
        z-index 2
        transform scale(1.05)
        display block
        padding-bottom 2%
        @media screen and (min-width: 780px)
            padding 0
        @media screen and (min-width: 1050px)
            transform scale(1.01)

    .sp-status-progress
        z-index 1
        width 100%
        height 0
        background #F9A300
        position absolute
        left 0
        top 0

    .sp-status-list
        .sp-status-item
            position absolute
            display flex
            align-items center
            z-index 3
            text-align left
            @media screen and (min-width: 780px)
                flex-direction column
            &:nth-child(1)
                top 22.8%
                left 20%
                width 100%
                height 17%
                @media screen and (min-width: 780px)
                    top 22.5%
                    left 23.55%
                    width 15.4%
                    height 60%
                    @-moz-document url-prefix()
                        &
                            top 22.8% !important
                @media screen and (min-width: 1050px)
                    top 21%
                    left 19.54%
                    width 13.5%
                    @-moz-document url-prefix()
                        &
                            top 21.2% !important
                img
                    max-width 50%
                    max-height 90%
                    @media screen and (min-width: 780px)
                        max-width 90%
                        max-height none
            &:nth-child(2)
                top 53.1%
                left 20.4%
                width 100%
                height 17%
                @media screen and (min-width: 780px)
                    top 22.5%
                    left 54.4%
                    width 15.4%
                    height 60%
                    @-moz-document url-prefix()
                        &
                            top 22.5% !important
                @media screen and (min-width: 1050px)
                    top 21%
                    left 53.44%
                    width 13.5%
                    @-moz-document url-prefix()
                        &
                            top 21% !important
                            left 53.35% !important
                img
                    max-width 50%
                    max-height 90%
                    @media screen and (min-width: 780px)
                        max-width: 90%
                        max-height: none
            &:nth-child(3)
                top 82.6%
                left 20.4%
                width 100%
                height 17%
                @media screen and (min-width: 780px)
                    top 22.5%
                    left 85%
                    width 15.4%
                    height 66%
                    @-moz-document url-prefix()
                        &
                            top 22.5% !important
                            left 84.9% !important
                @media screen and (min-width: 1050px)
                    top 21%
                    left 87.15%
                    width 13.5%
                    @-moz-document url-prefix()
                        &
                            top 21% !important
                            left 87.1% !important
                img
                    max-width 50%
                    max-height 90%
                    @media screen and (min-width: 780px)
                        max-width: 90%
                        max-height: none
            img
                display inline-block
            .sp-status-offset
                opacity 0
                visibility hidden
                font-size 13px
                position absolute
                color rgba(0, 0, 0, 0.3)
                height auto
                text-align center
                display block
                width: 200px
                top 0
                left 50%
                transform translateX(-50%)
                transition .3s ease
                line-height 14px
                padding 13px 0
                background white
                box-shadow 0px 0px 6px 0px rgba(63, 40, 19, 0.1)
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
                &.sp-m-left
                    left 30%
                    &:after
                        left 62%
                        margin 0
                        right auto

            &:hover
                .sp-status-offset
                    opacity 1
                    top -55px
                    visibility visible
                    @-moz-document url-prefix()
                        &
                            top -56px !important
            .sp-status-info
                padding-left 20px
                box-sizing border-box
                @media screen and (min-width: 780px)
                    padding-left 0
                    padding-top 15px
                    text-align center
                    @media screen and (min-width: 1050px)
                        padding-top 10px
                .sp-status-name
                    font-weight 900
                    font-size 15px
                    line-height 18px
                    @media screen and (min-width: 1050px)
                        font-size 16px
                        line-height 20px
                .sp-status-descr
                    color rgba(0, 0, 0, 0.5)
                    font-size 10px
                    line-height 12px
                    margin-top 4px
                    @media screen and (min-width: 780px)
                        font-size 14px
                        line-height 17px
                        margin-top 4px
                    @media screen and (min-width: 1050px)
                        font-size 12px
                        line-height 15px
                        margin-top 5px

</style>