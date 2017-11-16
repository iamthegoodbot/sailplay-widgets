<template>
    <div id="sp-loyalty-profile">
        <div class="sp-m-text-center sp-link-top">
            <a :href="$parent.$parent.config.page.about" class="sp-link">О бонусной программе</a>
        </div>
        <div class="sp-profile-container">
            <div class="sp-user-avatar">
                <i v-on:click.stop.prevent="showLogout = true"></i>
                <img :src="getAvatar">
                <a v-show="showLogout" :href="$parent.$parent.config.page.logout" class="sp-user-avatar-logout">Выйти</a>
            </div>
            <div class="sp-user-info">
                <div class="sp-user-name">{{ $parent.user.user.name || 'Имя не указано' }}</div>
                <a :href="'tel:' + $parent.user.user.phone" class="sp-user-phone">{{ $parent.user.user.phone  | phone }}</a>
                <a :href="'mailto:' + $parent.user.user.email" class="sp-user-email">{{ $parent.user.user.email }}</a>
            </div>
            <div class="sp-user-socials">
                <div class="sp-user-socials-item">
                    <img :src="getSocials.fb" alt="Facebook">
                </div>
                <div class="sp-user-socials-item">
                    <img :src="getSocials.vk" alt="Vk">
                </div>
                <div class="sp-user-socials-item">
                    <img :src="getSocials.gp" alt="Google plus">
                </div>
                <div class="sp-user-socials-item">
                    <img :src="getSocials.tw" alt="Twitter">
                </div>
            </div>
            <div class="sp-m-text-center sp-profile-edit-link" v-if="$parent.user.user.register_date">
                <a href="#" class="sp-link"
                   v-on:click.prevent="showProfile = true;$parent.bodyLock(true)">Редактировать профиль</a>
            </div>
        </div>

        <div class="sp-popup sp-popup-profile" v-if="showProfile">
            <div class="sp-popup-layout" v-on:click.prevent="showProfile = false;$parent.bodyLock(false)"></div>
            <div class="sp-popup-content">
                <i class="sp-popup-close" v-on:click.prevent="showProfile = false;$parent.bodyLock(false)"></i>
                <div class="sp-container">
                    <div class="sp-popup-title">Редактировать профиль</div>

                    <div class="sp-popup-profile-container">

                        <form action="" class="sp-popup-profile-form" @submit.prevent="save">

                            <label class="sp-form-element sp-form-input" :class="{'sp-m-error': errors.has('fio')}">
                                <span class="sp-form-element-error">не указано</span>
                                <span class="sp-form-element-label">ФИО</span>
                                <input type="text" v-model="user.fio" name="fio" v-validate="'required'">
                            </label>

                            <label class="sp-form-element sp-form-input" :class="{'sp-m-error': errors.has('email')}">
                                <span class="sp-form-element-error">неверный email</span>
                                <span class="sp-form-element-label">Email</span>
                                <input type="text" name="email" v-model="user.addEmail" v-validate="'required|email'">
                            </label>

                            <label class="sp-form-element sp-form-input" :class="{'sp-m-error': errors.has('phone')}">
                                <span class="sp-form-element-error">неверный телефон</span>
                                <span class="sp-form-element-label">Телефон</span>
                                <masked-input type="tel" mask="\+1 (111) 111-11-11" v-validate="'required'" name="phone" v-model="user.addPhone" />
                            </label>

                            <label class="sp-form-element sp-form-input">
                                <span class="sp-form-element-label">Никнейм</span>
                                <input type="text" name="nickname" v-model="user.nickname">
                            </label>

                            <label class="sp-form-element sp-form-date">
                                <span class="sp-form-element-label">Дата рождения</span>
                                <select name="birth_day" v-model="user.birthDate[0]" v-validate="'required'">
                                    <option value="" disabled hidden>День</option>
                                    <option v-for="(day, index) in getDays(1)" :key="index" :value="index + 1">{{ index + 1 }}</option>
                                </select>
                                <select name="birth_month" v-model="user.birthDate[1]" v-validate="'required'">
                                    <option value="" disabled hidden>Месяц</option>
                                    <option v-for="(month, index) in months" :key="index" :value="index">{{ month }}</option>
                                </select>
                                <select name="birth_year" v-model="user.birthDate[2]" v-validate="'required'">
                                    <option value="" disabled hidden>Год</option>
                                    <option v-for="(year, index) in years" :key="index" :value="year">{{ year }}</option>
                                </select>
                            </label>

                            <div class="sp-form-element sp-form-field">
                                <div class="sp-form-element-label">Пол</div>
                                <label class="sp-form-radio">
                                    <input type="radio" name="sex" v-model="user.sex" value="1">
                                    <i></i>
                                    <span>Мужской</span>
                                </label>
                                <label class="sp-form-radio">
                                    <input type="radio" name="sex" v-model="user.sex" value="2">
                                    <i></i>
                                    <span>Женский</span>
                                </label>
                            </div>

                            <div class="sp-form-element sp-form-field">
                                <div class="sp-form-element-label">Редактировать подписки</div>
                                <label class="sp-form-checkbox">
                                    <input type="checkbox" v-model="user.subscriptions.sms">
                                    <i></i>
                                    <span>SMS</span>
                                </label>
                                <label class="sp-form-checkbox">
                                    <input type="checkbox" v-model="user.subscriptions.email">
                                    <i></i>
                                    <span>Email</span>
                                </label>
                            </div>

                            <div class="sp-form-element sp-form-avatar">
                                <img :src="getAvatar">
                                <file-upload class="sp-form-link" v-model="avatar" @input="updatetAvatar">Изменить аватар</file-upload>
                            </div>

                            <div class="sp-form-element sp-form-change-password">
                                <a href="" class="sp-form-link"  v-on:click.prevent="showProfile = false;showChangePassword = true;">Изменить пароль</a>
                            </div>

                            <div class="sp-form-element sp-form-checkbox-group" :class="{'sp-m-error': !filledInterests}">

                                <div class="sp-form-checkbox-group-title">Мои интересы</div>

                                <label class="sp-form-checkbox" v-for="(item, index) in user.interests" :key="index">
                                    <input type="checkbox" v-model="item.model">
                                    <i></i>
                                    <span>{{ item.label }}</span>
                                </label>

                                <div class="sp-form-element-error">Выберите хотя бы один вариант ответа</div>

                            </div>

                        </form>

                    </div>

                    <div class="sp-popup-buttons-wrapper">

                        <a href="#" class="sp-popup_button sp-m-tablet sp-m-inline-block"
                           :class="{'sp-m-disabled': updating}"
                           v-on:click.prevent="closeProfile">Закрыть</a>

                        <input type="submit" class="sp-popup_button"
                           :class="{'sp-m-disabled': updating}"
                           :value="updating ? 'Сохранение' : 'Сохранить'"
                           v-on:click.prevent="save"/>

                    </div>

                </div>
            </div>
        </div>

        <div class="sp-popup sp-popup-change-password" v-if="showChangePassword">
            <div class="sp-popup-layout" v-on:click.prevent="showChangePassword = false;$parent.bodyLock(false)"></div>
            <div class="sp-popup-content">
                <i class="sp-popup-close" v-on:click.prevent="showChangePassword = false;$parent.bodyLock(false)"></i>
                <div class="sp-container">
                    <div class="sp-popup-title">
                        Сменить пароль
                        <span>Установите новый пароль, или восстановите старый</span>
                    </div>
                    <form action="" @submit.prevent="save">
                        <div class="sp-popup-change-password-container">

                            <label class="sp-form-element sp-form-input">
                                <span class="sp-form-element-label">Старый пароль</span>
                                <input type="password" name="old_password" v-model="passwords.old">
                                <a href="#" class="sp-popup-forgot-password">Забыли пароль?</a>
                            </label>

                            <label class="sp-form-element sp-form-input">
                                <span class="sp-form-element-label">Новый пароль</span>
                                <input type="password" name="new_password" v-model="passwords.password_1">
                            </label>

                            <label class="sp-form-element sp-form-input" :class="{'sp-m-error': (passwords.password_1 && passwords.password_2 && passwords.password_1 != passwords.password_2) }">
                                <span class="sp-form-element-error">Пароли не совпадают</span>
                                <span class="sp-form-element-label">Повторить</span>
                                <input type="password" name="repeat_new_password" v-model="passwords.password_2">
                            </label>

                        </div>

                        <div class="sp-popup-buttons-wrapper">
                            <input type="submit" class="sp-popup_button"
                                   :class="{'sp-m-disabled': updating}"
                                   :value="'Сохранить'"
                                   v-on:click.prevent="changePassword"/>
                        </div>

                    </form>

                </div>
            </div>
        </div>

    </div>
