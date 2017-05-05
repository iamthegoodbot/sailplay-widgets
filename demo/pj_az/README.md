# SailPlay widget for Papa Johns AZ

## Install
Paste this code to the page in < head > section to load the script:

    <link rel="stylesheet" href="./dist/css/sailplay.pj_az.css"/>

    <script src="./dist/js/sailplay.pj_az.js"></script>

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

    <sailplay-pj_az></sailplay-pj_az>

## Example

Link: [DEMO](http://78.46.209.148/test/pj_az/ "Demo")

## Development

"npm install" - for install node_modules

"gulp" - for dev
"gulp build" - for build project