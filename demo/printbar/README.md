# SailPlay widget for Print Bar

## Install
Paste this code to the page in < head > section to load the script:
(jquery required)
    
    <link rel="stylesheet" href="dist/css/sailplay.pb.css"/>
    
    <script src="dist/js/sailplay.pb.js"></script>
    
    <script type="text/javascript">
        document.addEventListener('DOMContentLoaded', function () {
            window.sailplay_config = {
                auth_hash: 'AUTH_HASH',
                partner_id: 1655,
                domain: 'http://sailplay.ru',
                lang: 'ru',
                data: {
                  user_pic: "",
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

Link: [DEMO](http://cabinets.sailplay.ru/printbar/ "Demo")

## Development

"npm install" - for install node_modules

"gulp" - for dev
"gulp build" - for build project