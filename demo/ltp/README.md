# SailPlay widget for Local Trade Pros

## Install
Paste this code to the page in < head > section to load the script:

    <script type="text/javascript">

        window._ltp_config = {
            partner_id: ' ** PARTNER_ID ** ',
            auth_hash: ' ** AUTH_HASH ** '
        };

        var _links = {
            js: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/bbf7ef726b6311bc1aeb699e8271f697.js',
            css: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/f14919255b699aec0538f11fe7fd34a1.css'
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
   
    <sailplay-ltp></sailplay-ltp>

## Example

Link: [DEMO](http://test.dev4you.info/ltp/ "Demo")

## Development

"npm install" - for install node_modules

"gulp" - for dev
"gulp build" - for build project