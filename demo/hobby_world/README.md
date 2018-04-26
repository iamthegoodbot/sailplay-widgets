# SailPlay widget for Hobby World

## Install
Paste this code to the page in < head > section to load the script:

    <link rel="stylesheet" href="https://sailplays3.cdnvideo.ru/media/assets/assetfile/65417cfa4a4171c7e88d4658bcee22c7.css"/>

    <script src="https://sailplays3.cdnvideo.ru/media/assets/assetfile/3520567b456d7995f2614d341ebff539.js"></script>

    <script type="text/javascript">

        window.sailplay_config = {
            auth_hash: 'AUTH_HASH',
            partner_id: 1639,
            domain: 'http://sailplay.ru',
            lang: 'ru',
            data: {
                page: {
                    wish_list: 'page_wish_list.html',
                    about_program: 'about_program.html',
                    change_password: 'change_password.html',
                    logout: 'page_logout.html'
                },
                urls: {
                    get_wish_list: 'fake/wish_list.json',
                    get_recommend_list: 'fake/recommend_list.json',
                    get_game_of_the_day: 'fake/game_of_the_day.json',
                    update_profile: 'fake/update_profile.json',
                    get_order_history: 'fake/order_history.json'
                }
            }
        };

    </script>


## Placement
Paste this code to < body > to render the content loaded via above mentioned script:

    <sailplay-hw></sailplay-hw>

## Example

Link: [DEMO](http://78.46.209.148/test/hw/ "Demo")

## Development

"npm install" - for install node_modules

"gulp" - for dev
"gulp build" - for build project