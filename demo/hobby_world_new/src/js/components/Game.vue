<template>
    <div id="sp-loyalty-game" v-if="game && game.title">
        <div class="sp-container-title">Игра дня</div>
        <a :href="game.link" class="sp-game-container">
            <div class="sp-game-info">
                <div class="sp-game-info-title">
                    <span>{{ game.title }}</span>
                </div>
                <div class="sp-game-price">
                    <span class="sp-game-price-value">
                        <img src="~/img/icon-price.svg">
                        {{ game.price || 0 }}&nbsp;руб.
                    </span>
                    <span v-if="game.old_price" class="sp-game-price-value-old">
                        {{ game.old_price || 0 }}&nbsp;руб.
                    </span>
                </div>
            </div>
            <img :src="game.image">
        </a>
    </div>
</template>

<script>

  export default {
    name: 'game',
    components: {},
    data: function () {
      return {
        game: {}
      }
    },
    mounted() {
      this.$http.get(this.$parent.$parent.config.urls.get_game_of_the_day).then(response => {
        this.game = response.body.game_of_day[0]
      });
    },
    methods: {},
  }

</script>

<style scoped lang="stylus">

    #sp-loyalty-game
        position relative
        box-sizing border-box
        padding 40px 22px 22px
        width 100%
        @media screen and (min-width: 780px)
            padding 50px
            display flex
            justify-content center
        @media screen and (min-width: 1050px)
            padding 60px 60px 40px
    .sp-game-container
        display flex
        justify-content space-evenly
        flex-wrap wrap
        text-decoration none
        color black
        width 100%
        @media screen and (min-width: 780px)
            flex-direction row-reverse
            width 60%
            justify-content center
        @media screen and (min-width: 1050px)
            flex-direction column-reverse
            width 100%
        img
            max-width 80px
            width auto
            height 100px
            @media screen and (min-width: 780px)
                max-width 130px
                height 130px
                margin-right 20px
            @media screen and (min-width: 1050px)
                height 170px
                width auto
                margin auto
        .sp-game-info
            width auto
            margin-top 20px
            box-sizing border-box
            @media screen and (min-width: 780px)
                max-width 190px
            @media screen and (min-width: 1050px)
                max-width 100%
                width 100%
                margin-top 10px
        .sp-game-info-title
            text-align left
            display flex
            align-items center
            height 40px
            @media screen and (min-width: 780px)
                height 60px
            @media screen and (min-width: 1050px)
                height: 57px;
                text-align center
                &:hover
                    text-decoration underline
            span
                display inline-block
                width 100%
                font-size 10px
                line-height 12px
                @media screen and (min-width: 780px)
                    font-size 13px
                    line-height 19px
        .sp-game-price
            max-width 150px
            font-size 10px
            line-height 12px
            overflow hidden
            margin-top 8px
            display flex
            justify-content stretch
            border-radius 12px
            background: #68A5B7
            text-align center
            white-space nowrap
            @media screen and (min-width: 780px)
                max-width 180px
                margin 12px auto 0
                font-size 15px
                line-height 18px
                border-radius 18px
            @media screen and (min-width: 1050px)
                max-width 190px
                &:hover
                    background #75b0bd
                    .sp-game-price-value
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
                padding 6px 10px
                border-radius 12px
                color white
                position relative
                @media screen and (min-width: 780px)
                    border-radius 18px
                    padding 9px 10px
            &-value
                background #EF6747
                z-index 2
                width auto
            &-value-old
                width auto
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