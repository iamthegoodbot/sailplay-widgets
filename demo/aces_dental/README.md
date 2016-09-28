# SailPlay widget for Aces Dental

## Install
Paste this code to the page in < head > section to load the script:

    <script type="text/javascript">

            window.acces_dental_config = {
                partner_id: ** PARNER ID **
            };

            var _links = {
                js: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/02dad0519796c243a224ce386718b595.js',
                css: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/13db7f19e1f47f589b83a38375364b00.css'
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

    <sailplay-ad></sailplay-ad>

## Example

Link: [DEMO](http://test.dev4you.info/aces_dental/ "Demo")

## Development

"npm install" - for install node_modules

"gulp" - for dev
"gulp build" - for build project