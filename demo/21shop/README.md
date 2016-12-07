# SailPlay widget for Miracle Mile

## Install
Paste this code to the page in < head > section to load the script:

    <script type="text/javascript">

            window.sailplay_config = {
                partner_id: ** PARNER ID **
            };

            var _links = {
                js: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/19ad17cf6c0c628204e08d2ac275fbc0.js',
                css: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/14d4c1b2dabcbbdea3c225233b1b86db.css'
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

    <sailplay-mm></sailplay-mm>

## Example

Link: [DEMO](http://test.dev4you.info/miracle_mile/ "Demo")

## Development

"npm install" - for install node_modules

"gulp" - for dev
"gulp build" - for build project