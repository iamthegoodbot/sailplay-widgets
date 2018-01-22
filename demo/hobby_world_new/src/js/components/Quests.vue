<template>
    <div id="sp-loyalty-quests">

        <div class="sp-container-title">Задания</div>

        <div class="sp-quests-container">

            <div class="sp-quests-list sp-m-mobile sp-m-flex">
                <div class="sp-quests-list-item" v-for="(action, index) in getActions" :key="index"
                     v-on:click.prevent="showQuest = action;$parent.bodyLock(true)">
                    <div class="sp-quests-item-container" v-if="action._actionId">
                        <div class="sp-quests-item-info">
                            <span>{{ getActionData(action).name }}</span>
                            <strong>{{ action.points }}</strong>
                        </div>
                        <img class="sp-quests-item-image" :src="getActionData(action).image">
                    </div>
                    <div class="sp-quests-item-container" v-if="!action._actionId">
                        <div class="sp-quests-item-info">
                            <span>{{ action.name }}</span>
                            <strong>{{ getActionPoints(action) }}</strong>
                        </div>
                        <div class="sp-quests-item-image">
                            <img :src="action.icon">
                        </div>
                    </div>
                </div>
            </div>

            <slick v-if="getActions.length" class="sp-quests-list sp-m-tablet sp-m-block" ref="quests" :options="slickOptions">
                <div class="sp-quests-list-item" v-for="(action, index) in getActions" :key="index"
                     v-on:click.prevent="showQuest = action;$parent.bodyLock(true)">

                    <div class="sp-quests-item-container" v-if="action._actionId">
                        <div class="sp-quests-item-info">
                            <span>{{ getActionData(action).name }}</span>
                            <strong>{{ action.points }}</strong>
                        </div>
                        <img class="sp-quests-item-image" :src="getActionData(action).image">
                    </div>

                    <div class="sp-quests-item-container" v-else>
                        <div class="sp-quests-item-info">
                            <span>{{ action.name }}</span>
                            <strong>{{ getActionPoints(action) }}</strong>
                        </div>
                        <div class="sp-quests-item-image">
                            <img :src="action.icon">
                        </div>
                    </div>

                    <div class="sp-quests-item-button sp-m-desktop sp-m-block">
                        <span>Выполнить</span>
                    </div>

                </div>
            </slick>

            <div v-if="getActions.length && getActions.length > 6" class="slick-prev slick-arrow sp-m-tablet sp-m-block"></div>
            <div v-if="getActions.length && getActions.length > 6" class="slick-next slick-arrow sp-m-tablet sp-m-block"></div>

        </div>

        <div class="sp-popup sp-popup-quest" v-if="showQuest">
            <div class="sp-popup-layout" v-on:click.prevent="showQuest = false;$parent.bodyLock(false)"></div>
            <div class="sp-popup-content">
                <i class="sp-popup-close" v-on:click.prevent="showQuest = false;$parent.bodyLock(false)"></i>
                <div class="sp-container">

                    <div class="sp-popup-quest-container">
                        <div class="sp-popup-quest-name" v-if="showQuest && showQuest._actionId">
                            {{ getActionData(showQuest).name }}
                        </div>
                        <div class="sp-popup-quest-name" v-if="showQuest && !showQuest._actionId">
                            {{ showQuest && showQuest.name }}
                        </div>
                        <div class="sp-popup-quest-iframe"
                             v-if="showQuest && !showQuest._actionId"
                             v-spCustomAction="showQuest"></div>
                    </div>

                    <div class="sp-popup-quest-btns">
                        <a href="#" class="sp-popup_button"
                           v-on:click.prevent="showQuest = false;$parent.bodyLock(false)">Закрыть</a>

                        <a href="#" class="sp-popup_button"
                           v-if="showQuest && showQuest._actionId"
                           v-spAction="showQuest"
                           :text="'Выполнить'" :styles="getActionStyle(getActionData(showQuest))">Выполнить</a>
                    </div>

                </div>
            </div>
        </div>


    </div>