</template>

<script>

  import $ from 'jquery'
  import Vue from 'vue'
  import SAILPLAY from 'sailplay-hub'
  import VeeValidate from 'vee-validate'
  import MaskedInput from 'vue-masked-input'
  import VueUploadComponent from 'vue-upload-component'

  const DEFAULT_AVATAR = '//sailplay.cdnvideo.ru/static/no_avatar100x100.png'
  const PRETTY_AVATAR = require("../../img/icon-profile.svg")
  const MONTHS = {
    1: 'Январь',
    2: 'Февраль',
    3: 'Март',
    4: 'Апрель',
    5: 'Май',
    6: 'Июнь',
    7: 'Июль',
    8: 'Август',
    9: 'Сентябрь',
    10: 'Октябрь',
    11: 'Ноябрь',
    12: 'Декабрь'
  }
  const DAYS = {
    1: 31,
    2: 29,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  }
  const INTERESTS = [
    'Популярные настольные игры',
    'Вечериночные игры',
    'Игротеки в моем городе',
    'Warhammer',
    'World of Tanks',
    'Новинки',
    'Скидки и акции',
    'Magic the Gathering',
    'Детские игры',
    'Берсерк'
  ]
  const UPDATE_PROFILE_ERRORS = {
    '-200006': 'Некорректный формат телефона.',
    '-200007': 'Указанный телефон уже принадлежит другому пользователю.',
    '-200010': 'Указанный email адрес уже принадлежит другому пользователю.'
  }
  const DEFAULT_PROFILE = {
    fio: null,
    addEmail: null,
    addPhone: null,
    nickname: null,
    birthDate: [],
    sex: 1,
    subscriptions: {
      email: 0,
      sms: 0
    },
    interests: INTERESTS.map(item => {return {label: item, model: false}})
  }

  const RACE_CONDITION_TIME = 3000

  let current_year = new Date().getFullYear()
  let arr = []
  for (let i = 90; i > 0; i--)
    arr.push(current_year - i)
  const YEARS = arr.reverse()

  export default {
    name: 'profile',
    components: {
      VeeValidate,
      MaskedInput,
      FileUpload: VueUploadComponent
    },
    data() {
      return {
        avatar: [],
        passwords: {},
        updating: false,
        user: Vue.util.extend({}, DEFAULT_PROFILE),
        interests: [],
        showLogout: false,
        showProfile: false,
        showChangePassword: false,
        days: Vue.util.extend({}, DAYS),
        months: Vue.util.extend({}, MONTHS),
        years: Vue.util.extend([], YEARS)
      }
    },
    mounted() {

      SAILPLAY.on('load.user.info.success', function (res) {
        this.$nextTick(function(){
          this.updateInfo.call(this)
        })
      }.bind(this))

      $('body').on('click', this.hideExit.bind(this))

    },
    destroyed() {

      $('body').off('click', this.hideExit.bind(this))

    },
    filters: {

      phone (number) {
        if (!number) {
          return '';
        }
        number = number.replace(/[^\d]/g, "");
        if (number.length >= 10) {
          return number.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5");
        }
        return null
      }

    },
    computed: {

      getSocials() {
        let socials = this.$parent.$parent.config && this.$parent.$parent.config.social || ''
        return {
          vk: ~socials.indexOf('vk') ? require("../../img/icon-socials-vk-active.svg") : require("../../img/icon-socials-vk.svg"),
          fb: ~socials.indexOf('fb') ? require("../../img/icon-socials-fb-active.svg") : require("../../img/icon-socials-fb.svg"),
          gp: ~socials.indexOf('gp') ? require("../../img/icon-socials-gp-active.svg") : require("../../img/icon-socials-gp.svg"),
          tw: ~socials.indexOf('tw') ? require("../../img/icon-socials-tw-active.svg") : require("../../img/icon-socials-tw.svg"),
        }
      },

      getAvatar() {
        return DEFAULT_AVATAR == this.$parent.user.user.pic ? PRETTY_AVATAR : this.$parent.user.user.pic
      },

      filledInterests() {
        return this.user.interests.filter(function(item){return item.model}).length
      },

    },
    methods: {

      updateInfo() {
        let form = Vue.util.extend({}, DEFAULT_PROFILE)
        let user = this.$parent.user.user
        form.fio = ''
        if (user.last_name)
          form.fio += user.last_name
        if (user.first_name)
          form.fio += ' ' + user.first_name
        if (user.middle_name)
          form.fio += ' ' + user.middle_name
        form.sex = user.sex || 1
        form.addEmail = user.email || ''
        form.addPhone = user.phone && this.$options.filters.phone(user.phone) || ''
        form.birthDate = user.birth_date && user.birth_date.split('-').reverse().map((x) => {
          return parseInt(x, 10)
        }) || []
        form.sex = user.sex
        form.subscriptions = {
          email: user.is_email_notifications || 0,
          sms: user.is_sms_notifications || 0
        }

        // Race condition fix
        setTimeout(function(){

          SAILPLAY.send('tags.exist', {tags: INTERESTS}, function (res) {
            if (res && res.tags) {
              this.$nextTick(function(){
                this.interests = JSON.parse(JSON.stringify(this.user.interests))
                this.user.fio = form.fio;
                this.user.sex = form.sex;
                this.user.addEmail = form.addEmail;
                this.user.addPhone = form.addPhone;
                this.user.birthDate = form.birthDate;
                this.user.subscriptions = form.subscriptions;
                this.user.interests = res.tags.map(tag => ({label: tag.name,model: tag.exist}))
              })

              SAILPLAY.send('vars.batch', {names: ['Никнейм']}, function (res) {
                this.$nextTick(function(){
                  res.vars.forEach(function (variable) {
                    this.user.nickname = variable.value || ''
                  }.bind(this))
                })
              }.bind(this))

            }
          }.bind(this))

        }.bind(this), RACE_CONDITION_TIME)

      },

      hideExit() {
        this.showLogout = false
      },

      closeProfile() {
        if(!this.updating){
          this.showProfile = false
          this.$parent.bodyLock(false)
        }
      },

      getDays(months) {
        let result = []
        let count = DAYS[months]
        for (let i = 1; i <= count; i++) result.push(i)
        return result
      },

      save(e) {

        this.$validator.validateAll().then((result) => {

          if (result) {

            if(this.updating) return
            this.updating = true

            let local_user = JSON.parse(JSON.stringify(this.user))
            let origin_user = JSON.parse(JSON.stringify(this.$parent.user.user))

            let vars = {
              'Никнейм': local_user.nickname || ''
            }

            let interests = local_user.interests.filter(function(interest) {
              let coincidence = this.interests.filter(coincidence_interest => coincidence_interest.label == interest.label)[0]
              return coincidence && coincidence.model != interest.model
            }.bind(this))

            let tags_add = interests
              .filter(field => field.model)
              .map(item => item.label)

            let tags_delete = interests
              .filter(field => !field.model)
              .map(item => item.label)

            let user_data = {}

            let lastName = local_user.fio.split(' ')[0] || null
            let firstName = local_user.fio.split(' ')[1] || null
            let middleName = local_user.fio.split(' ')[2] || null

            if (firstName !== origin_user.first_name) {
              user_data.firstName = firstName || ''
            }

            if (lastName !== origin_user.last_name) {
              user_data.lastName = lastName || ''
            }

            if (middleName !== origin_user.middle_name) {
              user_data.middleName = middleName || ''
            }

            if (local_user.sex !== origin_user.sex) {
              user_data.sex = local_user.sex
            }

            if (local_user.birthDate && local_user.birthDate[0] && local_user.birthDate[1] && local_user.birthDate[2]) {
              let bd = local_user.birthDate.reverse().map(item => item < 10 ? '0' + item : item ).join('-')
              if (bd !== origin_user.birth_date) {
                user_data.birthDate = bd
              }
            }

            if (local_user.addEmail !== origin_user.email) {
              user_data.addEmail = local_user.addEmail
            }

            let phone = local_user.addPhone
              .replace(/\-/g, '')
              .replace(/\s/g, '')
              .replace(/\(/g, '')
              .replace(/\)/g, '')
              .replace(/\+/g, '')

            if (phone !== origin_user.phone) {
              user_data.addPhone = phone
            }

            if(JSON.stringify(origin_user.subscriptions) != JSON.stringify(local_user.subscriptions)) {
              user_data.subscriptions = JSON.stringify(local_user.subscriptions)
            }

            user_data.auth_hash = SAILPLAY.config().auth_hash

            SAILPLAY.send('users.update', user_data, function (res_user_update) {

              if (res_user_update.status == 'error') {

                this.$nextTick(function () {
                  this.updating = false
                  this.showProfile = false
                  this.$parent.showMessage = {
                    title: 'Ошибка',
                    text: UPDATE_PROFILE_ERRORS[res_user_update.status_code] || res_user_update.message || 'Не получилось обновления профиля.'
                  }
                })

              } else if (res_user_update.status == 'ok') {

                // Удаление тегов (Интересов)
                SAILPLAY.send('tags.delete', {tags: tags_delete}, function (res_tags_delete) {

                  // Добавление тегов (Интересов)
                  SAILPLAY.send('tags.add', {tags: tags_add}, function (res_tags_add) {

                    // Добавление переменных
                    SAILPLAY.send('vars.add', {custom_vars: vars}, function (res_vars_add) {

                      this.$http.get(this.$parent.$parent.config.urls.update_profile, {
                        last_name: user_data.lastName,
                        middle_name: user_data.middleName,
                        first_name: user_data.firstName,
                        phone: user_data.addPhone,
                        birth_date: user_data.birthDate,
                        gender: user_data.sex,
                        nickname: local_user.nickname,
                        interests: tags_add
                      }).then(response => {
                        this.$nextTick(function () {
                          this.updating = false
                          this.showProfile = false
                          this.$parent.showMessage = {
                            title: 'Готово',
                            text: 'Профиль обновлен'
                          }
                        })
                      })

                    }.bind(this))

                  }.bind(this))

                }.bind(this))
              }

            }.bind(this))

            return
          }
        })

      },

      updatetAvatar(value) {
        this.$nextTick(function () {
          this.updating = true
          let file = value[0].file
          let data = new FormData()
          data.append('avatar', file)
          data.append('oid', this.$parent.user.user.origin_user_id)
          this.$http.post(this.$parent.$parent.config.urls.upload_avatar, data).then(response => {
            this.updating = false
            this.showProfile = false
            this.$parent.showMessage = {
              title: 'Готово',
              text: 'Аватар обновлен'
            }
            this.$parent.getUser()
          }, response => {
            this.updating = false
            this.showProfile = false
            this.$parent.showMessage = {
              title: 'Ошибка',
              text: response.data.message
            }
          })
        })
      },

      changePassword(e) {
        if(this.updating) return
        this.updating = true
        this.$http.get(this.$parent.$parent.config.urls.change_password, this.passwords).then(response => {
          this.$nextTick(function () {
            this.updating = false
            this.showChangePassword = false
            this.$parent.showMessage = {
              title: 'Готово',
              text: 'Пароль обновлен'
            }
          })
        }, response => {
          this.$nextTick(function () {
            this.updating = false
            this.showProfile = false
            this.showChangePassword = false
            this.$parent.showMessage = {
              title: 'Ошибка',
              text: response.data.message
            }
          })
        })
      },

    }
  }
