<template>
    <div id="sp-loyalty-status">
        <div class="sp-status-container">

            <div class="sp-status-progress sp-m-mobile sp-m-block" :style="{ width: '100%', height: getStatusHeight }"></div>
            <div class="sp-status-progress sp-m-tablet sp-m-block" :style="{ width: getStatusWidth, top: '1%', left: '1%', height: '98%' }"></div>
            <img class="sp-status-bg sp-m-mobile sp-m-inline-block" src="~/img/bg-status-mobile.svg"/>
            <img class="sp-status-bg sp-m-table sp-m-inline-block" src="~/img/bg-status-tablet.svg"/>
            <img class="sp-status-bg sp-m-desktop sp-m-inline-block" src="~/img/bg-status-desktop.svg"/>
            <div class="sp-status-list">

                <div class="sp-status-item" v-for="(status, index) in $parent.badges.multilevel_badges[0]" :key="index">
                    <div v-if="!status.is_received && getPurchaseOffset(status)" class="sp-status-offset sp-m-desktop sp-m-block">Осталось&nbsp;{{ getPurchaseOffset(status) }}&nbsp;рублей</div>
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
        let map = [0, 37.3, 67, 98];
        return map[received_statuses] ? map[received_statuses] + '%' : 0
      },

      getStatusHeight: function () {
        let badges = this.$parent.badges.multilevel_badges[0]
        if(!badges || !badges.length) return 0
        let received_statuses = badges.filter(function (badge) {
          return badge.is_received
        }).length
        let map = [0, 40, 68, 98];
        return map[received_statuses] ? map[received_statuses] + '%' : 0
      },

    },
  }

</script>

<style scoped lang="stylus">

    #sp-loyalty-status
        position relative
        box-sizing border-box
        overflow hidden
        width 100%
        @media screen and (min-width: 1050px)
            overflow visible

    .sp-status-container
        text-align center
        background #C4CCCC
        width 290px
        height 715px
        position relative
        margin 0 auto
        @media screen and (min-width: 780px)
            width 100%
            height 100%
            background transparent
            &:before
                content ''
                display block
                width: 98%
                height 98%
                top 0
                left 0
                right 0
                bottom 0
                margin auto
                background #C4CCCC
                position absolute
                @media screen and (min-width: 1050px)
                    width 96.5%
                    height 96%

    .sp-status-bg
        width calc(100% + 2px)
        height calc(100% + 2px)
        position relative
        left -1px
        top -1px
        z-index 2
        display block
        @media screen and (min-width: 780px)
            top auto
            left auto
            width 100%
            height auto
        @media screen and (min-width: 1050px)
            width: 97%;
            &.sp-m-table
                display none !important

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
                top 165px
                left 56.5px
                @media screen and (min-width: 780px)
                    top 15.5%
                    left 23.55%
                    width 16.4%
                    @-moz-document url-prefix()
                        &
                            top 18.2% !important
                @media screen and (min-width: 1050px)
                    top 12%
                    left 19.95%
                    width 14.2%
                    @-moz-document url-prefix()
                        &
                            top 14.5% !important
                img
                    width 113px
                    max-height 113px
                    @media screen and (min-width: 780px)
                        max-height none
                        width 89.4%
                        margin-top 5.1%
            &:nth-child(2)
                top 368px
                left 58px
                @media screen and (min-width: 780px)
                    top 15.3%
                    left 53.2%
                    width 16.4%
                    @-moz-document url-prefix()
                        &
                            top 17.5% !important
                @media screen and (min-width: 1050px)
                    top 11.1%
                    left 52.6%
                    width 14.5%
                    @-moz-document url-prefix()
                        &
                            top 13.5% !important
                img
                    width 116px
                    max-height 116px
                    @media screen and (min-width: 780px)
                        max-height none
                        width 91%
                        margin-top 4.2%
            &:nth-child(3)
                top 576px
                left 58px
                @media screen and (min-width: 780px)
                    top 15.3%
                    left 82.3%
                    width 16.4%
                    @-moz-document url-prefix()
                        &
                            top 17% !important
                            left 82.2% !important
                @media screen and (min-width: 1050px)
                    top 11.4%
                    left 85.2%
                    width 14.3%
                    @-moz-document url-prefix()
                        &
                            top 13.4% !important
                            left 85.1% !important
                img
                    width 116px
                    max-height 116px
                    @media screen and (min-width: 780px)
                        max-height none
                        width 91.6%
                        margin-top 3.5%
            img
                display inline-block
            .sp-status-offset
                opacity 0
                visibility hidden
                font-size 13px
                position absolute
                color rgba(0, 0, 0, 0.3)
                line-height 44px
                height 55px
                text-align center
                display block
                top 0
                left 0
                right 0
                margin auto
                transition .3s ease;
                background url('../../img/bg-status-hint.svg') no-repeat center center / 200px auto
            &:hover
                .sp-status-offset
                    opacity 1
                    top -45px
                    visibility visible
                    @-moz-document url-prefix()
                        &
                            top -53px !important
            .sp-status-info
                padding-left 20px
                box-sizing border-box
                @media screen and (min-width: 780px)
                    padding-left 0
                    padding-top 5px
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