</template>

<script>

  import SAILPLAY from 'sailplay-hub'
  import 'sailplay-hub-actions/sailplay.hub.actions';
  import $ from 'jquery'
  import Slick from 'vue-slick'

  const actions_data = {
    "system": {
      "inviteFriend": {
        "name": 'Пригласить друга',
        "image": require("../../img/icon-quest-invite.svg"),
      }
    },
    "social": {
      "fb": {
        "like": {
          "name": "Вступить в группу",
          "image": require("../../img/icon-quest-fb.svg"),
          "styles": {
            "fb_share_btn": {
              "font-family": "Arial",
              "box-sizing": "border-box",
              "width": "100%",
              "height": "100%",
              "text-decoration": "none",
              "color": "white",
              "font-weight": "normal",
              "position": "absolute",
              "left": "0",
              "top": "0",
              "border-radius": "18px",
              "font-size": "15px",
              "line-height": "44px",
              "background-color": "#ef6747",
              "cursor": "pointer",
              "display": "inline-block"
            },
            "fb_share_btn:hover": {
              "background-color": "#F57863"
            }
          }
        },
        "partner_page": {
          "name": "Рассказать о компании",
          "image": require("../../img/icon-quest-fb.svg"),
          "styles": {
            "fb_share_btn": {
              "font-family": "Arial",
              "box-sizing": "border-box",
              "width": "100%",
              "height": "100%",
              "text-decoration": "none",
              "color": "white",
              "font-weight": "normal",
              "position": "absolute",
              "left": "0",
              "top": "0",
              "border-radius": "18px",
              "font-size": "15px",
              "line-height": "44px",
              "background-color": "#ef6747",
              "cursor": "pointer",
              "display": "inline-block"
            },
            "fb_share_btn:hover": {
              "background-color": "#F57863"
            }
          }
        },
        "purchase": {
          "name": "Рассказать о покупке",
          "image": require("../../img/icon-quest-fb.svg"),
          "styles": {
            "fb_share_btn": {
              "font-family": "Arial",
              "box-sizing": "border-box",
              "width": "100%",
              "height": "100%",
              "text-decoration": "none",
              "color": "white",
              "font-weight": "normal",
              "position": "absolute",
              "left": "0",
              "top": "0",
              "border-radius": "18px",
              "font-size": "15px",
              "line-height": "44px",
              "background-color": "#ef6747",
              "cursor": "pointer",
              "display": "inline-block"
            },
            "fb_share_btn:hover": {
              "background-color": "#F57863"
            }
          }
        }
      },
      "vk": {
        "like": {
          "name": "Вступить в группу",
          "image": require("../../img/icon-quest-vk.svg"),
          "styles": {
            "vk_share_btn": {
              "font-family": "Arial",
              "box-sizing": "border-box",
              "width": "100%",
              "height": "100%",
              "text-decoration": "none",
              "color": "white",
              "font-weight": "normal",
              "position": "absolute",
              "left": "0",
              "top": "0",
              "border-radius": "18px",
              "font-size": "15px",
              "line-height": "44px",
              "background-color": "#ef6747",
              "cursor": "pointer",
              "display": "inline-block"
            },
            "vk_share_btn:hover": {
              "background-color": "#F57863"
            }
          }
        },
        "partner_page": {
          "name": "Рассказать о компании",
          "image": require("../../img/icon-quest-vk.svg"),
          "styles": {
            "vk_share_btn": {
              "font-family": "Arial",
              "box-sizing": "border-box",
              "width": "100%",
              "height": "100%",
              "text-decoration": "none",
              "color": "white",
              "font-weight": "normal",
              "position": "absolute",
              "left": "0",
              "top": "0",
              "border-radius": "18px",
              "font-size": "15px",
              "line-height": "44px",
              "background-color": "#ef6747",
              "cursor": "pointer",
              "display": "inline-block"
            },
            "vk_share_btn:hover": {
              "background-color": "#F57863"
            }
          }
        },
        "purchase": {
          "name": "Рассказать о покупке",
          "image": require("../../img/icon-quest-vk.svg"),
          "styles": {
            "vk_share_btn": {
              "font-family": "Arial",
              "box-sizing": "border-box",
              "width": "100%",
              "height": "100%",
              "text-decoration": "none",
              "color": "white",
              "font-weight": "normal",
              "position": "absolute",
              "left": "0",
              "top": "0",
              "border-radius": "18px",
              "font-size": "15px",
              "line-height": "44px",
              "background-color": "#ef6747",
              "cursor": "pointer",
              "display": "inline-block"
            },
            "vk_share_btn:hover": {
              "background-color": "#F57863"
            }
          }
        }
      },
      "ok": {
        "like": {
          "name": "Вступить в группу",
          "image": require("../../img/icon-quest-ok.svg"),
          "styles": {
            "ok_share_btn": {
              "font-family": "Arial",
              "box-sizing": "border-box",
              "width": "100%",
              "height": "100%",
              "text-decoration": "none",
              "color": "white",
              "font-weight": "normal",
              "position": "absolute",
              "left": "0",
              "top": "0",
              "border-radius": "18px",
              "font-size": "15px",
              "line-height": "44px",
              "background-color": "#ef6747",
              "cursor": "pointer",
              "display": "inline-block"
            },
            "ok_share_btn:hover": {
              "background-color": "#F57863"
            }
          }
        },
        "partner_page": {
          "name": "Рассказать о компании",
          "image": require("../../img/icon-quest-ok.svg"),
          "styles": {
            "ok_share_btn": {
              "font-family": "Arial",
              "box-sizing": "border-box",
              "width": "100%",
              "height": "100%",
              "text-decoration": "none",
              "color": "white",
              "font-weight": "normal",
              "position": "absolute",
              "left": "0",
              "top": "0",
              "border-radius": "18px",
              "font-size": "15px",
              "line-height": "44px",
              "background-color": "#ef6747",
              "cursor": "pointer",
              "display": "inline-block"
            },
            "ok_share_btn:hover": {
              "background-color": "#F57863"
            }
          }
        },
        "purchase": {
          "name": "Рассказать о покупке",
          "image": require("../../img/icon-quest-ok.svg"),
          "styles": {
            "ok_share_btn": {
              "font-family": "Arial",
              "box-sizing": "border-box",
              "width": "100%",
              "height": "100%",
              "text-decoration": "none",
              "color": "white",
              "font-weight": "normal",
              "position": "absolute",
              "left": "0",
              "top": "0",
              "border-radius": "18px",
              "font-size": "15px",
              "line-height": "44px",
              "background-color": "#ef6747",
              "cursor": "pointer",
              "display": "inline-block"
            },
            "ok_share_btn:hover": {
              "background-color": "#F57863"
            }
          }
        }
      },
      "tw": {
        "partner_page": {
          "name": "Рассказать в Twitter",
          "styles": {
            "tw_share_btn": {
              "font-family": "Arial",
              "box-sizing": "border-box",
              "width": "100%",
              "height": "100%",
              "text-decoration": "none",
              "color": "white",
              "font-weight": "normal",
              "position": "absolute",
              "left": "0",
              "top": "0",
              "border-radius": "18px",
              "font-size": "15px",
              "line-height": "44px",
              "background-color": "#ef6747",
              "cursor": "pointer",
              "display": "inline-block"
            },
            "tw_share_btn:hover": {
              "background-color": "#F57863"
            }
          }
        }
      }
    }
  }

  let stringify_widget_css = function (prefix, obj) {

    var css_string = '';

    for (var selector in obj) {

      if (obj.hasOwnProperty(selector)) {

        css_string += prefix + ' .' + selector + '{ ';

        var selector_styles = obj[selector];

        for (var prop in selector_styles) {

          if (selector_styles.hasOwnProperty(prop)) {

            css_string += prop + ':' + selector_styles[prop] + ' !important;';

          }

        }

        css_string += ' }';

      }

    }

    return css_string;

  }

  export default {
    name: 'quests',
    data: function () {
      return {
        showQuest: false,
        slickOptions: {
          slidesPerRow: 3,
          slidesToShow: 1,
          rows: 2,
          arrows:true,
          accessibility: false,
          prevArrow: '#sp-loyalty-quests .slick-prev',
          nextArrow: '#sp-loyalty-quests .slick-next',
        },
      }
    },
    components: {
      Slick
    },
    mounted: function(){

      SAILPLAY.on('actions.perform.success', function (res) {
        this.$parent.getUser()
        this.$parent.getHistory()
        this.$parent.getQuests()
        this.$nextTick(function(){
          this.showQuest = false
          this.$parent.showMessage = {
            title: 'Поздравляем',
            text: 'Задание выполнено'
          }
        })
      }.bind(this))

      SAILPLAY.on('actions.perform.error', function (res) {
        this.$nextTick(function(){
          this.showQuest = false
          this.$parent.showMessage = {
            title: 'Ошибка',
            text: res.message
          }
        })
      }.bind(this))

    },
    computed: {
      getActions: function(){
        return this.$parent.actions
      }
    },
    directives: {

      spCustomAction: {
        inserted: function (elm, binding, vnode) {

          let iframe = document.createElement('iframe');
          iframe.style.backgroundColor = "transparent";
          iframe.frameBorder = "0";
          iframe.allowTransparency = "true";
          $(elm).append(iframe);


          if (binding.value) {
            let config = SAILPLAY.config();
            iframe.src = (config && ((config.DOMAIN + config.urls.actions.custom.render.replace(':action_id', binding.value.id) + '?auth_hash=' + config.auth_hash + '&lang=' + config.lang))) || '';
            iframe.className = ['sailplay_action_custom_frame', binding.value.type].join(' ');
          } else {
            iframe.src = '';
          }

        }
      },

      spAction: {
        inserted: function (elm, binding, vnode) {

          let init_state
          init_state = elm.innerHTML

          $(elm).on('click', function (e) {
            e.preventDefault();
          })

          function parse_action(action) {
            $(elm).attr('styles') && $(elm).attr('data-styles', $(elm).attr('styles'))
            $(elm).attr('text') && $(elm).attr('data-text', $(elm).attr('text'))
            SAILPLAY.actions && action && SAILPLAY.actions.parse(elm, action)
          }

          parse_action(binding.value)

        }
      }

    },
    methods: {

      getActionPoints(action) {
        if(!action || !this.$parent.config) return;
        return this.$parent.config.actions_points[action.id]
      },


      getActionStyle: function (action_data) {
        return action_data.styles && stringify_widget_css('', action_data.styles);
      },

      getActionData: function (action) {
        let data = {};
        if (!action) return data;
        if (action.socialType) data = actions_data.social[action.socialType] && actions_data.social[action.socialType][action.action];
        if (actions_data.system[action.type]) data = actions_data.system[action.type];
        return data;
      },

      next() {
        this.$refs.quests.next();
      },

      prev() {
        this.$refs.quests.prev();
      },

      reInit() {
        // Helpful if you have to deal with v-for to update dynamic lists
        this.$nextTick(() => {
          this.$refs.quests.reSlick();
        });
      },

    }
  }

