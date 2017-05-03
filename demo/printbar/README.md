# SailPlay widget for Print Bar

## Install
Paste this code to the page in < head > section to load the script:

    <link rel="stylesheet" href="./dist/css/sailplay.pb.css"/>

    <script src="./dist/js/sailplay.pb.js"></script>

    <script type="text/javascript">

        window.sailplay_config = {
            auth_hash: 'AUTH_HASH',
            partner_id: 1655,
            domain: 'http://sailplay.ru',
            lang: 'ru',
        };

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