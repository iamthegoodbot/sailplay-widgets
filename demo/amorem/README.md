# SailPlay widget for Amorem

## Install
Paste this code to the page in < head > section to load the script:

    <script type="text/javascript">

            window.sailplay_config = {
                auth_hash: 'AUTH_HASH',
                partner_id: 1616,
                lang: 'ru'
            };

            var _links = {
                js: '',
                css: ''
            };

            document.addEventListener('DOMContentLoaded', function () {

                var _s = document.createElement("link");
                _s.type = "text/css";
                _s.rel = "stylesheet";
                _s.href = _links.css;
                document.getElementsByTagName("head")[0].appendChild(_s);

                var _j = document.createElement("script");
                _j.type = "text/javascript";
                _j.src = _links.js;
                document.getElementsByTagName("head")[0].appendChild(_j);

            });

    </script>


## Placement
Paste this code to < body > to render the content loaded via above mentioned script:

    <sailplay-amorem></sailplay-amorem>

## Example

Link: [DEMO](http://78.46.209.148/test/amorem/ "Demo")

## Development

"npm install" - for install node_modules

"gulp" - for dev
"gulp build" - for build project