</script>

<style scoped lang="stylus">

    #sp-loyalty-quests
        position relative
        box-sizing border-box
        padding 26px 36px
        width 100%
        @media screen and (min-width: 780px)
            padding 50px 15px 35px

    .sp-quests-container
        text-align center
        display flex
        justify-content center
        align-items center
        height 100%
        // Fix slickjs slider issue
        // https://stackoverflow.com/questions/45962822/slick-slider-not-working-in-a-flex-container
        .slick-slider
            width 100%
            order 0
            flex 0 1 auto
            align-self center
        .slick-arrow
            top 12px !important

    .sp-quests-list
        display flex
        flex-direction row
        flex-wrap wrap
        justify-content space-between
        &.sp-m-tablet
            align-items flex-start
        @media screen and (min-width: 780px)
            justify-content space-around
            & >>> .slick-slide
                      text-align left
        .sp-quests-list-item
            width 100%
            padding 18px
            box-sizing border-box
            border 2px solid rgba(224, 224, 224, 0.7)
            border-radius 10px
            margin-top 15px
            position relative
            &:first-child
                margin-top 0
            @media screen and (min-width: 550px)
                width 49%
                margin-top 0
                margin-bottom 15px
            @media screen and (min-width: 780px)
                padding 25px
                width 30% !important
                height auto
                margin 1.6% !important
                vertical-align middle
            .sp-quests-item-button
                @media screen and (min-width: 1050px)
                    opacity 0
                    visibility hidden
                    position absolute
                    top 0
                    left 0
                    width 100%
                    height 100%
                    background #EF6747
                    border-radius 5px
                    color white
                    span
                        position absolute
                        top 0
                        left 0
                        right 0
                        bottom 0
                        margin auto
                        font-size 15px
                        width 130px
                        cursor pointer
                        height 38px
                        border-radius 18px
                        text-align center
                        box-sizing border-box
                        border 1px solid white
                        line-height 36px
            @media screen and (min-width: 1050px)
                padding 22px
                &:hover
                    border-color #EF6747
                    .sp-quests-item-button
                            opacity 1
                            visibility visible
            .sp-quests-item-container
                display flex
                align-items center
                justify-content space-between
                height 100%
                .sp-quests-item-info
                    width calc(100% - 60px)
                    text-align left
                    span
                        font-size 10px
                        line-height 16px
                        width 100%
                        display inline-block
                        vertical-align top
                        @media screen and (min-width: 780px)
                            font-size 13px
                            line-height 18px
                            padding-bottom 5px
                            height 36px
                    strong
                        font-size 15px
                        line-height 18px
                        color black
                        font-weight 900
                        vertical-align middle
                        display inline-block
                        @media screen and (min-width: 780px)
                            margin-top 10px
                            font-size 16px
                            line-height 19px
                        @media screen and (min-width: 1050px)
                            font-size 22px
                            line-height 22px
                    &:after
                        content ''
                        display inline-block
                        width 9px
                        height 10px
                        vertical-align middle
                        margin-left 5px
                        background url('../../img/icon-points.svg') no-repeat center center / contain
                        @media screen and (min-width: 780px)
                            width 13px
                            height 13px
                            margin-top 10px

                .sp-quests-item-image
                    text-align center
                    max-width 50px
                    max-height 50px
                    flex-basis 50px
                    @media screen and (min-width: 780px)
                        max-width 58px
                        max-height 58px
                        flex-basis 58px

    .sp-popup-quest
        .sp-container
            padding 35px 0 25px
        .sp-popup-content
            max-width 400px
            height auto !important
            .sp-popup-quest-name
                font-size 18px
                line-height 21px
                font-weight 900
                text-align center
            .sp-popup-quest-iframe
                min-height 300px !important
                position relative
                & >>> iframe
                    position absolute
                    width 100%
                    height 100%
            .sp-popup-quest-btns
                box-sizing border-box
                padding 20px 25px 0
                display flex
                justify-content space-around
                @media screen and (min-width: 780px)
                    padding 20px 0 0
                a
                    height 44px !important
                    line-height 44px !important
                    font-family 'Arial'
                    position relative
                    @media screen and (min-width: 780px)
                        width 100% !important
                    &:last-child
                        margin-left 5px
                    & >>> iframe
                        width 100% !important
                        height 100% !important
                        position absolute !important
                        left 0 !important
                        top 0 !important


</style>