</script>

<style scoped lang="stylus">

    #sp-loyalty-profile
        position relative
        box-sizing border-box
        padding 40px 25px 20px
        @media screen and (min-width: 780px)
            padding 50px 30px 30px
            & >>> .sp-link-top
                left 0
                text-align left
                padding-left 115px
                @media screen and (min-width: 1050px)
                    padding-left 135px

        @media screen and (min-width: 1050px)
            padding 60px 40px 50px

    .sp-profile-container
        display flex
        flex-wrap: wrap
        justify-content center
        align-content center
        @media screen and (min-width: 780px)
            align-content start
        &:after
            content ''
            display block
            width calc(100% - 50px)
            height 2px
            background rgba(224, 224, 224, 0.7)
            position absolute
            left 0
            right 0
            bottom 0
            margin auto
            @media screen and (min-width: 780px)
                display none

    .sp-user-avatar
        box-sizing border-box
        padding-top 5px
        width 52px
        height 52px
        display block
        flex-basis 52px
        position relative
        text-align center
        @media screen and (min-width: 780px)
            width 70px
            height 70px
            flex-basis 70px
        @media screen and (min-width: 1050px)
            width 85px
            height 85px
            flex-basis 85px
        &-logout
            font-size 8px
            border-radius 1.25px
            line-height 18px
            border 1px solid #EF6747
            color #EF6747
            padding 4px 8px
            display inline-block
            text-decoration none
            @media screen and (min-width: 780px)
                font-size 15px
                border-radius 2px
                line-height 18px
                margin-top 10px
        img
            display inline-block
            max-width 100%
            max-height 100%
            border-radius 50%
        i
            position absolute
            width 18px
            height 18px
            right 2px
            top 4px
            display block
            cursor pointer
            background url('../../img/icon-profile-edit.svg') no-repeat center center / contain
            @media screen and (min-width: 780px)
                width 25px
                height 25px
            @media screen and (min-width: 1050px)
                width 30px
                height 30px
                &:hover
                    background-image url('../../img/icon-profile-edit-hover.svg')

    .sp-user-info
        padding-left 15px
        box-sizing border-box
        flex-basis calc(100% - 52px)
        display flex
        flex-direction column
        align-items start
        @media screen and (min-width: 400px) and (max-width: 779px)
            flex-basis auto
        @media screen and (min-width: 780px)
            flex-basis calc(100% - 70px)
            padding-left 25px
        @media screen and (min-width: 1050px)
            flex-basis calc(100% - 85px)
            padding-left 30px
        .sp-user-name
            font-size 18px
            line-height 22px
            font-weight 900
            color black
            padding-bottom 2px
            padding-right 10px
            @media screen and (min-width: 780px)
                font-size 25px
                line-height 30px
        .sp-user-email,
        .sp-user-phone
            display inline-block
            font-size 10px
            line-height 12px
            color rgba(0, 0, 0, 0.20)
            text-decoration none
            margin-top 8px
            @media screen and (min-width: 780px)
                font-size 15px
                line-height 18px
            @media screen and (min-width: 1050px)
                margin-top 10px
            &:hover
                color rgba(0, 0, 0, 0.20)
                text-decoration underline

    .sp-user-socials
        box-sizing border-box
        margin 15px 0
        flex-basis 100%
        display flex
        justify-content center
        @media screen and (min-width: 780px)
            padding-left 95px
            justify-content start
        @media screen and (min-width: 1050px)
            padding-left 115px
        .sp-user-socials-item
            width 36px
            height 36px
            margin-right 10px
            &:last-child
                margin-right 0
            @media screen and (min-width: 780px)
                width 30px
                height 30px
            img
                display inline-block
                max-width 100%
                max-height 100%

    .sp-profile-edit-link
        width 100%
        @media screen and (min-width: 780px)
            position absolute
            bottom -23px
            left 0
            padding-left 115px
            width auto
            a
                padding 8px 28px 8px 10px !important
                background #f1f1f1
                border-radius 15px
                &:before
                    height 20px
        @media screen and (min-width: 1050px)
            padding-left 135px
    .sp-popup-profile
        &-form
            @media screen and (min-width: 780px)
                display flex
                flex-wrap wrap
                justify-content space-between
                //align-items flex-start
                align-items unset
        .sp-popup-buttons-wrapper
            text-align right
            @media screen and (min-width: 780px)
                .sp-popup_button
                    margin-right 30px
                    width 160px !important
                    padding 0 !important
        .sp-container
            padding 35px 25px 25px
            @media screen and (min-width: 780px)
                padding 40px
            .sp-form-element
                margin-top 8px
                @media screen and (min-width: 780px)
                    margin-top 12px !important
                    width 48% !important
                    &.sp-form-field
                        .sp-form-element-label
                            margin-bottom 7px
                &:first-child
                    margin-top 0

    .sp-popup-change-password
        .sp-container
            padding 35px 25px 25px
            .sp-popup-buttons-wrapper
                text-align center
            .sp-popup-forgot-password
                margin-top 8px
                font-size 13px
                line-height 15px
                color #64a7b5
                display inline-block
                text-decoration underline
                &:hover
                    text-decoration none
            .sp-popup_button
                margin-top 35px
            .sp-form-element
                margin-top 8px
                @media screen and (min-width: 780px)
                    margin-top 12px
                    width 280px
                &:first-child
                    margin-top 0

</style>