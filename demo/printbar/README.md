# SailPlay widget for Print Bar

## Install
Paste this code to the page in < head > section to load the script:

    <link rel="stylesheet" href="https://sailplays3.cdnvideo.ru/media/assets/assetfile/d2a1565d1c525ed7059bc841b3afd6ce.css"/>

    <script src="https://sailplays3.cdnvideo.ru/media/assets/assetfile/3c7317f3df7f50c71feb0704467d1270.js"></script>

    <script type="text/javascript">
        document.addEventListener('DOMContentLoaded', function () {
            window.sailplay_config = {
                auth_hash: 'AUTH_HASH',
                partner_id: 1655,
                domain: 'http://sailplay.ru',
                lang: 'ru',
                data: {
                  edit_profile_link: "http://sailplay.ru",
                  delivery_address: 1,
                  share_url: 'http://sailplay.ru'
                }
            };
        });

    </script>


## Placement
Paste this code to < body > to render the content loaded via above mentioned script:

    <sailplay-pb></sailplay-pb>

## Example

Link: [DEMO](http://78.46.209.148/test/pb/ "Demo")

## Development

"npm install" - for install node_modules

"gulp" - for dev
"gulp build" - for build project